import { Type } from "@sinclair/typebox";

export default Type.Object({
    body:       Type.String(),
    created_at: Type.String({ format: "date-time" }),
    from_id:    Type.Number(),
    id:         Type.Number(),
    is_deleted: Type.Boolean(),
    is_read:    Type.Boolean(),
    owner_id:   Type.Number(),
    title:      Type.String(),
    to_id:      Type.Number(),
    updated_at: Type.String({ format: "date-time" })
});
