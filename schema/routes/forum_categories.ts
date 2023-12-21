import {
    parameter,
    type IRoute,
    Types,
    type IComment,
    AccessDeniedResponse,
    RedirectResponse,
    errorMessageResponse,
    NotFoundResponse,
    response
} from "../util.js";

export const CategoryName = "Forum Categories";
export const ParentCategory = "Forums";
export const CategoryDescription = "These are very poorly documented as the routes are admin only, typically only respond with html (unless an error shows up), and are extremely unpredictable. They have only been included to completely fill out the Forums section.";
export const Comments = [
    {
        content:  "GET /forum_categories does not support JSON",
        location: "before",
        route:    "CreateForumCategory"
    }
] satisfies Array<IComment>;
export const Order = [
    "CreateForumCategory", "EditForumCategory", "DeleteForumCategory"
];
export const File = "forums/categories.md";

export namespace CreateForumCategory {
    export const Route = {
        method:      "POST",
        path:        "/forum_categories.json",
        name:        "Create Forum Category",
        auth:        [true, "admin"],
        description: "Due to this being admin only and typically ui based, there are no standard responses for errors or otherwise.",
        parameters:  [
            parameter.body("forum_category[name]", Types.String, "The name of the category.", true),
            parameter.body("forum_category[description]", Types.String, "The description of the category."),
            parameter.body("forum_category[can_create]", Types.Number, "The level users must be to create topics in the category."),
            parameter.body("forum_category[can_reply]", Types.Number, "The level users must be to reply to topics in the category."),
            parameter.body("forum_category[can_view]", Types.Number, "The level users must be to view topics in the category."),
            parameter.body("forum_category[cat_order]", Types.Number, "The sorting order of the category.")
        ],
        responses: [
            RedirectResponse("Unknown", "https://e621.net/forum_categories", "This will be returned regardless if a category was actually created (unless the controller or database returns an error)"),
            errorMessageResponse("Missing Or Invalid Name", "PG::NotNullViolation: ERROR:  null value in column \"name\" violates not-null constraint\nDETAIL:  Failing row contains (0, null, , null, 0, 0, 0).\n", true, 400),
            errorMessageResponse("Empty Body", "param is missing or the value is empty: forum_category\nDid you mean?  format\n               controller\n               action", false, 400),
            AccessDeniedResponse()
        ]
    } satisfies IRoute;
}

export namespace EditForumCategory {
    export const Route = {
        method:      "PATCH",
        path:        "/forum_categories/{id}.json",
        name:        "Edit Forum Category",
        auth:        [true, "admin"],
        description: "Due to this being admin only and typically ui based, there are no standard responses for errors or otherwise.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the category to edit."),
            parameter.body("forum_category[name]", Types.String, "The name of the category."),
            parameter.body("forum_category[description]", Types.String, "The description of the category."),
            parameter.body("forum_category[can_create]", Types.Number, "The level users must be to create topics in the category."),
            parameter.body("forum_category[can_reply]", Types.Number, "The level users must be to reply to topics in the category."),
            parameter.body("forum_category[can_view]", Types.Number, "The level users must be to view topics in the category."),
            parameter.body("forum_category[cat_order]", Types.Number, "The sorting order of the category.")
        ],
        responses: [
            RedirectResponse("Unknown", "https://e621.net/forum_categories", "This will be returned regardless of anything being changed (unless the controller or database returns an error)"),
            AccessDeniedResponse(),
            NotFoundResponse()
        ]
    } satisfies IRoute;
}

export namespace DeleteForumCategory {
    export const Route = {
        method:      "DELETE",
        path:        "/forum_categories/{id}.json",
        name:        "Delete Forum Category",
        auth:        [true, "admin"],
        description: "As far as I can tell, there is no way to use this from the ui, so forum categories are not meant to be deleted.\n\nThis route does not support json, and as such will return a 406 Unacceptable error. The category will still be deleted.",
        parameters:  [
            parameter.path("id", Types.Number, "The ID of the category to delete.")
        ],
        responses: [
            AccessDeniedResponse(),
            NotFoundResponse(),
            response(406, null, "Success(?)", null, "The category will be deleted if the conditions are right, but an error will be returned regardless.")
        ]
    } satisfies IRoute;
}
