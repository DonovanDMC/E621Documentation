import { commonParameters } from "../CommonParameters.js";
import { NoteVersion } from "../structures/index.js";
import {
    parameter,
    type IRoute,
    Types,
    type IComment,
    response,
    rootKey,
    Links
} from "../util.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Note Versions";
export const ParentCategory = "Notes";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "SearchNoteVersions"
];
export const File = "notes/versions.md";

export namespace SearchNoteVersions {
    export const Route = {
        method:      "GET",
        path:        "/note_versions.json",
        name:        "Search Note Versions",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("updater_id", Types.Number, "The ID of the updater."),
            parameter.query("updater_name", Types.String, "The name of thne updater."),
            parameter.query("post_id", Types.Number, "The ID of the post the note is on."),
            parameter.query("note_id", Types.Number, "The ID of the note."),
            parameter.query("is_active", Types.Boolean, "If the note is active (not deleted)."),
            parameter.query("body_matches", Types.String, "The body of the note."),
            commonParameters()
                .id().limit().page()
                .ipAddr("The ip address of the updater.")
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)", Type.Array(NoteVersion)),
            response(200, "javascript", "Success (No Results) !!", rootKey("note_versions"), Links.SearchInconsistency)
        ]
    } satisfies IRoute;
}
