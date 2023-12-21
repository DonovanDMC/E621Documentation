import { Type } from "@sinclair/typebox";

export default Type.Object({
    created_at:     Type.String({ format: "date-time" }),
    creator_id:     Type.Number({ description: "user id" }),
    group_name:     Type.String(),
    id:             Type.Number(),
    is_active:      Type.Boolean({ examples: [true] }),
    is_locked:      Type.Boolean(),
    linked_user_id: Type.Union([Type.Null(), Type.Number()], { description: "user id" }),
    name:           Type.String(),
    notes:          Type.Union([Type.Null(), Type.String()]),
    other_names:    Type.Array(Type.String(), { examples: [["othername"]] }),
    updated_at:     Type.String({ format: "date-time" })
});
