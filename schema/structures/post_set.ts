import { Type } from "@sinclair/typebox";

export default Type.Object({
    created_at:         Type.String({ format: "date-time" }),
    creator_id:         Type.Number(),
    description:        Type.String(),
    id:                 Type.Number(),
    is_public:          Type.Boolean(),
    name:               Type.String(),
    post_count:         Type.Number(),
    post_ids:           Type.Array(Type.Number()),
    shortname:          Type.String(),
    transfer_on_delete: Type.Boolean(),
    updated_at:         Type.String({ format: "date-time" })
});
