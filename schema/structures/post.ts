import { Ratings } from "../constants.js";
import { literalUnion } from "../util.js";
import { Type } from "@sinclair/typebox";

export default Type.Object({
    approver_id:   Type.Union([Type.Null(), Type.Number()], { description: "user id" }),
    change_seq:    Type.Number(),
    comment_count: Type.Number(),
    created_at:    Type.String({ format: "date-time" }),
    description:   Type.String(),
    duration:      Type.Union([Type.Null(), Type.Number()]),
    fav_count:     Type.Number(),
    file:          Type.Object({
        ext:    Type.String({ examples: ["png", "jpg", "gif", "webm" ] }),
        height: Type.Number({ examples: [4000] }),
        md5:    Type.String({ pattern: "^[a-f0-9]{32}$", examples: ["dc3a90deef089384f39e45fdaea96e78"] }),
        size:   Type.Number({ examples: [3681606] }),
        url:    Type.Union([Type.Null(), Type.String({ format: "uri" })], { examples: ["https://static1.e621.net/data/dc/3a/dc3a90deef089384f39e45fdaea96e78.png"] }),
        width:  Type.Number({ examples: [4000] })
    }),
    flags: Type.Object({
        pending:       Type.Boolean(),
        flagged:       Type.Boolean(),
        note_locked:   Type.Boolean(),
        status_locked: Type.Boolean(),
        rating_locked: Type.Boolean({ examples: [true] }),
        deleted:       Type.Boolean()
    }),
    has_notes:    Type.Boolean(),
    id:           Type.Number({ examples: [3405794] }),
    is_favorited: Type.Boolean(),
    locked_tags:  Type.Array(Type.String(), { examples: [[]] }),
    pools:        Type.Array(Type.Number(), { description: "numeric pool ids", examples: [[]] }),
    preview:      Type.Object({
        height: Type.Number({ examples: [150] }),
        url:    Type.String({ format: "uri", examples: ["https://static1.e621.net/data/preview/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg"] }),
        width:  Type.Number({ examples: [150] })
    }, { description: "width/height may not be correct" }),
    rating:        Type.Enum(Ratings, { examples: Object.values(Ratings) }),
    relationships: Type.Object({
        children:            Type.Array(Type.Number(), { description: "numeric post ids", examples: [[]] }),
        has_active_children: Type.Boolean(),
        has_children:        Type.Boolean(),
        parent_id:           Type.Union([Type.Null(), Type.Number()], { description: "post id" })
    }),
    sample: Type.Object({
        // the Record type doesn't accept options
        alternates: Object.assign(Type.Record(literalUnion("480", "720p", "original"), Type.Optional(Type.Object({
            type:   Type.Literal("video"),
            height: Type.Number(),
            width:  Type.Number(),
            urls:   Type.Unsafe<[string | null, string | null]>(Type.Array(Type.Union([Type.Null(), Type.String()]), { examples: [[null, null]], minItems: 2, maxItems: 2 }))
        }))), { examples: [{}] }),
        has:    Type.Boolean(),
        height: Type.Number({ examples: [850] }),
        width:  Type.Number({ examples: [850] }),
        url:    Type.String({ format: "uri", examples: ["https://static1.e621.net/data/sample/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg"] })
    }),
    score:       Type.Record(literalUnion("up", "down", "total"), Type.Number()),
    sources:     Type.Array(Type.String(), { examples: ["https://twitter.com/broitsCody/status/1532629699083481088"] }),
    tags:        Type.Record(literalUnion("general", "species", "character", "artist", "invalid", "lore", "meta"), Type.Array(Type.String(), { examples: [[]] })),
    updated_at:  Type.String({ format: "date-time" }),
    uploader_id: Type.Number()
});
