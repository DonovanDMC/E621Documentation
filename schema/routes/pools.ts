import {
    type IRoute,
    response,
    type IComment,
    parameter,
    Types,
    NotFoundResponse,
    AccessDeniedResponse,
    expectedError,
    InternalServerErrorResponse,
    EmptyArray,
    NoContentResponse
} from "../util.js";
import { Pool } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Pools";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "SearchPools", "GetPool", "CreatePool", "DeletePool", "RevertPool"
];


export namespace SearchPools {
    export const Route = {
        method:      "GET",
        path:        "/pools.json",
        name:        "Search Pools",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("search[name_matches]",        Types.String, "The name of the pool."),
            parameter.query("search[description_matches]", Types.String, "The description of the pool."),
            parameter.query("search[creator_name]",        Types.Number, "The creator of the pool."),
            parameter.query("search[creator_id]",          Types.String, "The ID of the creator of the pool/."),
            parameter.query("search[is_active]",           Types.Boolean, "If the pool is \"active\". (Doesn't really mean much.)"),
            parameter.query("search[category]",            Types.String, "The category of the pool. One of: `series`, `collection`"),
            commonParameters()
                .id().limit().page()
                .order("name", "created_at", "post_count")
        ],
        responses: [
            response(200, "javascript", "Success (Results)", Type.Array(Pool)),
            response(200, "javascript", "Success (No Results)", EmptyArray)
        ]
    } satisfies IRoute;
}

export namespace GetPool {
    export const Route = {
        method:     "GET",
        path:       "/pools/{id}.json",
        name:       "Get Pool",
        auth:       false,
        parameters: [
            parameter.path("id", Types.String, "The ID of the pool to get.")
        ],
        responses: [
            response(200, "javascript", "Success", Pool),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreatePool {
    export const Route = {
        method:      "POST",
        path:        "/pools.json",
        name:        "Create Pool",
        auth:        [true, "moderator", "If account is less than one week old."],
        description: "Duplicate post IDs are silently ignored.\nPost IDs are not validated.",
        parameters:  [
            parameter.body("pool[name]",            Types.String, "The name of the pool. Cannot be only digits.\nMin: 1 / Max: 250", true),
            parameter.body("pool[description]",     Types.String, "The description of the pool.\nMax: 10,000", false),
            parameter.body("pool[category]",        Types.String, "The category of the pool. One of: `series`, `collection`", false),
            parameter.body("pool[is_active]",       Types.String, "If the pool is active.", false),
            parameter.body("pool[post_ids][]",      Types.String, "An array of post ids to create the pool with.\nMax: 1000", false),
            parameter.body("pool[post_ids_string]", Types.String, "A space separated string of post ids to create the pool with.\nMax: 1000", false)
        ],
        responses: [
            response(201, "javascript", "Success", Pool),
            AccessDeniedResponse(),
            expectedError("Account Too New",        ["creator",     ["can not yet perform this action. Account is too new."]]),
            expectedError("Name Taken",             ["name",        ["has already been taken"]]),
            expectedError("Name Too Long",          ["name",        ["is too long (maximum is 250 characters)"]]),
            expectedError("Name Only Digits",       ["name",        ["cannot contain only digits"]]),
            expectedError("Description Too Long",   ["description", ["is too long (maximum is 10000 characters)"]]),
            expectedError("Invalid Category",       ["category",    ["is not included in the list"]]),
            expectedError("Hourly Limit Reached",   ["creator",     ["have reached the hourly limit for this action"]]),
            expectedError("Too Many Posts",         ["base",        ["Pools can have up to 1,000 posts each"]]),
            InternalServerErrorResponse("Name Missing")
        ]
    } satisfies IRoute;
}

export namespace DeletePool {
    export const Route = {
        method:      "DELETE",
        path:        "/pools/{id}.json",
        name:        "Delete Pool",
        auth:        [true, "janitor"],
        description: null,
        parameters:  [],
        responses:   [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace RevertPool {
    export const Route = {
        method:      "PUT",
        path:        "/pools/{id}/revert.json",
        name:        "Revert Pool",
        auth:        true,
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the pool to revert.", true),
            parameter.query("version_id", Types.Number, "The ID of the version to revert to.", true)
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}
