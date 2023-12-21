import { Type } from "@sinclair/typebox";

export default Type.Object({
    created_at: Type.String({ format: "date-time" }),
    id:         Type.Number(),
    name:       Type.String({ examples: ["name"] }),
    related:    Type.String({ description: "separated by a comma and a space" }),
    title:      Type.String({ description: "Defaults to a titleized version of the name (https://apidock.com/rails/String/titleize)" }),
    updated_at: Type.String({ format: "date-time" }),
    wiki_page:  Type.String({ examples: ["help:wiki_page"] })
});
