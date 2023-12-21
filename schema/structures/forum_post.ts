import { WarningType } from "../constants.js";
import { Type } from "@sinclair/typebox";

export default Type.Object({
    body:            Type.String(),
    created_at:      Type.String({ format: "date-time" }),
    creator_id:      Type.Number(),
    id:              Type.Number(),
    is_hidden:       Type.Boolean(),
    topic_id:        Type.Number(),
    updated_at:      Type.String({ format: "date-time" }),
    updater_id:      Type.Number(),
    warning_type:    Type.Union([Type.Null(), Type.Enum(WarningType)], { description: Object.values(WarningType).join(", ") }),
    warning_user_id: Type.Union([Type.Null(), Type.Number()])
});
