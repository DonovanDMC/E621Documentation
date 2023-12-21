import { literalUnion } from "../util.js";
import { Type } from "@sinclair/typebox";

export default Type.Object({
    category:     literalUnion("series", "collection"),
    created_at:   Type.String({ format: "date-time" }),
    creator_id:   Type.Number(),
    creator_name: Type.String(),
    description:  Type.String(),
    id:           Type.Number(),
    is_active:    Type.Boolean({ examples: [true] }),
    name:         Type.String(),
    post_count:   Type.Number(),
    post_ids:     Type.Array(Type.Number()),
    updated_at:   Type.String({ format: "date-time" })
});
