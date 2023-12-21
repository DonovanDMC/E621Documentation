import { NIL_UUID, EMPTY_TIMESTAMP } from "./constants.js";

import { Kind, type TAnySchema, type TSchema, type TUnion } from "@sinclair/typebox";

export interface ParsedNumber {
    comment: string | null;
    type: "number";
    value: number;
}

export interface ParsedNull {
    comment: string | null;
    type: "null";
    value: null;
}

export interface ParsedBoolean {
    comment: string | null;
    type: "boolean";
    value: boolean;
}

export interface ParsedString {
    comment: string | null;
    type: "string";
    value: string;
}

export interface ParsedObject {
    comment: string | null;
    type: "object";
    value: Record<string, AnyParsed>;
}

export interface ParsedArray {
    comment: string | null;
    type: "array";
    value: Array<AnyParsed>;
}

export interface ParsedLiteral {
    comment: string | null;
    type: "literal";
    value: unknown;
}

export type AnyParsed = ParsedNumber | ParsedNull | ParsedBoolean | ParsedString | ParsedArray | ParsedObject | ParsedLiteral;

export function parseSchema(schema: TAnySchema): AnyParsed {
    if (schema.examples && Array.isArray(schema.examples) && schema.examples.length !== 0) {
        const type = typeof schema.examples[0];
        switch (type) {
            case "number":
            case "string":
            case "boolean": {
                return {
                    comment: schema.description ?? null,
                    type,
                    value:   schema.examples[0] as never
                };
            }

            case "object": {
                if (schema.examples[0] === null) {
                    return {
                        comment: schema.description ?? null,
                        type:    "null",
                        value:   null
                    };
                }

                if (Array.isArray(schema.examples[0])) {
                    return {
                        comment: schema.description ?? null,
                        type:    "literal",
                        value:   schema.examples[0]
                    };
                }

                return {
                    comment: schema.description ?? null,
                    type:    "literal",
                    value:   schema.examples[0] as never
                };
            }
        }
    }
    switch (schema[Kind]) {
        case "Literal": {
            const type = typeof schema.const;
            // typebox doesn't technically support object literals, but we need them for literal empty arrays
            if (!["string", "number", "boolean"].includes(type)) {
                if (["object"].includes(type)) {
                    return {
                        comment: schema.description ?? null,
                        type:    "literal",
                        value:   schema.const as never
                    };
                }
                throw new TypeError(`Unsupported literal type: ${type} (${JSON.stringify(schema)}))`);
            }
            return {
                comment: schema.description ?? null,
                type:    type as "string" | "number" | "boolean" | "object",
                value:   schema.const as never
            };
        }

        case "Number": {
            return {
                comment: schema.description ?? null,
                type:    "number",
                value:   0
            };
        }

        case "Null": {
            return {
                comment: schema.description ?? null,
                type:    "null",
                value:   null
            };
        }

        case "Boolean": {
            return {
                comment: schema.description ?? null,
                type:    "boolean",
                value:   false
            };
        }

        case "String": {
            let value = "";
            switch (schema.format) {
                case "date":
                case "date-time": {
                    value = EMPTY_TIMESTAMP;
                    break;
                }

                case "uuid": {
                    value = NIL_UUID;
                    break;
                }
            }
            return {
                comment: schema.description ?? null,
                type:    "string",
                value
            };
        }

        case "Array": {
            return {
                comment: schema.description ?? null,
                type:    "array",
                value:   ((schema.items as TSchema)[Kind] === "Union" ? (schema.items as TUnion).anyOf : [schema.items]).map(parseSchema)
            };
        }

        case "Object": {
            return {
                comment: schema.description ?? null,
                type:    "object",
                value:   Object.fromEntries(Object.entries(schema.properties as Record<string,TSchema>).map(([key, value]) => [key, parseSchema(value)]))
            };
        }

        case "Union": {
            const type = parseSchema((schema as TUnion).anyOf[0]);
            return {
                ...type,
                comment: schema.description ?? type.comment
            };
        }

        default: {
            throw new TypeError(`Unknown schema: ${JSON.stringify(schema)} (kind: ${schema[Kind]})`);
        }
    }
}

export function constructObject(obj: AnyParsed): unknown {
    switch (obj.type) {
        case "array": {
            return obj.value.map(constructObject);
        }

        case "object": {
            return Object.fromEntries(Object.entries(obj.value).map(([key, value]) => [key, constructObject(value)]));
        }

        case "number":
        case "null":
        case "boolean":
        case "string":
        case "literal": {
            return obj.value;
        }

        default: {
            throw new TypeError(`Unknown type: ${(obj as Record<string, string>).type}`);
        }
    }
}

export function collectComments(obj: AnyParsed, key = "$root"): Record<string, string> {
    let comments: Record<string, string> = {};
    if (obj.comment) {
        comments[key] = obj.comment;
    }
    switch (obj.type) {
        case "array": {
            for (const [index, value] of obj.value.entries()) {
                comments = { ...comments, ...collectComments(value, `${key}[${index}]`) };
            }
            break;
        }

        case "object": {
            for (const [okey, value] of Object.entries(obj.value)) {
                comments = { ...comments, ...collectComments(value, `${key}.${okey}`) };
            }
            break;
        }
    }

    return comments;
}

export function getArrayItemIndexes(content: string) {
    const parsed = JSON.parse(content) as Array<unknown>;
    // splice later on mutates the array due to deep references
    /* const itr = JSON.parse(content) as Array<unknown>;
    // run through the keys to ensure we don't try to parse anything with a nested object/array, as this can mess with the start/end of complicated structures
    for (const [key, value] of itr.entries()) {
        if (Array.isArray(value)) {
            // we need to go backwards incase we mutate the array while we're iterating over it
            for (const [i, v] of Array.from(value.entries()).reverse()) {
                if (Array.isArray(v)) {
                    console.error(`[getArrayItemIndexes] Found nested array on array at index ${key} (index: ${i}) - this will be omitted`);
                    (parsed[key] as Array<unknown>).splice(i, 1);
                }

                if (JSON.stringify(v).trim().startsWith("{")) {
                    console.error(`[getArrayItemIndexes] Found nested object on array at index ${key} (index: ${i}) - this will be omitted`);
                    (parsed[key] as Array<unknown>).splice(i, 1);
                }
            }
        } else if (JSON.stringify(value).trim().startsWith("{")) {
            for (const [k, v] of Object.entries(value as object)) {
                if (Array.isArray(v)) {
                    console.error(`[getArrayItemIndexes] Found nested array on object at index ${key} (key: ${k}) - this will be omitted`);
                    delete (parsed[key] as Record<string, unknown>)[k];
                }

                if (JSON.stringify(v).trim().startsWith("{")) {
                    console.error(`[getArrayItemIndexes] Found nested object on object at index ${key} (key: ${k}) - this will be omitted`);
                    delete (parsed[key] as Record<string, unknown>)[k];
                }
            }
        }
    } */
    const expected = parsed.length;
    const items: Array<[start: number, end: number]> = [];
    // make sure it's formatted how we expect it to be
    const str = JSON.stringify(parsed, null, 2);
    // we start reading from the second line, and end at the second to last line
    let currentIndex = 0, currentType: "curly" | "square" | undefined;
    const active: Array<{ start: number; type: "curly" | "square"; }> = [];
    const lines = str.split("\n").slice(1, -1);
    let line: string | undefined;
    while ((line = lines.shift())) {
        currentIndex++;
        // make sure we skip nested arrays/objects
        const whitespace = /^\s+/.exec(line)?.[0].length ?? 0;
        if (whitespace !== 2) {
            continue;
        }

        const trimmed = line.replace(/\s/g, "");
        let curly = false, square = false;
        if ((curly = trimmed.startsWith("{")) || trimmed.startsWith("[")) {
            active.push({ start: currentIndex, type: curly ? "curly" : "square" });
            continue;
        }

        if ((curly = trimmed.startsWith("}")) || (square = trimmed.startsWith("]"))) {
            const last = active.pop()!;
            if ((curly && last?.type !== "curly") || (square && last?.type !== "square")) {
                console.error(`Found incorrect end of complicated structure in array (start: ${last.start}, end: ${currentIndex}, expectedType: ${currentType!}, type: ${curly ? "curly" : "square"}): ${JSON.stringify(parsed)}`);
                continue;
            }
            items.push([last.start, currentIndex]);
            continue;
        }

        if (active.length !== 0) {
            continue;
        }

        items.push([currentIndex, currentIndex]);
    }

    if (active.length !== 0) {
        console.error(`Unfinished structures left (${active.map(a => `start: ${a.start}, type: ${a.type}`).join("|")}): ${JSON.stringify(parsed)}`);
    }

    if (items.length !== expected) {
        console.error(`Failed to parse all items in array (parsed: ${items.length}, expected: ${expected}): ${JSON.stringify(parsed)}`);
    }

    return items;
}

export function getCommentIndexes(content: string, comments: Record<string, string>, offset = 0): Array<[number, string]> {
    const final: Array<[number, string]> = [];
    if (comments.$root) {
        final.push([0, comments.$root]);
        delete comments.$root;
    }
    comments = Object.fromEntries(Object.entries(comments).map(([k, v]) => [k.startsWith("$root.") ? k.slice(6) : (k.startsWith("$root") ? k.slice(5) : k), v]));
    const lines = content.split("\n");
    for (const [key, comment] of Object.entries(comments)) {
        if (/^\[\d+]/.test(key)) {
            const items = getArrayItemIndexes(content);
            const index = Number(key.slice(1, 2));
            if (key.length > 3) {
                let c = lines.slice(items[index][0], items[index][1] + 1).join("\n");
                if (c.endsWith(",")) {
                    c = c.slice(0, -1);
                }
                let k = key.slice(3);
                if (k.startsWith(".")) {
                    k = k.slice(1);
                }
                final.push(...getCommentIndexes(c, { [k]: comment }, offset + items[index][0]));
                continue;
            }  else {
                final.push([items[index][0] + offset, comment]);
                continue;
            }
        } else {
            const [,k] = /(\w+)(?:\.\w+|(?:\[\d+]))+/.exec(key) ?? [undefined, key];
            const start = lines.findIndex(l => l.replace(/\s/g, "").startsWith(`"${k}"`));
            const char = lines[start].replace(/\s/g, "").startsWith(`"${k}":{`) ? "}" : "]";
            // if there's nothing extra on the key, we can finish
            if (key === k) {
                final.push([start + offset, comment]);
                continue;
            }
            // we check whitespace to ensure we're getting the right structure close
            const whitespace = lines[start].match(/^\s+/)?.[0] ?? "";
            const end = lines.findIndex((l, i) => i > start && l.startsWith(`${whitespace}${char}`));
            const first = lines[start].replace(/\s/g, "").slice(`"${k}":`.length);
            const last = lines[end].replace(/\s/g, "").slice(0, lines[end].endsWith(",") ? -1 : undefined);
            const cut = [first, ...lines.slice(start + 1, end), last].join("\n");
            try {
                // make sure we've produced valid JSON
                JSON.parse(cut);
            } catch {
                console.error(`Failed to parse cut: ${cut} for key ${key} (start: ${start}, end: ${end})`);
                continue;
            }

            let kk = key.slice(k.length);
            if (kk.startsWith(".")) {
                kk = kk.slice(1);
            }
            final.push(...getCommentIndexes(cut, { [kk]: comment }, start + offset));
            continue;
        }
    }

    return final;
}

export function decorateComments(content: string, commentIndexes: Array<[number, string]>) {
    const lines = content.split("\n");
    for (const [index, comment] of commentIndexes) {
        // add the comment after the property
        lines[index] = `${lines[index]} // ${comment}`;
    }
    return lines.join("\n");
}
