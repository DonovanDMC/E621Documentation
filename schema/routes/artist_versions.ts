import {
    type IRoute,
    response,
    type IComment,
    parameter,
    Types,
    Links,
    rootKey
} from "../util.js";
import { ArtistVersion } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";

export const CategoryName = "Artist Versions";
export const ParentCategory = "Artists";
export const CategoryDescription = "";
export const Comments = [
    {
        content:  "A route like /artist\\_versions/{id}.json does not exist. Use the search route with `search[id]` instead.",
        location: "before",
        route:    "SearchArtistVersions"
    }
] satisfies Array<IComment>;
export const Order = [
    "SearchArtistVersions"
];
export const File = "artists/versions.md";

export namespace SearchArtistVersions {
    const Orders = [
        "name"
    ] as const;
    export const Route = {
        method:      "GET",
        path:        "/artist_versions.json",
        name:        "Search Artist Versions",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("search[name]",         Types.String,  "The name of the artist."),
            parameter.query("search[updater_name]", Types.String,  "The name of the updater."),
            parameter.query("search[updater_id]",   Types.Number,  "The ID of the updater."),
            parameter.query("search[artist_id]",    Types.Number,  "The ID of the artist."),
            parameter.query("search[is_active]",    Types.Boolean, "If the artist is active."),
            commonParameters()
                .id().limit().page()
                .order(Orders)
                .ipAddr("The ip address of the updater.")
                .nested(1)
        ],
        responses: [
            response(200, "javascript", "Success (Results)",    ArtistVersion),
            response(200, "javascript", "Success (No Results) !!", rootKey("artist_versions"), Links.SearchInconsistency)
        ]
    } satisfies IRoute;
}
