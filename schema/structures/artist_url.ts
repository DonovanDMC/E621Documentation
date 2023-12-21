import { Type } from "@sinclair/typebox";

export default Type.Object({
    artist_id:      Type.Number(),
    created_at:     Type.String({ format: "date-time" }),
    id:             Type.Number(),
    is_active:      Type.Boolean({ examples: [true] }),
    updated_at:     Type.String({ format: "date-time" }),
    url:            Type.String({ examples: ["https://e621.net"], format: "uri" }),
    normalized_url: Type.String({ examples: ["http://e621.net/"], format: "uri" })
});
