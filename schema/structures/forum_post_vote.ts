import { Type } from "@sinclair/typebox";

export default Type.Object({
    created_at:    Type.String({ format: "date-time" }),
    creator_id:    Type.Number(),
    creator_name:  Type.String(),
    forum_post_id: Type.Number(),
    id:            Type.Number(),
    score:         Type.Number({ description: "1, 0, -1" }),
    updated_at:    Type.String({ format: "date-time" })
});
