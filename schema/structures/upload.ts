import { Ratings } from "../constants.js";
import { Type } from "@sinclair/typebox";

export default Type.Object({
    description:      Type.String(),
    file_ext:         Type.Union([Type.String(), Type.Null()]),
    file_size:        Type.Union([Type.Number(), Type.Null()]),
    image_height:     Type.Union([Type.Number(), Type.Null()]),
    image_width:      Type.Union([Type.Number(), Type.Null()]),
    md5:              Type.Union([Type.String({ pattern: "^[a-f0-9]{32}$", examples: ["dc3a90deef089384f39e45fdaea96e78"] }), Type.Null()]),
    uploader_name:    Type.String(),
    backtrace:        Type.Union([Type.Null(), Type.String()]),
    created_at:       Type.String({ format: "date-time" }),
    id:               Type.Number(),
    md5_confirmation: Type.Null(), // not used, removed ability to provide in https://github.com/e621ng/e621ng/commit/d95a0e5e10c6fa1c97b4bd4322cace1989b8ff11
    parent_id:        Type.Union([Type.Number(), Type.Null()]),
    post_id:          Type.Union([Type.Number(), Type.Null()]),
    rating:           Type.Enum(Ratings, { examples: Object.values(Ratings) }),
    source:           Type.String(),
    status:           Type.String({ examples: ["completed"] }),
    tag_string:       Type.String(),
    updated_at:       Type.String({ format: "date-time" })
}, { description: "All of post_id, md5, file_ext, file_size, image_width & image_height can be null" });
