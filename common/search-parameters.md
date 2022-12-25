# Search Parameters

<details>

<summary>limit</summary>

All search routes allow a `limit` parameter, which will limit the amount of results that are returned. This can be anywhere between `0` and `320`. Values below `0` do nothing special. Values above `320` silently act like `320`. If not specified, your default in your user settings will be used (if using an api key). Otherwise, `75` will be used.

</details>

<details>

<summary>page</summary>

All search routes allow a `page` parameter, which will paginate through the entries to the specified page. Pages can be specified as numbers up to 750\*, or via a/b syntax with no restrictions.

`a` - after, the id of an entry to get results after. e.g. `a1234`

`b` - before, the id of an entry to get results before. e.g. `b1234`

\* - `/post_versions` is a special snowflake, only entries within the most recent 10,000 can be paginated via numbers (501 when limit=20, 133 when limit=75, 31 when limit=320).

See [Numbered Pagination Too High](errors.md#numbered-pagination-too-high) for related errors.

</details>

<details>

<summary>search[id]</summary>

Most search endpoints accept a `search[id]` parameter to pinpoint specific entries. While not entirely useful in most situations, this is especially useful for Artist Versions, which does not have a `/artist_versions/:id` endpoint.&#x20;

A comma separated list, or a range (`X..Y`) can be used to fetch multiple entries by id.

</details>

<details>

<summary>search[created_at] &#x26; search[updated_at]</summary>

Most search endpoints accept both `search[created_at]` & `search[updated_at]`. These both accept an ISO 8601 timestamp for which results will be limited to within a 24 hour period, starting at `05:00:00` UTC the previous day and ending at `4:59:59.999999` UTC that day. The hms of the timestamp have no effect on the window.

</details>

<details>

<summary>search[*_name] &#x26; search[*_id]</summary>

Most endpoints that accept a `*_name` (e.g. `creator_name`), or `*_id` (e.g. `updater_id`) parameter typically accept the other as another parameter.

</details>

