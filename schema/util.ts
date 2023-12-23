import {
    collectComments,
    constructObject,
    decorateComments,
    getCommentIndexes,
    parseSchema
} from "./parse.js";
import CommonParameters from "./CommonParameters.js";
import {
    Type,
    type TObject,
    type TArray,
    type TLiteralValue,
    type TLiteral,
    type TUnion,
    type TUnsafe
} from "@sinclair/typebox";
import { STATUS_CODES } from "node:http";

export type UserLevels = "member" | "privileged" | "former-staff" | "janitor" | "moderator" | "admin" | "bd-staff";

export const AccessDeniedResponse = (name = "Access Denied", message?: string) => errorMessageResponse(name, `Access Denied${message ? `: ${message}` : ""}`, "none", 403);
export const NotFoundResponse = (name = "Not Found") => errorMessageResponse(name, "not found", "none", 404);
export const InternalServerErrorResponse = (name = "Internal Server Error") => errorMessageResponse(name, "An unexpected error occurred.", true, 500);
export const NoContentResponse = (name = "Success") => response(204, null, name, null);
export const RedirectResponse = (name: string, to: string, comment?: string) => response(302, "html", name, `<html><body>You are being <a href="${to}">redirected</a>.</body></html>`, comment);

export const AuthMap = {
    "member":       "<mark style=\"color:blue;\">Authorization Required</mark>",
    "privileged":   "<mark style=\"color:blue;\">Privileged+ Required</mark>",
    "former-staff": "<mark style=\"color:green;\">Former Staff+ Required</mark>",
    "janitor":      "<mark style=\"color:red;\">Janitor+ Required</mark>",
    "moderator":    "<mark style=\"color:red;\">Moderator+ Required</mark>",
    "admin":        "<mark style=\"color:yellow;\">Admin+ Required</mark>",
    "bd-staff":     "<mark style=\"color:purple;\">BD Staff Required</mark>"
} satisfies Record<UserLevels, string>;

function doAuth(auth: IRoute["auth"]) {
    if (auth === undefined || typeof auth === "boolean") {
        return auth ? AuthMap.member : "";
    }

    const [required] = auth;
    const levels = Array.isArray(auth[1]) ? auth[1] : [auth.slice(1) as [level: UserLevels, reason?: string | undefined]];
    let str = !required || levels.some(([level]) => level === "member") ? "" : AuthMap.member;
    for (const [level, reason] of levels) {
        str += `\n\n${AuthMap[level]}${reason ? ` ${reason}` : ""}`;
    }
    if (str.startsWith("\n\n")) {
        str = str.slice(2);
    }
    return str;
}

function paramType(type: symbol | string) {
    switch (type) {
        case Types.String: {
            return "String";
        }

        case Types.Boolean: {
            return "Boolean";
        }

        case Types.Number: {
            return "Number";
        }

        default: {
            if (typeof type === "symbol") {
                throw new TypeError(`Unknown symbol: ${Symbol.keyFor(type) ?? String(type)}`);
            }

            return type;
        }
    }
}

function makeParameter(param_: IParameter) {
    return `{% swagger-parameter in="${param_.in}" name="${param_.name}" type="${paramType(param_.type)}"${param_.required ? " required=\"true\"" : ""} %}\n\
    ${param_.description}\n\
    {% endswagger-parameter %}`;
}

function makeResponse(resp: IResponse) {
    const c = `${resp.comment ? `// ${resp.comment}\n` : ""}${makeResponseBody(resp.data)}`;
    return `{% swagger-response status="${resp.status}: ${STATUS_CODES[resp.status] ?? "Unknown"}" description="${resp.name}" %}\n\
    ${codeblock(c, resp.lang).replace(/( {4,})/g, v => `[SPACES:${v.length}]`)}\n\
    {% endswagger-response %}`;
}

// we're intentionally not supporting bigints since e621 should never be able to return one
export function makeResponseBody(data: TObject | TArray | TUnsafe<object>  | string | null, lang?: string): string {
    if (typeof data === "string" || (typeof data === "object" && data === null)) {
        return codeblock(data === null ? "" : data, lang);
    }

    const parsed = parseSchema(data);
    const comments = collectComments(parsed);
    const stringObject = JSON.stringify(constructObject(parsed), null, 2);
    const commentIndexes = getCommentIndexes(stringObject, comments);
    const content = decorateComments(stringObject, commentIndexes);
    return codeblock(content, lang);
}
export function makeRoute(route: IRoute) {
    const params = route.parameters?.filter(p => !(p instanceof CommonParameters)) as Array<IParameter> ?? [];
    for (const p of (route.parameters ?? []).filter(pr => pr instanceof CommonParameters)) {
        params.push(...(p as CommonParameters).params);
    }
    return `{% swagger method="${route.method.toLowerCase()}" path="${route.path}" baseUrl="https://e621.net" summary="${route.name}" %}\n\
    {% swagger-description %}\n\
    ${route.auth ? `${doAuth(route.auth)}\n\n` : ""}\
    ${Array.isArray(route.description) ? route.description.join("\n\n") : (route.description ? `${route.description}\n` : "")}\
    {% endswagger-description %}\n\n\
    ${route.parameters.length === 0 ? "" : `${params.map(makeParameter).join("\n\n") ?? ""}\n\n`}\
    ${route.responses.length === 0 ? "" : `${route.responses?.map(makeResponse).join("\n\n") ?? ""}\n\n`}\
    {% endswagger %}`;
}

export function codeblock(content: string, lang?: string | null) {
    return lang ? `\`\`\`${lang}\n${content}\n\`\`\`` : content;
}

export function is<T = unknown>(value: unknown): value is T {
    return true;
}

export function makeCategory(name: string, description: string, comments: Array<IComment>, routes: Record<string, IRoute>) {
    return `${description === "" ? "" : `---\n\
description: >-\n\
  ${description}\n\
---\n\n`}\
    # ${name}\n\n\
    ${Object.entries(routes).map(([key, route]) => {
        const com = comments.filter(c => c.route === key);
        const before = com.filter(c => c.location === "before").map(c => c.content);
        const after = com.filter(c => c.location === "after").map(c => c.content);
        return `${before.length === 0 ? "" : `${before.join("\n\n")}\n\n`}${makeRoute(route)}${after.length === 0 ? "" : `\n\n${after.join("\n\n")}`}`;
    }).join("\n\n")}`.split("\n").map(v => v.replace(/^\s{4,}/g, "")).join("\n").replace(/\[SPACES:(\d+)]/g, (_, spaces) => " ".repeat(Number(spaces)));
}

export const Links = {
    Search: {
        IP_ADDR: "[Search Parameters: search\\[ip\\_addr\\]](other/search_parameters.md#search-ip\\_addr)",
        ID:      "[Search Parameters: search\\[id\\]](other/search_parameters.md#search-id)",
        LIMIT:   "[Search Parameters: limit](other/search_parameters.md#limit)",
        PAGE:    "[Search Parameters: page](other/search_parameters.md#page)"
    },
    SearchInconsistency: "See https://github.com/e621ng/e621ng/issues/359"
};

export type RouteMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
export interface IRoute {
    // true, [true], false, [false]
    // [true, "admin"], [true, ["admin"]], [false, "admin"], [false, ["admin"]]
    // [true, "admin", "some reason"], [true, ["admin", "some reason"]], [false, "admin", "some reason"], [false, ["admin", "some reason"]]
    // [true, [["moderator", "one reason"], ["admin", "another reason"]]], [false, [["moderator", "one reason"], ["admin", "another reason"]]]
    auth?: boolean | [required: boolean, levels?: Array<[level: UserLevels, reason?: string]>] | [required: boolean, level: UserLevels, reason?: string];
    description?: string | Array<string> | null;
    method: RouteMethod;
    name: string;
    parameters: Array<IParameter | CommonParameters>;
    path: string;
    responses: Array<IResponse>;
}

export type ParameterLocation = "path" | "query" | "header" | "cookie" | "body";
export interface IParameter {
    description: string;
    examples?: string | Array<string>;
    in: ParameterLocation;
    name: string;
    required: boolean;
    type: symbol | string;
}

export interface IResponse {
    comment?: string;
    data: TObject | TArray | TUnsafe<object>  | string | null;
    lang: string | null;
    name: string;
    status: number;
}

// required by default if in path, false otherwise
function param(location: ParameterLocation, name: string, type: symbol | string, description: string, required = location === "path"): IParameter {
    return {
        description,
        in: location,
        name,
        required,
        type
    };
}

export const parameter = Object.assign(param, {
    body:   param.bind(null, "body"),
    cookie: param.bind(null, "cookie"),
    header: param.bind(null, "header"),
    path:   param.bind(null, "path"),
    query:  param.bind(null, "query")
});

export function response(status: number, lang: string | null, name: string, data: TObject | TArray | TUnsafe<object> | string | null, comment?: string): IResponse {
    return {
        comment,
        data,
        lang,
        name,
        status
    };
}

export const Types = {
    String:  Symbol.for("e621-docs.string"),
    Number:  Symbol.for("e621-docs.number"),
    Boolean: Symbol.for("e621-docs.boolean")
};

export interface IComment {
    content: string;
    location: "before" | "after";
    route: string;
}


export function rootKey<T extends string>(key: T) {
    return Type.Object({
        [key]: EmptyArray
    }) as TObject<Record<T, TUnsafe<[]>>>;
}
export const EmptyArray = Type.Unsafe<[]>(Type.Literal([] as never));
export const EmptyObject = Type.Object({});

export function errorBody(...errors: Array<[key: string, messages: Array<string>]>) {
    return Type.Object({
        errors: Type.Object(Object.fromEntries(errors.map(([key, value]) => [key, Type.Array(literalUnion(...value))])))
    });
}

export function expectedError(title: string, ...errors: Array<[key: string, messages: Array<string>]>) {
    return response(422, "javascript", title, errorBody(...errors));
}

export function errorMessageResponse(title: string, error: string, code: boolean | "none" = false, responseCode = 422) {
    return response(responseCode, "javascript", title, Type.Object(code === "none" ? {
        success: Type.Literal(false),
        reason:  Type.Literal(error)
    } : {
        success: Type.Literal(false),
        message: Type.Literal(error),
        code:    code ? Type.String({ format: "uuid" }) : Type.Null()
    }));
}

export function literalUnion<T extends TLiteralValue>(...values: Array<T>): TUnion<Array<TLiteral<T>>> {
    return Type.Union(values.map(val => Type.Literal(val)));
}

export async function tableOfContents(map: Array<{ category: [name: string, parent?: string]; file: string; }>) {
    const toc: Record<string, string> = {};
    const processedParents = new Set<string>(), pendingChilderen = new Map<string, Array<[name: string, file: string]>>();
    for (const { category: [name, parent], file } of map) {
        if (parent) {
            if (processedParents.has(parent)) {
                toc[parent] += `  * [${name}](${file})\n`;
            } else {
                if (!pendingChilderen.has(parent)) {
                    pendingChilderen.set(parent, []);
                }
                pendingChilderen.get(parent)!.push([name, file]);
            }
        } else {
            toc[name] = `* [${name}](${file})\n`;
            processedParents.add(name);
            if (pendingChilderen.has(name) && pendingChilderen.get(name)!.length !== 0) {
                toc[name] += pendingChilderen.get(name)!.map(([childName, childFile]) => `  * [${childName}](${childFile})\n`).join("");
            }
            pendingChilderen.delete(name);
        }
    }

    return Object.values(toc).map(v => v.endsWith("\n") ? v.slice(0, -1) : v).join("\n");
}
