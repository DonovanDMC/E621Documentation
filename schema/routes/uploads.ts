import { commonParameters } from "../CommonParameters.js";
import { Upload } from "../structures/index.js";
import {
    parameter,
    type IRoute,
    Types,
    type IComment,
    response,
    rootKey,
    Links,
    AuthMap,
    AccessDeniedResponse,
    NotFoundResponse
} from "../util.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Uploads";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "SearchUploads", "GetUpload", "CreateUpload"
];

export namespace SearchUploads {
    export const Route = {
        method:      "GET",
        path:        "/uploads.json",
        name:        "Search Uploads",
        auth:        [true, "janitor"],
        description: null,
        parameters:  [
            parameter.query("uploader_id",     Types.Number, "The ID of the uploader."),
            parameter.query("uploader_name",   Types.String, "The name of the uploader."),
            parameter.query("source",          Types.String, "Exact matching for the provided source."),
            parameter.query("source_matches",  Types.String, "Like matching for the provided source."),
            parameter.query("rating",          Types.String, "The rating of the upload. One of: `s`, `q`, `e`"),
            // TODO: currently does not work (https://github.com/e621ng/e621ng/pull/578)
            parameter.query("parent_id",       Types.Number, "The parent id of the upload."),
            parameter.query("post_id",         Types.Number, "The ID of the resulting post."),
            parameter.query("has_post",        Types.Boolean, "If the upload resulted in a post."),
            parameter.query("post_tags_match", Types.String, "The tags of the resulting post."),
            parameter.query("status",          Types.String, "The status of the upload. This is stored and searched as generic text. The ui provides these options: `completed`, `processing`, `pending`, `*duplicate*`, `error*`."),
            parameter.query("backtrace",       Types.String, "The backtrace/stacktrace of the error related to this upload, if it failed."),
            parameter.query("tag_string",      Types.String, "The tags of the upload."),
            commonParameters()
                .page().limit().id()
                .order("id_asc", "id_desc")
        ],
        responses: [
            response(200, "javascript", "Success (Results)", Type.Array(Upload)),
            response(200, "javascript", "Success (No Results) !!", rootKey("uploads"), Links.SearchInconsistency),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace GetUpload {
    export const Route = {
        method:      "GET",
        path:        "/uploads/{id}.json",
        name:        "Get Uploads",
        auth:        [true, "janitor"],
        description: null,
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the upload.")
        ],
        responses: [
            response(200, "javascript", "Success", Upload),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace CreateUpload {
    const SuccessBody = Type.Object({
        success:  Type.Literal(true),
        location: Type.String({ examples: ["/posts/0"] }),
        post_id:  Type.Number()
    });
    const InvalidBody = Type.Object({
        success:  Type.Literal(false),
        reason:   Type.Literal("invalid"),
        messsage: Type.String({ description: "Semicolon (;) separated list of errors." })
    });

    const DuplicateBody = Type.Object({
        success:  Type.Literal(false),
        reason:   Type.Literal("duplicate"),
        location: Type.String({ examples: ["/posts/0"] }),
        post_id:  Type.Number()
    });

    export const Route = {
        method:      "POST",
        path:        "/uploads.json",
        name:        "Create Upload",
        auth:        true,
        description: `Account must be one week old to upload, unless the account is ${AuthMap.admin} or has the **Unrestricted Uploads** permission.`,
        parameters:  [
            parameter.body("upload[direct_url]",    Types.String,  "A link to a file to upload. The url must be in the site's [upload whitelist](https://e621.net/upload_whitelists). Mutually exclusive with `upload[file]`."),
            parameter.body("upload[file]",          Types.String,  "A file to upload. Mutually exclusive with `upload[direct_url]`."),
            parameter.body("upload[tag_string]",    Types.String,  "A Tags of the post. If not provided, `tagme` will be used."),
            parameter.body("upload[rating]",        Types.String,  "The rating of the post. One of: `s`, `q`, `e`.", true),
            parameter.body("upload[source]",        Types.String,  "The sources of the post, separated by a newline."),
            parameter.body("upload[description]",   Types.String,  "The description of the post."),
            parameter.body("upload[parent_id]",     Types.Number,  "The id of a post to be the parent of the post."),
            parameter.body("upload[locked_tags]",   Types.String,  `The tags to lock on the post. ${AuthMap.admin}`),
            parameter.body("upload[locked_rating]", Types.Boolean, `If the rating should be locked. ${AuthMap.privileged}`),
            parameter.body("upload[as_pending]",    Types.Boolean, "If the post should be uploaded as pending. **Unrestricted Uploads** required.")
        ],
        responses: [
            response(200, "javascript", "Success", SuccessBody),
            AccessDeniedResponse("Uploads Disabled", "Uploads are disabled"),
            AccessDeniedResponse("Account Too New", "You can not upload during your first week."),
            response(412, "javascript", "Invalid Upload", InvalidBody),
            response(412, "javascript", "Duplicate Upload", DuplicateBody)
        ]
    } satisfies IRoute;
}
