import {
    AccessDeniedResponse,
    parameter,
    type IRoute,
    response,
    Types,
    type IComment,
    RedirectResponse,
    errorMessageResponse,
    AuthMap
} from "../util.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Admin";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "EditUser", "EditUserBlacklist", "GetAltAccounts"
];

export namespace EditUser {
    const NoParameters = Type.Object({
        success: Type.Literal(false),
        message: Type.Literal("param is missing or the value is empty: user"),
        code:    Type.Null()
    });

    export const Route = {
        method:      "PATCH",
        path:        "/admin/users/{id}.json",
        name:        "Edit User",
        auth:        [true, [["admin"], ["bd-staff", "to edit flags of admins"]]],
        // Flag changes are done through a promotion,
        // (https://github.com/e621ng/e621ng/blob/acae76a907ba8ba5c7522e9fc36b1a15812f9526/app/controllers/admin/users_controller.rb#L45)
        // And thus require user[level] to be present, making changing the flags of an admin impossible unless bd staff due to the promotion validation
        // not caring if the user level actually changed (https://github.com/e621ng/e621ng/blob/acae76a907ba8ba5c7522e9fc36b1a15812f9526/app/logical/user_promotion.rb#L75)
        description: `Even if unchanged, user[level] MUST be provided when changing \`can_approve_posts\`, \`no_flagging\`, \`replacements_beta\`, and \`can_upload_free\`. Due to this requirement, editing the flags of any admin (including the current user) will always fail, unless the user is ${AuthMap["bd-staff"].replace(" Required", "")}. This route will not return errors for almost anything.`,
        parameters:  [
            parameter.path("id",                        Types.Number,  "The ID of the user to edit.", true),
            parameter.body("user[level]",               Types.Number,  "The level of the user. Providing this is required for editing any \"flags\"."),
            parameter.body("user[profile_about]",       Types.String,  "The about section of the user."),
            parameter.body("user[can_approve_posts]",   Types.Boolean, "If the user can approve posts."),
            parameter.body("user[profile_artinfo]",     Types.String,  "The \"Artist Information\" section of the user."),
            parameter.body("user[base_upload_limit]",   Types.Number,  "The base upload limit of the user.  **10** by default. Invalid values will be interpreted as **0**."), // nr
            parameter.body("user[email]",               Types.String,  `The email of the user.\n\n${AuthMap["bd-staff"]}`),
            parameter.body("user[verified]",            Types.Boolean, `If the user's email is verified.\n\n${AuthMap["bd-staff"]}`),
            parameter.body("user[enable_privacy_mode]", Types.Boolean, "If the user's favorites are hidden."),
            parameter.body("user[name]",                Types.String,  "The name of the user."),
            parameter.body("user[no_flagging]",         Types.Boolean, "If the user has flagging disabled."),
            parameter.body("user[replacements_beta]",   Types.Boolean, "If the user is part of replacements beta."),
            parameter.body("user[can_upload_free]",     Types.Boolean, "If the user has unrestricted uploads.")
        ],
        responses: [
            RedirectResponse("Success", "https://e621.net/users/{id}"),
            response(400, "javascript", "No Parameters",       NoParameters),
            AccessDeniedResponse(),
            errorMessageResponse("Not BD Staff", "Access Denied: Only BD staff can promote to admin", "none", 403),
            errorMessageResponse("Not BD Staff", "Access Denied: Can't demote BD staff", "none", 403)
        ]
    } satisfies IRoute;
}

export namespace EditUserBlacklist {
    export const Route = {
        method:     "POST",
        path:       "/admin/users/{id}/update_blacklist.json",
        name:       "Edit User's Blacklist",
        auth:       [true, "admin"],
        parameters: [
            parameter.path("id",                     Types.Number, "The ID of the user to edit the blacklist of.", true),
            parameter.body("user[blacklisted_tags]", Types.String, "The user's new blacklist.", true)
        ],
        responses: [
            RedirectResponse("Success", "https://e621.net/admin/users/{id}/edit_blacklist"),
            AccessDeniedResponse(),
            errorMessageResponse("Too Long", "Validation failed: Blacklisted tags is too long (maximum is 150000 characters)", true, 500)
        ]
    } satisfies IRoute;
}

export namespace GetAltAccounts {
    const Body = Type.Array(Type.Union([
        Type.Array(Type.Union([
            Type.Number({ description: "user id (concerned user)", examples: [20] }),
            Type.Array(Type.Number({ description: "user id (suspected alt)", examples: [21] }))
        ])),
        Type.Array(Type.Union([
            Type.Number({ examples: [21] }),
            Type.Array(Type.Number({ examples: [20] }))
        ]))
    ]));

    export const Route = {
        method:      "GET",
        path:        "/admin/users/alt_list.json",
        name:        "Get Alt Accounts",
        auth:        [true, "admin"],
        description: "Returns a list of alt accounts.",
        parameters:  [
            parameter.query("page", Types.Number, "The page of results to get. Results are paginated 250 to a page. Min: 1, Max: 9999")
        ],
        responses: [
            response(200, "javascript", "Success", Body),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}
