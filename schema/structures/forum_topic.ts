import { Type } from "@sinclair/typebox";

export default Type.Object({
    category_id:    Type.Number(),
    created_at:     Type.String({ format: "date-time" }),
    creator_id:     Type.Number(),
    id:             Type.Number(),
    is_hidden:      Type.Boolean(),
    is_locked:      Type.Boolean(),
    is_sticky:      Type.Boolean(),
    response_count: Type.Number(),
    title:          Type.String(),
    updated_at:     Type.String({ format: "date-time" }),
    updater_id:     Type.Number()
});
