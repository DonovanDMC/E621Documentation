import {
    parameter,
    type IRoute,
    Types,
    type IComment,
    NoContentResponse,
    AccessDeniedResponse
} from "../util.js";

export const CategoryName = "Comment Votes";
export const ParentCategory = "Comments";
export const CategoryDescription = "";
export const Comments = [
    {
        content:  "Searching is html only.",
        location: "before",
        route:    "LockCommentVotes"
    }
] satisfies Array<IComment>;
export const Order = [
    "LockCommentVotes", "DeleteCommentVotes"
];
export const File = "comments/votes.md";

export namespace LockCommentVotes {
    export const Route = {
        method:      "POST",
        path:        "/comment_votes/lock.json",
        name:        "Lock Comment Votes",
        auth:        [true, "moderator"],
        description: "An error is not returned if an invalid id is provided.\n\nLocked votes cannot be unlocked, they must be deleted.\n\nThis operation is idempotent.",
        parameters:  [
            parameter.body("ids", Types.String, "Comma separated list of votes to lock. Invalid IDs are ignored.", true)
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}

export namespace DeleteCommentVotes {
    export const Route = {
        method:      "POST",
        path:        "/comment_votes/{id}/delete.json",
        name:        "Delete Comment Votes",
        auth:        [true, "admin"],
        description: "An error is not returned if an invalid id is provided.\n\nThis operation is idempotent.",
        parameters:  [
            parameter.body("ids", Types.String, "Comma separated list of votes to delete. Invalid IDs are ignored.", true)
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}
