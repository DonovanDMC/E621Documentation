import {
    parameter,
    type IRoute,
    response,
    Types,
    type IComment,
    NotFoundResponse,
    AccessDeniedResponse,
    NoContentResponse,
    errorMessageResponse
} from "../util.js";
import { Post } from "../structures/index.js";
import { commonParameters } from "../CommonParameters.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Favorites";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "GetFavorites", "AddFavorite", "RemoveFavorite"
];

export namespace GetFavorites {
    const Body = Type.Object({
        posts: Type.Array(Post)
    });

    export const Route = {
        method:      "GET",
        path:        "/favorites.json",
        name:        "Get Favorites",
        auth:        [true, [["member", "If `user_id` is not specified"], ["moderator", "If `user_id` is blocked, or has privacy mode on"]]],
        description: "The authenticated user bypasses privacy mode checks, but not block checks (concerning the authenticated user's favorites).",
        parameters:  [
            parameter.query("user_id", Types.Number, "The ID of the user whose favorites to get.", false),
            commonParameters()
                .limit().page()
        ],
        responses: [
            response(200, "javascript", "Success",    Body),
            errorMessageResponse("Favorites Hidden", "Access Denied: This users favorites are hidden", "none", 403),
            NotFoundResponse("Invalid User/No Auth")
        ]
    } satisfies IRoute;
}

export namespace AddFavorite {
    const Body = Type.Object({
        post: Post
    });

    export const Route = {
        method:      "POST",
        path:        "/favorites.json",
        name:        "Add Favorite",
        auth:        true,
        description: null,
        parameters:  [
            parameter.body("post_id", Types.Number, "The ID of the post to favorite.", true)
        ],
        responses: [
            response(200, "javascript", "Success", Body),
            AccessDeniedResponse(),
            NotFoundResponse("Invalid Post"),
            errorMessageResponse("Post Already Favorited", "You have already favorited this post")
        ]
    } satisfies IRoute;
}

export namespace RemoveFavorite {
    export const Route = {
        method:      "DELETE",
        path:        "/favorites/{id}.json",
        name:        "Remove Favorite",
        auth:        true,
        description: "This operation is idempotent.\n\nA success will be returned even if the post has not been favorited, or if the post does not exist.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the post to unfavorite.")
        ],
        responses: [
            NoContentResponse(),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}
