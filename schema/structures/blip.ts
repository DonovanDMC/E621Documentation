import { WarningType } from "../constants.js";
import { Type } from "@sinclair/typebox";

export default Type.Object({
    body:            Type.String(),
    created_at:      Type.String({ format: "date-time" }),
    creator_id:      Type.Number(),
    creator_name:    Type.String(),
    id:              Type.Number(),
    is_hidden:       Type.Boolean(),
    response_to:     Type.Union([Type.Null(), Type.Number()],{ description: "blip id" }),
    updated_at:      Type.String({ format: "date-time" }),
    warning_type:    Type.Union([Type.Null(), Type.Enum(WarningType)], { description: Object.values(WarningType).join(", ") }),
    warning_user_id: Type.Union([Type.Null(), Type.Number()], { description: "user id" })
});
