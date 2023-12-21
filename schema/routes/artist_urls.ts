import {
    type IRoute,
    response,
    type IComment,
    parameter,
    Types,
    EmptyArray
} from "../util.js";
import { Artist, ArtistURL } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Artist URLs";
export const ParentCategory = "Artists";
export const CategoryDescription = "";
export const Comments = [
    {
        content:  "A route like /atist\\_urls/{id}.json does not exist. Use the search route with `search[id]` instead.",
        location: "before",
        route:    "SearchArtistURLs"
    }
] satisfies Array<IComment>;
export const Order = [
    "SearchArtistURLs"
];
export const File = "artists/urls.md";

export namespace SearchArtistURLs {
    const Body = Type.Array(Type.Composite([ArtistURL, Type.Object({
        artist: Artist
    })]));

    const _orders = [
        "id", "artist_id", "url", "normalized_url", "is_active", "created_at", "updated_at"
    ] as const;
    const Orders = _orders.flatMap(x => [x, `${x}_asc`, `${x}_desc`]) as Array<`${typeof _orders[number]}${"_asc" | "_desc" | ""}`>;

    export const Route = {
        method:      "GET",
        path:        "/artist_urls.json",
        name:        "Search Artist URLs",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("search[artist_id]",              Types.Number,   "The ID of the artist."),
            parameter.query("search[artist_name]",            Types.String,   "The name of the artist."),
            parameter.query("search[is_active]",              Types.Boolean,  "If the artist url is active."),
            parameter.query("search[url]",                    Types.String,   "The url."),
            parameter.query("search[normalized_url]",         Types.String,   "The normalized url. (http:, trailing `/`)"),
            parameter.query("search[artist]",                 Types.String,   "Legacy name for `search[artist_name]`."),
            parameter.query("search[url_matches]",            Types.String,   "Legacy name for `search[url]`."),
            parameter.query("search[normalized_url_matches]", Types.String,   "Legacy name for `search[normalized_url]`."),
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
