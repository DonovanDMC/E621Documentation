import {
    parameter,
    type IRoute,
    Types,
    type IComment,
    response
} from "../util.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Note Previews";
export const ParentCategory = "Notes";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "NotePreview"
];
export const File = "notes/preview.md";

export namespace NotePreview {
    const Body = Type.Object({
        body: Type.String()
    });
    export const Route = {
        method:      "GET",
        path:        "/note_previews.json",
        name:        "List Popular Posts",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("body", Types.String, "The note body to preview.", true)
        ],
        responses: [
            response(200, "javascript", "Success", Body)
        ]
    } satisfies IRoute;
}
