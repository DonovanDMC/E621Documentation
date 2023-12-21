import { commonParameters } from "../CommonParameters.js";
import { ForumPost, ForumPostVote } from "../structures/index.js";
import {
    type IRoute,
    type IComment,
    parameter,
    Types,
    response,
    rootKey,
    AccessDeniedResponse,
    NotFoundResponse,
    EmptyObject,
    expectedError,
    NoContentResponse,
    errorMessageResponse
} from "../util.js";
import { WarningType } from "../constants.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Forum Posts";
export const ParentCategory = "Forums";
export const CategoryDescription = "";
export const Comments = [
    {
        content:  "An alias for `/forum_posts` exists: `/fposts`",
        location: "before",
        route:    "SearchForumPosts"
    }
] satisfies Array<IComment>;
export const Order = [
    "SearchForumPosts", "GetForumPost",
    "AddForumPostWarning", "HideForumPost", "UnhideForumPost",
    "CreateForumPost", "EditForumPost", "DeleteForumPost",
    "CreateForumPostVote", "DeleteForumPostVote"
];
export const File = "forums/posts.md";

export namespace SearchForumPosts {
    export const Route = {
        method:      "GET",
        path:        "/forum_posts.json",
        name:        "Search Forum Posts",
        auth:        [false, "moderator", "To search hidden forum posts not created by the authenticated user."],
        description: "Some posts may be in specific categories that require certain user levels to view.",
        parameters:  [
            parameter.query("search[topic_title_matches]", Types.String, "The title of the topic the forum post is in."),
            parameter.query("search[body_matches]", Types.String, "The body of the post."),
            parameter.query("search[creator_id]", Types.Number, "The ID of the creator of the forum post."),
            parameter.query("search[creator_name]", Types.String, "The name of the creator of the forum post."),
            parameter.query("search[topic_category_id]", Types.Number, "The ID of the category the topic containing the forum post is in."),
            parameter.query("search[topic_id]", Types.Number, "The ID of the topic the forum post is in."),
            parameter.query("search[is_hidden]", Types.Boolean, "If the forum post is hidden."),
            commonParameters()
                .id().limit().page()
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)", Type.Array(ForumPost)),
            response(200, "javascript", "Success (No Results) !!", rootKey("forum_posts"))
        ]
    } satisfies IRoute;
}

export namespace GetForumPost {
    export const Route = {
        method:      "GET",
        path:        "/forum_posts/{id}.json",
        name:        "Get Forum Post",
        auth:        [false, "moderator", "If the forum post is hidden, and not created by the authenticated user."],
        description: "Some posts may be in specific categories that require certain user levels to view.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum post.")
        ],
        responses: [
            response(200, "javascript", "Success", ForumPost),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace AddForumPostWarning {
    const Body = Type.Object({
        html:  Type.String({ description: "new forum post html contents" }),
        posts: EmptyObject
    });

    export const Route = {
        method:      "POST",
        path:        "/forum_posts/{id}/warning.json",
        name:        "Add Warning To Forum Post",
        auth:        [true, "moderator"],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum post to add a warning to."),
            parameter.body("record_type", Types.String, `The type of warning to add to the forum post. One of: \`${Object.values(WarningType).join("`, `")}\`, \`unmark\`.`,true)
        ],
        responses: [
            response(200, "javascript", "Success", Body),
            AccessDeniedResponse(),
            NotFoundResponse(),
            errorMessageResponse("Invalid Warning Type", "'TYPE' is not a valid warning_type", true, 500)
        ]
    } satisfies IRoute;
}

export namespace HideForumPost {
    export const Route = {
        method:      "POST",
        path:        "/forum_posts/{id}/hide.json",
        name:        "Hide Forum Post",
        auth:        [true, "moderator", "If the forum post is not yours."],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum post to hide.")
        ],
        responses: [
            response(201, "javascript", "Success", ForumPost),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace UnhideForumPost {
    export const Route = {
        method:      "POST",
        path:        "/forum_posts/{id}/unhide.json",
        name:        "Unhide Forum Post",
        auth:        [true, "moderator"],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum post to unhide.")
        ],
        responses: [
            response(201, "javascript", "Success", ForumPost),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateForumPost {
    export const Route = {
        method:      "POST",
        path:        "/forum_posts.json",
        name:        "Create Forum Post",
        auth:        true,
        description: "Account must be at least 3 days old.\n\nSome topics may be in specific categories that require certain user levels to reply.",
        parameters:  [
            parameter.body("forum_post[body]", Types.String, "The body of the forum post.", true),
            parameter.body("forum_post[topic_id]", Types.Number, "The ID of the topic to create the forum post in.", true)
        ],
        responses: [
            response(201, "javascript", "Success", ForumPost),
            AccessDeniedResponse(),
            expectedError("Account Too New", ["creator", ["can not yet perform this action. Account is too new"]]),
            expectedError("Invalid Forum Topic", ["topic", ["must exist"]], ["base", ["Topic ID is invalid"]]),
            expectedError("Missing Body", ["body", ["can't be blank", "is too short (minimum is 1 character"]]),
            expectedError("Body Too Long", ["body", ["is too long (maximum is 50000 characters)"]]),
            expectedError("Topic (Category) Restricted", ["topic", ["is restricted", "does not allow replies"]])
        ]
    } satisfies IRoute;
}

export namespace EditForumPost {
    export const Route = {
        method:      "PATCH",
        path:        "/forum_posts/{id}.json",
        name:        "Edit Forum Post",
        auth:        [true, "admin", "If the forum post is not yours."],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum post to edit."),
            parameter.body("forum_post[body]", Types.String, "The body of the forum post.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Blank Body", ["body", ["can't be blank", "is too short (minimum is 1 character"]]),
            expectedError("Body Too Long", ["body", ["is too long (maximum is 50000 characters)"]])
        ]
    } satisfies IRoute;
}

export namespace DeleteForumPost {
    export const Route = {
        method:      "DELETE",
        path:        "/forum_posts/{id}.json",
        name:        "Delete Forum Post",
        auth:        [true, "admin"],
        description: null,
        parameters:  [],
        responses:   [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateForumPostVote {
    export const Route = {
        method:      "POST",
        path:        "/forum_posts/{id}/votes.json",
        name:        "Create Forum Post Vote",
        auth:        [true, "janitor", "If account is less than 3 days old."],
        description: "Votes can only be added to posts which are the OP of an alias request, implication request, or bulk update request.\n\nAccess denied error messages can be combined, separated by a semicolon and space (`; `).",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum post to vote on."),
            parameter.body("forum_post_vote[score]", Types.Number, "The vote to cast. One of: `-1`, `0`, `1`.", true)
        ],
        responses: [
            response(201, "javascript", "Success", ForumPostVote),
            AccessDeniedResponse(),
            errorMessageResponse("Account Too New", "Access Denied: Creator can not yet perform this action. Account is too new", "none", 403),
            errorMessageResponse("Invalid Score", "Access Denied: Score is not included in the list", "none", 403),
            errorMessageResponse("Cannot Vote On Own Post", "Access Denied: You cannot vote on your own requests", "none", 403),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace DeleteForumPostVote {
    export const Route = {
        method:      "DELETE",
        path:        "/forum_posts/{id}/votes.json",
        name:        "Delete Forum Post Vote",
        auth:        true,
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum post to delete the vote on.")
        ],
        responses: [
            response(200, "javascript", "Success", EmptyObject),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}
