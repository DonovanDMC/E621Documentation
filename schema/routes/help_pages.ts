import {
    type IRoute,
    response,
    type IComment,
    InternalServerErrorResponse,
    parameter,
    Types,
    NotFoundResponse,
    AccessDeniedResponse,
    expectedError,
    NoContentResponse
} from "../util.js";
import { HelpPage } from "../structures/index.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Help Pages";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "GetHelpPages", "GetHelpPage", "CreateHelpPage", "EditHelpPage", "DeleteHelpPage"
];

export namespace GetHelpPages {
    export const Route = {
        method:      "GET",
        path:        "/help.json",
        name:        "Get Help Pages",
        auth:        false,
        description: "If an e621ng instance has no existing help pages, an error will be thrown. See [e621ng/e621ng#492](https://github.com/e621ng/e621ng/issues/492).\n\nThis endpoint accepts no search parameters.",
        parameters:  [],
        responses:   [
            response(200, "javascript", "Success (Results)",       Type.Array(HelpPage)),
            InternalServerErrorResponse("Success (No Results)")
        ]
    } satisfies IRoute;
}

export namespace GetHelpPage {
    export const Route = {
        method:     "GET",
        path:       "/help/{nameOrID}.json",
        name:       "Get Help Page",
        auth:       false,
        parameters: [
            parameter.path("nameOrID", Types.String, "The name or ID of the help page to get.")
        ],
        responses: [
            response(200, "javascript", "Success", HelpPage),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateHelpPage {
    export const Route = {
        method:     "POST",
        path:       "/help.json",
        name:       "Create Help Page",
        auth:       [true, "admin"],
        parameters: [
            parameter.body("help_page[name]", Types.String, "The name of the help page.", true),
            parameter.body("help_page[wiki_page]", Types.String, "The name of the wiki page the help page will display.", true),
            parameter.body("help_page[title]", Types.String, "The title of the wiki page, Defaults to a [titleized](https://apidock.com/rails/String/titleize) version of `name`."),
            parameter.body("help_page[related]", Types.String, "The related help pages, separated by a comma and a space.")
        ],
        responses: [
            response(200, "javascript", "Success", HelpPage),
            AccessDeniedResponse(),
            expectedError("Wiki Page In Use", ["wiki_page", ["has already been taken"]]),
            expectedError("Wiki Page Does Not Exist", ["wiki_page", ["must exist"]])
        ]
    } satisfies IRoute;
}

export namespace EditHelpPage {
    export const Route = {
        method:      "PATCH",
        path:        "/help/{nameOrID}.json",
        name:        "Edit Help Page",
        auth:        [true, "admin"],
        description: null,
        parameters:  [
            parameter.path("nameOrID", Types.String, "The name or ID of the help page to edit."),
            parameter.body("help_page[name]", Types.String, "The name of the help page."),
            parameter.body("help_page[wiki_page]", Types.String, "The name of the wiki page the help page will display."),
            parameter.body("help_page[title]", Types.String, "The title of the wiki page, Defaults to a [titleized](https://apidock.com/rails/String/titleize) version of `name`."),
            parameter.body("help_page[related]", Types.String, "The related help pages, separated by a comma and a space.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Wiki Page In Use", ["wiki_page", ["has already been taken"]]),
            expectedError("Wiki Page Does Not Exist", ["wiki_page", ["must exist"]])
        ]
    } satisfies IRoute;
}

export namespace DeleteHelpPage {
    export const Route = {
        method:      "DELETE",
        path:        "/help/{nameOrID}.json",
        name:        "Delete Help Page",
        auth:        [true, "admin"],
        description: null,
        parameters:  [
            parameter.path("nameOrID", Types.String, "The name or ID of the help page to delete.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}
