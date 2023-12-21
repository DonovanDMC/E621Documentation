import { Type } from "@sinclair/typebox";

export default Type.Object({
    body:       Type.String(),
    created_at: Type.String({ format: "date-time" }),
    height:     Type.Number(),
    id:         Type.Number(),
    is_active:  Type.Boolean(),
    note_id:    Type.Number(),
    post_id:    Type.Number(),
    updated_at: Type.String({ format: "date-time" }),
    updater_id: Type.Number(),
    version:    Type.Number(),
    width:      Type.Number(),
    x:          Type.Number(),
    y:          Type.Number()
});
