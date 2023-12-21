import { commonParameters } from "../CommonParameters.js";
import { ForumPost, ForumPostVote, ForumTopic } from "../structures/index.js";
import {
    type IRoute,
    type IComment,
    parameter,
    Types,
    response,
    AccessDeniedResponse,
    NotFoundResponse,
    EmptyObject,
    expectedError,
    NoContentResponse,
    errorMessageResponse,
    EmptyArray,
    RedirectResponse,
    AuthMap,
    InternalServerErrorResponse
} from "../util.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Forum Topics";
export const ParentCategory = "Forums";
export const CategoryDescription = "";
export const Comments = [
    {
        content:  "An alias for `/forum_topics` exists: `/ftopics` (hide, unhide, mark_all_as_read, subscribe, and ubsuscribe routes are not supported).",
        location: "before",
        route:    "SearchForumTopics"
    }
] satisfies Array<IComment>;
export const Order = [
    "SearchForumTopics", "GetForumTopic", "HideForumTopic", "UnhideForumTopic", "SubscribeForumTopic", "UnsubscribeForumTopic", "MarkAllForumTopicsRead", "CreateForumTopic", "EditForumTopic", "DeleteForumPost", "CreateForumPostVote", "DeleteForumPostVote"
];
export const File = "forums/topics.md";

export namespace SearchForumTopics {
    export const Route = {
        method:      "GET",
        path:        "/forum_topics.json",
        name:        "Search Forum Topics",
        auth:        [false, "moderator", "To search hidden forum topics not created by the authenticated user."],
        description: "Some topics may be in specific categories that require certain user levels to view.",
        parameters:  [
            parameter.query("search[title_matches]", Types.String, "The title of the forum topic (fuzzy matching)."),
            parameter.query("search[title]", Types.String, "The title of the forum topic (exact matching)."),
            parameter.query("search[category_id]", Types.Number, "The ID of the category the forum topic is in."),
            parameter.query("search[is_hidden]", Types.Boolean, "If the forum topic is hidden."),
            parameter.query("search[is_locked]", Types.Boolean, "If the forum topic is locked."),
            parameter.query("search[is_sticky]", Types.Boolean, "If the forum topic is sticky."),
            commonParameters()
                .order("sticky")
                .id().limit().page()
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)", Type.Array(ForumTopic)),
            response(200, "javascript", "Success (No Results)", EmptyArray)
        ]
    } satisfies IRoute;
}

export namespace GetForumTopic {
    export const Route = {
        method:      "GET",
        path:        "/forum_topics/{id}.json",
        name:        "Get Forum Topic",
        auth:        [false, "moderator", "If the forum topic is hidden, and not created by the authenticated user."],
        description: "Some topics may be in specific categories that require certain user levels to view.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum topic.")
        ],
        responses: [
            response(200, "javascript", "Success", ForumTopic),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace HideForumTopic {
    export const Route = {
        method:      "POST",
        path:        "/forum_topics/{id}/hide.json",
        name:        "Hide Forum Topic",
        auth:        [true, "moderator", "If the forum topic is not yours."],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum topic to hide.")
        ],
        responses: [
            response(201, "javascript", "Success", ForumTopic),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace UnhideForumTopic {
    export const Route = {
        method:      "POST",
        path:        "/forum_topics/{id}/unhide.json",
        name:        "Unhide Forum Topic",
        auth:        [true, "moderator"],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum topic to unhide.")
        ],
        responses: [
            response(201, "javascript", "Success", ForumTopic),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace SubscribeForumTopic {
    export const Route = {
        method:      "POST",
        path:        "/forum_topics/{id}/subscribe.json",
        name:        "Subscribe To Forum Topic",
        auth:        true,
        description: "Some topics may be in specific categories that require certain user levels to view.\n\nThis operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum topic to subscribe to.")
        ],
        responses: [
            response(201, "javascript", "Success", ForumTopic),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace UnsubscribeForumTopic {
    export const Route = {
        method:      "POST",
        path:        "/forum_topics/{id}/subscribe.json",
        name:        "Unubscribe From Forum Topic",
        auth:        true,
        description: "Some topics may be in specific categories that require certain user levels to view.\n\nThis operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum topic to unsubscribe from.")
        ],
        responses: [
            response(201, "javascript", "Success", ForumTopic),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace MarkAllForumTopicsRead {
    export const Route = {
        method:      "POST",
        path:        "/forum_topics/mark_all_as_read.json",
        name:        "Mark All Forum Topics As Read",
        auth:        true,
        description: null,
        parameters:  [],
        responses:   [
            RedirectResponse("Success", "https://e621.net/forum_topics")
        ]
    } satisfies IRoute;
}

export namespace CreateForumTopic {
    export const Route = {
        method:      "POST",
        path:        "/forum_topics.json",
        name:        "Create Forum Topic",
        auth:        true,
        description: "Some topics may be in specific categories that require certain user levels to create topics.",
        parameters:  [
            parameter.body("forum_topic[title]", Types.String, "The title of the forum topic."),
            parameter.body("forum_topic[category_id]", Types.Number, "The ID of the category the forum topic is in."),
            parameter.body("forum_topic[is_sticky]", Types.Number, `If the forum topic is sticky.\n\n${AuthMap.moderator}`),
            parameter.body("forum_topic[is_locked]", Types.Number, `If the forum topic is locked.\n\n${AuthMap.moderator}`),
            parameter.body("forum_topic[original_post_attributes][body]", Types.String, "The body of the first post in the topic. Mutually exclusive with `forum_topic[original_post_attributes][id]`."),
            parameter.body("forum_topic[original_post_attributes][id]", Types.Boolean, "IThe ID of the post to use as the first post of this topic. Mutually exclusive with `forum_topic[original_post_attributes][body]`.")
        ],
        responses: [
            response(201, "javascript", "Success", ForumPost),
            AccessDeniedResponse(),
            expectedError("Account Too New", ["original_post.creator", ["can not yet perform this action. Account is too new"]]),
            expectedError("Invalid Original Post", ["original_post", ["is invalid"]]),
            expectedError("Restricted Topic", ["original_post.topic", ["is restricted", "does not allow replies"]]),
            expectedError("Restricted Category", ["category", ["does not allow new topics"]]),
            expectedError("Blank Original Post", ["original_post", ["can't be blank"]]),
            // https://github.com/e621ng/e621ng/pull/524
            // expectedError("Invalid Category", ["category", ["must exist"]]),
            InternalServerErrorResponse("Invalid Category"),
            expectedError("Title Too Long", ["title", ["is too long (maximum is 250 characters)"]]),
            expectedError("Original Post Body Too Long", ["original_post.body", ["is too long (maximum is 50000 characters)"]])
        ]
    } satisfies IRoute;
}

export namespace EditForumTopic {
    export const Route = {
        method:      "PATCH",
        path:        "/forum_topics/{id}.json",
        name:        "Edit Forum Topic",
        auth:        [true, "admin", "If the forum topic is not yours."],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the forum topic to edit."),
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
