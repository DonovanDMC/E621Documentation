# Artist Versions

A route like /artist\_versions/{id}.json does not exist. Use the search route with `search[id]` instead.

{% swagger method="get" path="/artist_versions.json" baseUrl="https://e621.net" summary="Search Artist Versions" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="search[name]" type="String" %}
The name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[updater_name]" type="String" %}
The name of the updater.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[updater_id]" type="Number" %}
The ID of the updater.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[artist_id]" type="Number" %}
The ID of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" type="Boolean" %}
If the artist is active.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" type="String" %}
The ip address of the updater.

See [Search Parameters: search\[ip\_addr\]](../other/search_parameters.md#search-ip\_addr).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `name`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See [Search Parameters: search\[id\]](../other/search_parameters.md#search-id)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See [Search Parameters: limit](../other/search_parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](../other/search_parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
{
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0, // user id
  "group_name": "",
  "id": 0,
  "is_active": true,
  "is_locked": false,
  "linked_user_id": null, // user id
  "name": "",
  "notes": null,
  "other_names": [
    "othername"
  ],
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "urls": [
    "https://e621.net",
    "-https://e926.net"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
// See https://github.com/e621ng/e621ng/issues/359
{
  "artist_versions": []
}
```
{% endswagger-response %}

{% endswagger %}