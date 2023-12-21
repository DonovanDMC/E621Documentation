import {
    type IRoute,
    response,
    type IComment,
    parameter,
    Types,
    EmptyArray,
    NotFoundResponse,
    AuthMap,
    expectedError,
    AccessDeniedResponse,
    NoContentResponse
} from "../util.js";
import { Artist, ArtistURL } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Artists";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "SearchArtists", "GetArtist", "CreateArtist", "EditArtist", "DeleteArtist", "RevertArtist"
];
export const File = "artists/README.md";

export namespace SearchArtists {
    const Body = Type.Array(Type.Composite([Artist, Type.Object({
        urls: Type.Array(ArtistURL)
    })]));

    const Orders = [
        "updated_at", "name", "post_count"
    ] as const;

    export const Route = {
        method:      "GET",
        path:        "/artists.json",
        name:        "Search Artists",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("search[name]",                    Types.String,  "The name of the artist."),
            parameter.query("search[group_name]",              Types.String,  "The group name of the artist."),
            parameter.query("search[any_other_name_like]",     Types.String,  "Any name being similar."),
            parameter.query("search[any_name_matches]",        Types.String,  "Any name matching."),
            parameter.query("search[any_name_or_url_matches]", Types.String,  "Any name or url matching."),
            parameter.query("search[url_matches]",             Types.String,  "Any url matching."),
            parameter.query("search[is_active]",               Types.Boolean, "If the artist is active."),
            parameter.query("search[creator_name]",            Types.String,  "The name of the creator of the artist."),
            parameter.query("search[creator_id]",              Types.Number,  "The ID of the creator of the artist."),
            parameter.query("search[has_tag]",                 Types.Boolean, "If the artist has a tag."),
            parameter.query("search[is_linked]",               Types.Boolean, "If the artist is linked to a user."),
            commonParameters()
                .id().limit().page()
                .order(Orders)
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)",    Body),
            response(200, "javascript", "Success (No Results)", EmptyArray)
        ]
    } satisfies IRoute;
}

export namespace GetArtist {
    const Body = Type.Composite([Artist, Type.Object({
        domains: Type.Array(Type.Array(Type.Union([Type.String(), Type.Number()]), { examples: [["e621.net", 1]] })),
        urls:    Type.Array(ArtistURL)
    })]);
    export const Route = {
        method:      "GET",
        path:        "/artists/{nameOrID}.json",
        name:        "Get An Artist",
        auth:        false,
        description: null,
        parameters:  [
            parameter.path("nameOrID", Types.String, "The name or ID of the artist to get.")
        ],
        responses: [
            response(200, "javascript", "Success",    Body),
            NotFoundResponse("Not Found")
        ]
    } satisfies IRoute;
}

export namespace CreateArtist {
    export const Route = {
        method:      "POST",
        path:        "/artists.json",
        name:        "Create An Artist",
        auth:        [true, "privileged", "If account is less than one week old."],
        description: "`other_names` & `urls` are silently truncated to 25 entries.\n\n`notes` is silently truncated to the wiki page limit (250,000).\n\nIndividual `other_names` are silently truncated to 100 characters.",
        parameters:  [
            parameter.body("artist[name]",               Types.String,  "The name of the artist.", true),
            parameter.body("artist[group_name]",         Types.String,  "The group name of the artist."),
            parameter.body("artist[is_active]",          Types.Boolean, `If the artist is active.\n\n${AuthMap.janitor}`),
            parameter.body("artist[is_locked]",          Types.Boolean, `If the artist is locked.\n\n${AuthMap.janitor}`),
            parameter.body("artist[linked_user_id]",     Types.Number,  `The id of the user to link with the artist. A single user can be linked to multiple artists.\n\n${AuthMap.janitor}`),
            parameter.body("artist[notes]",              Types.String,  "The notes for the artist."),
            parameter.body("artist[other_names_string]", Types.String,  "The other names of the artist."),
            parameter.body("artist[url_string]",         Types.String,  "The urls of the artist.")
        ],
        responses: [
            response(201, "javascript", "Success", Artist),
            AccessDeniedResponse(),
            expectedError("Duplicate Name", ["name", ["has already been taken"]]),
            expectedError("Account Too New", ["base", ["User can not yet perform this action. Account is too new."]]),
            expectedError("Empty Name", ["name", ["'' cannot be blank"]]),
            expectedError("Name Too Long", ["name", ["is too long (maximum is 100 characters)"]]),
            expectedError("Group Name Too Long", ["group_name", ["is too long (maximum is 100 characters)"]]),
            expectedError("URL Too Long", ["urls.url", ["is too long (maximum is 4096 characters)"]])
        ]
    } satisfies IRoute;
}

export namespace EditArtist {
    export const Route = {
        method:      "PATCH",
        path:        "/artists/{id}.json",
        name:        "Edit An Artist",
        auth:        [true, [["privileged", "If account is less than one week old."], ["janitor", "If artist is locked or inactive."]]],
        description: "`other_names` & `urls` are silently truncated to 25 entries.\n\n`notes` is silently truncated to the wiki page limit (250,000).\n\nIndividual `other_names` are silently truncated to 100 characters.",
        parameters:  [
            parameter.path("id",                         Types.Number,  "The ID of the artist to edit."),
            parameter.body("artist[group_name]",         Types.String,  "The group name of the artist."),
            parameter.body("artist[is_active]",          Types.Boolean, `If the artist is active.\n\n${AuthMap.janitor}`),
            parameter.body("artist[is_locked]",          Types.Boolean, `If the artist is locked.\n\n${AuthMap.janitor}`),
            parameter.body("artist[linked_user_id]",     Types.Number,  `The id of the user to link with the artist. A single user can be linked to multiple artists.\n\n${AuthMap.janitor}`),
            parameter.body("artist[name]",               Types.String,  "The name of the artist."),
            parameter.body("artist[notes]",              Types.String,  "The notes for the artist."),
            parameter.body("artist[other_names_string]", Types.String,  "The other names of the artist."),
            parameter.body("artist[url_string]",         Types.String,  "The urls of the artist.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse(),
            expectedError("Inactive Artist", ["base", ["Artist is inactive"]]),
            expectedError("Locked Artist", ["base", ["Artist is locked"]]),
            expectedError("Duplicate Name", ["name", ["has already been taken"]]),
            expectedError("Account Too New", ["base", ["User can not yet perform this action. Account is too new."]]),
            expectedError("Empty Name", ["name", ["'' cannot be blank"]]),
            expectedError("Name Too Long", ["name", ["is too long (maximum is 100 characters)"]]),
            expectedError("Group Name Too Long", ["group_name", ["is too long (maximum is 100 characters)"]]),
            expectedError("URL Too Long", ["urls.url", ["is too long (maximum is 4096 characters)"]])
        ]
    } satisfies IRoute;
}

export namespace DeleteArtist {
    export const Route = {
        method:      "DELETE",
        path:        "/artists/{id}.json",
        name:        "Delete An Artist",
        auth:        [true, "janitor"],
        description: "This operation is idempotent.\n\nDeleting an artist does not actually delete the artist, it sets `is_active` to false.\n\nTo \"undelete\" an artist, use {{link:EditArtist}} with `artist[is_active]=true`.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the artist to delete.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace RevertArtist {
    export const Route = {
        method:      "POST",
        path:        "/artists/{id}/revert.json",
        name:        "Revert An Artist",
        auth:        [true, [["privileged", "If account is less than one week old."], ["janitor", "If artist is locked or inactive."]]],
        description: "This operation is idempotent.\n\n`version_id` can be specified in the query, or the body.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the artist to revert."),
            parameter.query("version_id", Types.Number, "The ID of the version to revert to.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse(),
            NotFoundResponse("Invalid Artist/Version ID"),
            expectedError("Account Too New", ["base", ["User can not yet perform this action. Account is too new."]]),
            expectedError("Inactive Artist", ["base", ["Artist is inactive"]]),
            expectedError("Locked Artist", ["base", ["Artist is locked"]])
        ]
    } satisfies IRoute;
}
