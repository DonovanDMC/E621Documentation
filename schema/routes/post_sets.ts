import {
    type IRoute,
    response,
    type IComment,
    parameter,
    Types,
    AccessDeniedResponse,
    NotFoundResponse,
    expectedError,
    AuthMap,
    NoContentResponse,
    rootKey,
    Links,
    InternalServerErrorResponse
} from "../util.js";
import { PostSet } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Post Sets";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "SearchPostSets", "GetPostSet",
    "CreatePostSet", "EditPostSet", "DeletePostSet",
    "AddPostsToPostSet", "RemovePostsFromPostSet",
    "PostSetsForSelect"
];

export namespace SearchPostSets {
    export const Route = {
        method:      "GET",
        path:        "/post_sets.json",
        name:        "Search Post Sets",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("search[name]",     Types.String,  "The name of the set."),
            parameter.query("search[shortname]", Types.String, "The shortname of the set."),
            parameter.query("search[is_public]",  Types.Boolean,  `If the set is public.\n${AuthMap.moderator}`),
            parameter.query("search[creator_name]",     Types.String,  "The name of the creator of the set."),
            parameter.query("search[creator_id]",       Types.Number,  "The ID of the creator of the set."),
            commonParameters()
                .id().limit().page()
                .order("update", "updated_at", "name", "shortname", "created_at", "postcount", "post_count")
        ],
        responses: [
            response(200, "javascript", "Success (Results)",    Type.Array(PostSet)),
            response(200, "javascript", "Success (No Results) !!", rootKey("post_sets"),  Links.SearchInconsistency)
        ]
    } satisfies IRoute;
}

export namespace GetPostSet {
    export const Route = {
        method:      "GET",
        path:        "/post_sets/{id}.json",
        name:        "Get Post Set",
        auth:        [false, [["moderator", "If set is private."]]],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the set.", true)
        ],
        responses: [
            response(200, "javascript", "Success", PostSet),
            AccessDeniedResponse("Access Denied (Private)"),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreatePostSet {
    export const Route = {
        method:      "POST",
        path:        "/post_sets.json",
        name:        "Create Post Set",
        auth:        [true, "janitor", "If account is less than 3 days old."],
        description: null,
        parameters:  [
            parameter.body("post_set[name]",               Types.String, "The name of the set.\n\nMin: 3 / Max: 100", true),
            parameter.body("post_set[shortname]",          Types.String, "The shortname of the set. Cannot be only digits.\n\nMin: 3 / Max: 50", true),
            parameter.body("post_set[description]",        Types.String, "The description of the set.\n\nMax: 10,000", false),
            parameter.body("post_set[is_public]",          Types.Boolean, "If the set is public.", false),
            parameter.body("post_set[transfer_on_delete]", Types.Boolean, "If parents of deleted posts are transferred into the set.", false)
        ],
        responses: [
            response(201, "javascript", "Success", PostSet),
            AccessDeniedResponse(),
            expectedError("Account Too New", ["base", ["Can't make a set public until your account is at least three days old"]]),
            expectedError("Name Taken", ["name", ["is already taken"]]),
            expectedError("Short Name Taken", ["shortname", ["is already taken"]]),
            expectedError("Name Too Short/Long", ["name", ["must be between three and one hundred characters long"]]),
            expectedError("Short Name Too Short/Long", ["shortname", ["must be between three and fifty characters long"]]),
            expectedError("Short Name Only Digits", ["shortname", ["must contain at least one lowercase letter or underscore"]]),
            expectedError("Description Too Long", ["description", ["is too long (maximum is 10000 characters)"]]),
            expectedError("Hourly Limit Reached", ["base", ["You have already created 6 sets in the last hour."]]),
            expectedError("Set Limit Reached", ["base", ["You can only create 75 sets."]])
        ]
    } satisfies IRoute;
}

export namespace EditPostSet {
    export const Route = {
        method:      "PATCH",
        path:        "/comments/{id}.json",
        name:        "Edit Post Set",
        auth:        [true, [["janitor", "If account is less than 3 days old."], ["admin", "If the set is not yours."]]],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the set to edit."),
            parameter.body("post_set[name]",               Types.String, "The name of the set.\n\nMin: 3 / Max: 100", true),
            parameter.body("post_set[shortname]",          Types.String, "The shortname of the set. Cannot be only digits.\n\nMin: 3 / Max: 50", true),
            parameter.body("post_set[description]",        Types.String, "The description of the set.\n\nMax: 10,000", false),
            parameter.body("post_set[is_public]",          Types.Boolean, "If the set is public.", false),
            parameter.body("post_set[transfer_on_delete]", Types.Boolean, "If parents of deleted posts are transferred into the set.", false)
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Account Too New", ["base", ["Can't make a set public until your account is at least three days old"]]),
            expectedError("Name Taken", ["name", ["is already taken"]]),
            expectedError("Short Name Taken", ["shortname", ["is already taken"]]),
            expectedError("Name Too Short/Long", ["name", ["must be between three and one hundred characters long"]]),
            expectedError("Short Name Too Short/Long", ["shortname", ["must be between three and fifty characters long"]]),
            expectedError("Short Name Only Digits", ["shortname", ["must contain at least one lowercase letter or underscore"]]),
            expectedError("Description Too Long", ["description", ["is too long (maximum is 10000 characters)"]])
        ]
    } satisfies IRoute;
}

export namespace DeletePostSet {
    export const Route = {
        method:      "DELETE",
        path:        "/post_sets/{id}.json",
        name:        "Delete Post Set",
        auth:        [true, "admin", "If the set isn't yours."],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the set to delete.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace AddPostsToPostSet {
    export const Route = {
        method:      "POST",
        path:        "/post_sets/{id}/add_posts.json",
        name:        "Add Posts To Post Set",
        auth:        [true, "admin", "If the post set isn't owned or maintained by you."],
        description: "While the limit is 10,000 posts, attempting to add that many posts at once will most likely result in a timeout with status code 524. A request that would take the set over the 10,000 post limit will fail and none of the posts will be added.\nInvalid IDs are silently ignored.\nThis operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the set to add posts to."),
            parameter.body("post_ids[]", Types.Number, "An array of post IDs to add to the set.\nLimit: 10,000", true)
        ],
        responses: [
            response(201, "javascript", "Success", PostSet),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Post Set Too Large", ["base", ["Sets can have up to 10,000 posts each"]]),
            // TODO: https://github.com/e621ng/e621ng/pull/576
            InternalServerErrorResponse("post_ids[] missing")
        ]
    } satisfies IRoute;
}

export namespace RemovePostsFromPostSet {
    export const Route = {
        method:      "POST",
        path:        "/post_sets/{id}/remove_posts.json",
        name:        "Remove Posts From Post Set",
        auth:        [true, "admin", "If the post set isn't owned or maintained by you."],
        description: "Invalid IDs are silently ignored.\nThis operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the set to remove posts from."),
            parameter.body("post_ids[]", Types.Number, "An array of post IDs to remove from the set", true)
        ],
        responses: [
            response(201, "javascript", "Success", PostSet),
            AccessDeniedResponse(),
            NotFoundResponse(),
            // TODO: https://github.com/e621ng/e621ng/pull/576
            InternalServerErrorResponse("post_ids[] missing")
        ]
    } satisfies IRoute;
}

export namespace PostSetsForSelect {
    const SetList = Type.Unsafe<[name: string, id: number]>(Type.Array(Type.Union([
        Type.String({ description: "name" }),
        Type.Number({ description: "id" })
    ])));
    const Body = Type.Object({
        Owned:      SetList,
        Maintained: SetList
    });
    export const Route = {
        method:      "GET",
        path:        "/post_sets/for_select.json",
        name:        "Post Sets For Select",
        auth:        [true],
        description: "Invalid IDs are silently ignored.\nThis operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the set to remove posts from."),
            parameter.body("post_ids[]", Types.Number, "An array of post IDs to remove from the set", true)
        ],
        responses: [
            response(201, "javascript", "Success", Body),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}
