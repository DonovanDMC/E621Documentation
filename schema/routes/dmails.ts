import {
    parameter,
    type IRoute,
    response,
    Types,
    type IComment,
    AccessDeniedResponse,
    NotFoundResponse,
    RedirectResponse,
    NoContentResponse,
    EmptyArray
} from "../util.js";
import { DMail } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "DMails";
export const CategoryDescription = "This api is intentionally limited, you cannot create dmails.";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "GetDMails", "GetDMail", "DeleteDMail", "MarkDMailAsRead", "MarkAllDMailsAsRead"
];

export namespace GetDMails {
    export const Route = {
        method:      "GET",
        path:        "/dmails.json",
        name:        "Get DMails",
        auth:        true,
        description: null,
        parameters:  [
            parameter.query("search[title_matches]", Types.String, "The title of the dmail.", false),
            parameter.query("search[message_matches]", Types.String, "The body of the dmail.", false),
            parameter.query("search[to_name]", Types.String, "The recipient of the dmail.", false),
            parameter.query("search[from_name]", Types.String, "The sender of the dmail.", false),
            commonParameters()
                .limit().page()
        ],
        responses: [
            response(200, "javascript", "Success (Results)", Type.Array(DMail)),
            response(200, "javascript", "Success (No Results)", EmptyArray),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}

export namespace GetDMail {
    export const Route = {
        method:      "GET",
        path:        "/dmails/{id}.json",
        name:        "Get DMail",
        auth:        true,
        description: "Fetching a dmail does not mark it as read.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the dmail to get.", true)
        ],
        responses: [
            response(200, "javascript", "Success", DMail),
            NotFoundResponse(),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}

export namespace DeleteDMail {
    export const Route = {
        method:      "DELETE",
        path:        "/dmails/{id}.json",
        name:        "Delete DMail",
        auth:        true,
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the dmail to delete.", true)
        ],
        responses: [
            // TODO: https://github.com/e621ng/e621ng/pull/575
            RedirectResponse("Success", "https://e621.net/dmails"),
            NotFoundResponse(),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}


export namespace MarkDMailAsRead {
    export const Route = {
        method:      "PUT",
        path:        "/dmails/{id}/mark_as_read.json",
        name:        "Mark DMail As Read",
        auth:        true,
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the dmail to mark as read.", true)
        ],
        responses: [
            NoContentResponse("Success"),
            NotFoundResponse(),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}

export namespace MarkAllDMailsAsRead {
    export const Route = {
        method:      "PUT",
        path:        "/dmails/mark_all_as_read.json",
        name:        "Mark All DMails As Read",
        auth:        true,
        description: null,
        parameters:  [],
        responses:   [
            // TODO: https://github.com/e621ng/e621ng/pull/575
            RedirectResponse("Success", "https://e621.net/dmails"),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}
