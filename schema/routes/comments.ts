import {
    type IRoute,
    response,
    type IComment,
    parameter,
    Types,
    InternalServerErrorResponse,
    Links,
    rootKey,
    AccessDeniedResponse,
    NotFoundResponse,
    EmptyObject,
    expectedError,
    AuthMap,
    NoContentResponse,
    errorMessageResponse
} from "../util.js";
import { Comment, Post } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { WarningType } from "../constants.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Comments";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "SearchCommentsGroupByPost", "SearchCommentsGroupByComment", "GetComment",
    "AddCommentWarning", "HideComment", "UnhideComment",
    "CreateComment", "EditComment", "DeleteComment",
    "CreateCommentVote", "DeleteCommentVote"
];
export const File = "comments/README.md";

export namespace SearchCommentsGroupByPost {
    const Body = Type.Object({
        posts: Type.Array(Post)
    });
    export const Route = {
        method:      "GET",
        path:        "/comments.json",
        name:        "Search Comments",
        auth:        false,
        description: "No comment information will be returned in this route. See {{link:SearchCommentsGroupByComment}}. This is for ui use, so it doesn't serve much api use.\n\nThis route does not support the `limit` parameter. The maximum results will always be 5.\n\nThis route does not support `search[id]`.",
        parameters:  [
            parameter.query("group_by", "`post`",      "Where to start the relation of comments from."),
            parameter.query("tags",     Types.String,  "The tags of the posts."),
            commonParameters()
                .page()
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)", Body),
            InternalServerErrorResponse("Success (No Results)")
        ]
    } satisfies IRoute;
}

export namespace SearchCommentsGroupByComment {
    const _orders = [
        "post_id", "score", "updated_at"
    ] as const;
    const Orders = _orders.flatMap(x => [x, `${x}_desc`]) as Array<`${typeof _orders[number]}${"_desc" | ""}`>;
    export const Route = {
        method:      "GET",
        path:        "/comments.json?group_by=comment",
        name:        "Search Comments (Group By Comment)",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("group_by",                Types.String,    "`comment`", true),
            parameter.query("search[body_matches]",     Types.String,  "The body of the comment."),
            parameter.query("search[do_not_bump_post]", Types.Boolean, "If the post did not bump. The UI for searching inverts this option."),
            parameter.query("search[post_tags_match]",  Types.String,  "The tags of the post the comments are on."),
            parameter.query("search[creator_name]",     Types.String,  "The name of the creator of the comment."),
            parameter.query("search[creator_id]",       Types.Number,  "The ID of the creator of the comment."),
            parameter.query("search[is_hidden]",        Types.Boolean, "If the comment is hidden."),
            parameter.query("search[is_sticky]",        Types.Boolean, "If the comment is sticky (post as moderator)."),
            parameter.query("search[post_id]",          Types.Number,  "The ID of the post the comment was made on. Multiple post ids can be separated by commas."),
            parameter.query("search[poster_id]",        Types.Number,  "The ID of the user that created the post the comment is on."),
            commonParameters()
                .id().limit().page()
                .order(Orders)
                .ipAddr("The IP Address of the creator of the comment.")
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)",    Type.Array(Comment)),
            response(200, "javascript", "Success (No Results) !!", rootKey("comments"), Links.SearchInconsistency)
        ]
    } satisfies IRoute;
}

export namespace GetComment {
    export const Route = {
        method:      "GET",
        path:        "/comments/{id}.json",
        name:        "Get Comment",
        auth:        [false, [["moderator", "If comment is hidden."]]],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment.", true)
        ],
        responses: [
            response(200, "javascript", "Success", Comment),
            AccessDeniedResponse("Access Denied (Hidden)"),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace AddCommentWarning {
    const Body = Type.Object({
        html:  Type.String({ description: "new comment html contents" }),
        posts: EmptyObject
    });

    export const Route = {
        method:      "POST",
        path:        "/comments/{id}/warning.json",
        name:        "Add Warning To Comment",
        auth:        [true, "moderator"],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment to add a warning to."),
            parameter.body("record_type", Types.String, `The type of warning to add to the comment. One of: \`${Object.values(WarningType).join("`, `")}\`, \`unmark\`.`,true)
        ],
        responses: [
            response(200, "javascript", "Success", Body),
            AccessDeniedResponse(),
            NotFoundResponse(),
            errorMessageResponse("Invalid Warning Type", "'TYPE' is not a valid warning_type", true, 500)
        ]
    } satisfies IRoute;
}

export namespace HideComment {
    export const Route = {
        method:      "POST",
        path:        "/comments/{id}/hide.json",
        name:        "Hide Comment",
        auth:        [true, "moderator", "If the comment is not yours."],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment to hide.")
        ],
        responses: [
            response(201, "javascript", "Success", Comment),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace UnhideComment {
    export const Route = {
        method:      "POST",
        path:        "/comments/{id}/unhide.json",
        name:        "Unhide Comment",
        auth:        [true, "moderator"],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment to unhide.")
        ],
        responses: [
            response(201, "javascript", "Success", Comment),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateComment {
    export const Route = {
        method:      "POST",
        path:        "/comments.json",
        name:        "Create Comment",
        auth:        [true, [["privileged", "If account is less than one week old."], ["moderator", "If comment section is locked."]]],
        description: null,
        parameters:  [
            parameter.body("comment[body]",    Types.String, "The body of the comment.\n\nMin: 1 / Max: 10,000", true),
            parameter.body("comment[post_id]", Types.Number, "The ID of the post to comment on.", true),
            parameter.body("comment[is_sticky]", Types.Boolean, `If the comment is sticky (post as moderator).\n\n${AuthMap.moderator}`),
            parameter.body("comment[is_hidden]", Types.Boolean, `If the comment is hidden.\n\n${AuthMap.moderator}`),
            parameter.body("comment[do_not_bump_post]", Types.Boolean, "If the post should not be bumped.")
        ],
        responses: [
            response(201, "javascript", "Success", Comment),
            AccessDeniedResponse(),
            expectedError("Empty Body", ["body", ["has no content"]]),
            expectedError("Body Too Short", ["body", ["is too short (minimum is 1 character)"]]),
            expectedError("Body Too Long", ["body", ["is too long (maximum is 10000 characters)"]]),
            expectedError("Account Too New", ["base", ["User can not yet perform this action. Account is too new."]]),
            expectedError("Missing or Invalid post_id", ["post", ["must exist"]]),
            expectedError("Comments Locked", ["base" , ["Post has comments locked"]])
        ]
    } satisfies IRoute;
}

export namespace EditComment {
    export const Route = {
        method:      "PATCH",
        path:        "/comments/{id}.json",
        name:        "Edit Comment",
        auth:        [true, [["moderator", "If comment section is locked."], ["admin", "If the comment is not yours."]]],
        description: `Edits performed within 5 minutes of creation will not show the "edited" text.\n\nIf the comment is not yours, the edit text will show "updated by NAME". This ignores the normal time window.\n\n${AuthMap.moderator} if comment is marked (shows warn, record, or ban message).\n\nThis operation is idempotent.`,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment to edit."),
            parameter.body("comment[body]",    Types.String, "The body of the comment.\n\nMin: 1 / Max: 10,000", true),
            parameter.body("comment[is_sticky]", Types.Boolean, `If the comment is sticky (post as moderator).\n\n${AuthMap.moderator} if own comment\n\n${AuthMap.admin} otherwise`),
            parameter.body("comment[is_hidden]", Types.Boolean, `If the comment is hidden.\n\n${AuthMap.moderator} if own comment\n\n${AuthMap.admin} otherwise`)
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Empty Body", ["body", ["has no content"]]),
            expectedError("Body Too Short", ["body", ["is too short (minimum is 1 character)"]]),
            expectedError("Body Too Long", ["body", ["is too long (maximum is 10000 characters)"]]),
            expectedError("Comments Locked", ["base" , ["Post has comments locked"]])
        ]
    } satisfies IRoute;
}

export namespace DeleteComment {
    export const Route = {
        method:      "DELETE",
        path:        "/comments/{id}.json",
        name:        "Delete Comment",
        auth:        [true, "admin"],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment to delete.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateCommentVote {
    const Body = Type.Object({
        score:     Type.Number({ examples: [1] }),
        our_score: Type.Number({ examples: [1], description: "our current vote: -1, 0, 1" })
    });

    export const Route = {
        method:      "POST",
        path:        "/comments/{id}/votes.json",
        auth:        [true, "privileged", "If account is less than 3 days old."],
        name:        "Vote On Comment",
        description: "New votes cannot be cast if the comments section is locked. To remove an existing vote, send a request with the current vote. (e.g. -1 = send -1, they will cancel out). You can also use the `DELETE` method.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment to vote on."),
            parameter.body("score", Types.Number, "The vote to cast. One of: `-1`, `1`.", true),
            parameter.body("no_unvote", Types.Boolean, "If the vote should not be removed if it already exists.")
        ],
        responses: [
            response(200, "javascript", "Success", Body),
            AccessDeniedResponse(),
            NotFoundResponse(),
            errorMessageResponse("Account Too New", "Validation failed: User can not yet perform this action. Account is too new"),
            errorMessageResponse("Own Comment", "Validation failed: You cannot vote on your own comments"),
            errorMessageResponse("Sticky Comment", "Validation failed: You cannot vote on sticky comments"),
            errorMessageResponse("Invalid Vote", "Invalid vote"),
            errorMessageResponse("Locked Vote", "Vote is locked"),
            errorMessageResponse("Comment Section Locked", "Comment section is locked")
        ]
    } satisfies IRoute;
}

export namespace DeleteCommentVote {
    export const Route = {
        method:      "DELETE",
        path:        "/comments/{id}/votes.json",
        auth:        true,
        name:        "Remove Comment Vote",
        description: "The only vote removed will be the currently authenticated user's vote.\n\nThis operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the comment to remove the vote from.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            errorMessageResponse("Locked Vote", "You can't remove locked votes")
        ]
    } satisfies IRoute;
}
