import { Type } from "@sinclair/typebox";

export default Type.Object({
    body:         Type.String(),
    created_at:   Type.String({ format: "date-time" }),
    creator_id:   Type.Number({ description: "user id" }),
    creator_name: Type.String(),
    height:       Type.Number(),
    id:           Type.Number(),
    is_active:    Type.Boolean({ examples: [true] }),
    post_id:      Type.Number(),
    updated_at:   Type.String({ format: "date-time" }),
    version:      Type.Number(),
    width:        Type.Number(),
    x:            Type.Number(),
    y:            Type.Number()
});
