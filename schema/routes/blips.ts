import {
    Links,
    parameter,
    type IRoute,
    response,
    Types,
    type IComment,
    rootKey,
    NotFoundResponse,
    AccessDeniedResponse,
    NoContentResponse,
    expectedError,
    EmptyObject,
    errorMessageResponse
} from "../util.js";
import { WarningType } from "../constants.js";
import { Blip } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Blips";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "SearchBlips", "GetBlip", "AddBlipWarning",
    "HideBlip", "UnhideBlip",
    "CreateBlip", "EditBlip", "DeleteBlip"
];

export namespace SearchBlips {
    const Orders = [
        "updated_at", "updated_at_desc"
    ] as const;

    export const Route = {
        method:      "GET",
        path:        "/blips.json",
        name:        "Search Blips",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("search[creator_name]", Types.String, "Search by the name of the creator of the blip.", false),
            parameter.query("search[creator_id]", Types.String, "Search by the id of the creator of the blip.", false),
            parameter.query("search[body_matches]", Types.String, "Search by the body of the blip.", false),
            parameter.query("search[response_to]", Types.Number, "Search by the blip the blip is responding to.", false),
            parameter.query("search[ip_addr]", Types.String, `Search by the ip address of the creator. See ${Links.Search.IP_ADDR}.`),
            commonParameters()
                .id().limit().page()
                .order(Orders)
        ],
        responses: [
            response(200, "javascript", "Success (Results)",       Type.Array(Blip)),
            response(200, "javascript", "Success (No Results) !!", rootKey("blips"), Links.SearchInconsistency)
        ]
    } satisfies IRoute;
}

export namespace GetBlip {
    export const Route = {
        method:      "GET",
        path:        "/blips/{id}.json",
        name:        "Get Blip",
        auth:        false,
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the blip.")
        ],
        responses: [
            response(200, "javascript", "Success", Blip),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace AddBlipWarning {
    const Body = Type.Object({
        html:  Type.String({ description: "new blip html contents" }),
        posts: EmptyObject
    });

    export const Route = {
        method:      "POST",
        path:        "/blips/{id}/warning.json",
        name:        "Add Warning To Blip",
        auth:        [true, "moderator"],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the blip to add a warning to."),
            parameter.body("record_type", Types.String, `The type of warning to add to the blip. One of: \`${Object.values(WarningType).join("`, `")}\`, \`unmark\`.`,true)
        ],
        responses: [
            response(200, "javascript", "Success", Body),
            AccessDeniedResponse(),
            NotFoundResponse(),
            errorMessageResponse("Invalid Warning Type", "'TYPE' is not a valid warning_type", true, 500)
        ]
    } satisfies IRoute;
}

export namespace HideBlip {
    export const Route = {
        method:      "POST",
        path:        "/blips/{id}/hide.json",
        name:        "Hide Blip",
        auth:        [true, "moderator", "If the blip is not yours."],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the blip to hide.")
        ],
        responses: [
            response(201, "javascript", "Success", Blip),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace UnhideBlip {
    export const Route = {
        method:      "POST",
        path:        "/blips/{id}/unhide.json",
        name:        "Unhide Blip",
        auth:        [true, "moderator"],
        description: "This operation is idempotent.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the blip to unhide.")
        ],
        responses: [
            response(201, "javascript", "Success", Blip),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateBlip {
    export const Route = {
        method:      "POST",
        path:        "/blips.json",
        name:        "Create Blip",
        auth:        [true, "privileged", "If account is less than one week old."],
        description: null,
        parameters:  [
            parameter.body("blip[body]",        Types.String, "The body of the blip.", true),
            parameter.body("blip[response_to]", Types.Number, "The ID of the blip to respond to.")
        ],
        responses: [
            response(201, "javascript", "Success",         Blip),
            AccessDeniedResponse(),
            expectedError("Invalid Response To", ["response_to", ["must exist"]]),
            expectedError("Empty Body", ["body", ["can't be blank"]]),
            expectedError("Body Too Short", ["body", ["is too short (minimum is 5 characters)"]]),
            expectedError("Body Too Long", ["body", ["is too long (maximum is 1000 characters)"]]),
            expectedError("Account Too New", ["creator", ["User can not yet perform this action. Account is too new."]])
        ]
    } satisfies IRoute;
}

export namespace EditBlip {
    export const Route = {
        method:      "POST",
        path:        "/blips/{id}.json",
        name:        "Edit Blip",
        auth:        [true, "admin", "If the blip is older than 5 minutes, or is not yours."],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the blip to edit."),
            parameter.body("blip[body]",        Types.String, "The new body of the blip.", true)
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Empty Body", ["body", ["can't be blank"]]),
            expectedError("Body Too Short", ["body", ["is too short (minimum is 5 characters)"]]),
            expectedError("Body Too Long", ["body", ["is too long (maximum is 1000 characters)"]]),
            errorMessageResponse("Blip Too Old", "You cannot edit blips more than 5 minutes old", false, 422)
        ]
    } satisfies IRoute;
}

export namespace DeleteBlip {
    export const Route = {
        method:      "DELETE",
        path:        "/blips/{id}.json",
        name:        "Delete Blip",
        auth:        [true, "admin"],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the blip to delete.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}
