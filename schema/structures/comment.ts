import { WarningType } from "../constants.js";
import { Type } from "@sinclair/typebox";

export default Type.Object({
    body:             Type.String(),
    created_at:       Type.String({ format: "date-time" }),
    creator_id:       Type.Number(),
    creator_name:     Type.String(),
    do_not_bump_post: Type.Boolean(),
    id:               Type.Number(),
    is_hidden:        Type.Boolean(),
    is_sticky:        Type.Boolean(),
    post_id:          Type.Number(),
    score:            Type.Number(),
    updated_at:       Type.String({ format: "date-time" }),
    updater_id:       Type.Number(),
    updater_name:     Type.String(),
    warning_type:     Type.Union([Type.Null(), Type.Enum(WarningType)], { description: Object.values(WarningType).join(", ") }),
    warning_user_id:  Type.Union([Type.Null(), Type.Number()])
});
