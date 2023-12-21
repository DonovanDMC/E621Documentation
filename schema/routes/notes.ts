import {
    type IRoute,
    response,
    type IComment,
    parameter,
    Types,
    rootKey,
    NotFoundResponse,
    NoContentResponse,
    AccessDeniedResponse
} from "../util.js";
import { Note } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Notes";
export const CategoryDescription = "";
export const Comments = [
    {
        content:  "The notes route returns errors differently than other routes. Errors are concentrated in a single `reasons` key at the root.",
        location: "before",
        route:    "SearchNotes"
    }
] satisfies Array<IComment>;
export const Order = [
    "SearchNotes", "GetNote", "CreateNote", "EditNote", "DeleteNote"
];
export const File = "notes/README.md";

// the notes controller renders errors differently
function expectedError<T extends string>(title: string, errors: Array<T>, comment?: string) {
    return response(422, "javascript", title, Type.Object({
        success: Type.Literal(false),
        reasons: Type.Array(errors.length === 1 ? Type.Literal(errors[0]) : Type.Union(errors.map(e => Type.Literal(e))))
    }), comment);
}

export namespace SearchNotes {
    export const Route = {
        method:      "GET",
        path:        "/notes.json",
        name:        "Search Notes",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("search[body_matches]",    Types.String, "The body of the note."),
            parameter.query("search[is_active]",       Types.String, "If the note is active."),
            parameter.query("search[post_id]",         Types.Number, "The ID of the post the note is on. Multiple posts can be provided as a comma separated list."),
            parameter.query("search[post_tags_match]", Types.String, "The tags of the post the note is on."),
            parameter.query("search[creator_name]",    Types.String, "The name of the creator of the note."),
            parameter.query("search[creator_id]",      Types.String, "The ID of the creator of the note."),
            commonParameters()
                .id().limit().page()
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)",       Type.Array(Note)),
            response(200, "javascript", "Success (No Results) !!", rootKey("notes"))
        ]
    } satisfies IRoute;
}

export namespace GetNote {
    export const Route = {
        method:     "GET",
        path:       "/notes/{id}.json",
        name:       "Get Note",
        auth:       false,
        parameters: [
            parameter.path("id", Types.String, "The ID of the note to get.")
        ],
        responses: [
            response(200, "javascript", "Success", Note),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateNote {
    const Body = Type.Composite([Note, Type.Object({
        html_id: Type.Union([Type.Null(), Type.String()])
    })]);
    export const Route = {
        method:     "POST",
        path:       "/notes.json",
        name:       "Create Note",
        auth:       [true, "privileged", "If account is less than one week old."],
        parameters: [
            parameter.body("note[post_id]", Types.String, "The ID of the post to create the note on.", true),
            parameter.body("note[x]",       Types.Number, "The X coordinate of the note.", true),
            parameter.body("note[y]",       Types.Number, "The Y coordinate of the note.", true),
            parameter.body("note[width]"  , Types.Number, "The width of the note.", true),
            parameter.body("note[height]",  Types.Number, "The height of the note.", true),
            parameter.body("note[body]",    Types.String, "The body of the note.", true),
            parameter.body("note[html_id]", Types.String, "A pass-through string.")
        ],
        responses: [
            response(200, "javascript", "Success", Body),
            AccessDeniedResponse(),
            expectedError("Account Too New",   ["User can not yet perform this action. Account is too new."]),
            expectedError("Invalid Placement", ["Note must be inside the image"], "Invalid X/Y or width/height stretch outside of image."),
            expectedError("Note Locked",       ["Post is note locked"]),
            expectedError("Body Too Long",     ["Body is too long (maximum is 1000 characters)"]),
            expectedError("Body Too Short",    ["Body is too short (minimum is 1 character)"]),
            expectedError("Body Empty",        ["Body can't be blank"]),
            expectedError("Invalid Post",      ["Post must exist"]),
            expectedError("Post Not Provided", ["Post can't be blank"])
        ]
    } satisfies IRoute;
}

export namespace EditNote {
    export const Route = {
        method:     "PATCH",
        path:       "/notes/{id}.json",
        name:       "Edit Note",
        auth:       [true, "privileged", "If account is less than one week old."],
        parameters: [
            parameter.path("id",            Types.String, "The ID of the note to edit.", true),
            parameter.body("note[x]",       Types.Number, "The X coordinate of the note."),
            parameter.body("note[y]",       Types.Number, "The Y coordinate of the note."),
            parameter.body("note[width]"  , Types.Number, "The width of the note."),
            parameter.body("note[height]",  Types.Number, "The height of the note."),
            parameter.body("note[body]",    Types.String, "The body of the note.")

        ],
        responses: [
            response(200, "javascript", "Success", Note),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Account Too New", ["User can not yet perform this action. Account is too new."]),
            expectedError("Invalid Placement", ["Note must be inside the image"], "Invalid X/Y or width/height stretch outside of image."),
            expectedError("Note Locked", ["Post is note locked"]),
            expectedError("Body Too Long", ["Body is too long (maximum is 1000 characters)"]),
            expectedError("Body Too Short", ["Body is too short (minimum is 1 character)"]),
            expectedError("Body Empty", ["Body can't be blank"])
        ]
    } satisfies IRoute;
}

export namespace DeleteNote {
    export const Route = {
        method:      "DELETE",
        path:        "/notes/{id}.json",
        name:        "Delete Note",
        auth:        [true, "privileged", "If account is less than one week old."],
        description: "This operation is idempotent.\n\nA success will be returned even if the note does not exist.\n\nDeleting a note does not actually delete it, it just changes `is_active` to false.",
        parameters:  [
            parameter.path("id",            Types.String, "The ID of the note to edit.", true),
            parameter.body("note[x]",       Types.Number, "The X coordinate of the note."),
            parameter.body("note[y]",       Types.Number, "The Y coordinate of the note."),
            parameter.body("note[width]"  , Types.Number, "The width of the note."),
            parameter.body("note[height]",  Types.Number, "The height of the note."),
            parameter.body("note[body]",    Types.String, "The body of the note.")

        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Account Too New", ["User can not yet perform this action. Account is too new."]),
            expectedError("Note Locked", ["Post is note locked"])
        ]
    } satisfies IRoute;
}
