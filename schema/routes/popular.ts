import {
    parameter,
    type IRoute,
    Types,
    type IComment,
    response
} from "../util.js";
import { Post } from "../structures/index.js";
import { Type } from "@sinclair/typebox";

export const CategoryName = "Popular Posts";
export const ParentCategory = "Posts";
export const CategoryDescription = "";
export const Comments = [] satisfies Array<IComment>;
export const Order = [
    "PopularPosts"
];
export const File = "posts/popular.md";

export namespace PopularPosts {
    const Body = Type.Object({
        posts: Post
    });
    export const Route = {
        method:      "GET",
        path:        "/popular.json",
        name:        "List Popular Posts",
        auth:        false,
        description: null,
        parameters:  [
            parameter.query("date", Types.String, "The date to view popular posts for."),
            parameter.query("scale", Types.String, "The time scale. One of: `day`, `week`, `month`")
        ],
        responses: [
            response(200, "javascript", "Success", Body)
        ]
    } satisfies IRoute;
}
