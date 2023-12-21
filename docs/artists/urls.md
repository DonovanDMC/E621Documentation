# Artist URLs

A route like /atist\_urls/{id}.json does not exist. Use the search route with `search[id]` instead.

{% swagger method="get" path="/artist_urls.json" baseUrl="https://e621.net" summary="Search Artist URLs" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="search[artist_id]" type="Number" %}
The ID of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[artist_name]" type="String" %}
The name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" type="Boolean" %}
If the artist url is active.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[url]" type="String" %}
The url.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[normalized_url]" type="String" %}
The normalized url. (http:, trailing `/`)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[artist]" type="String" %}
Legacy name for `search[artist_name]`.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[url_matches]" type="String" %}
Legacy name for `search[url]`.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[normalized_url_matches]" type="String" %}
Legacy name for `search[normalized_url]`.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `id`, `id_asc`, `id_desc`, `artist_id`, `artist_id_asc`, `artist_id_desc`, `url`, `url_asc`, `url_desc`, `normalized_url`, `normalized_url_asc`, `normalized_url_desc`, `is_active`, `is_active_asc`, `is_active_desc`, `created_at`, `created_at_asc`, `created_at_desc`, `updated_at`, `updated_at_asc`, `updated_at_desc`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See [Search Parameters: search\[id\]](../common/search-parameters.md#search-id)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See [Search Parameters: limit](../common/search-parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](../common/search-parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  {
    "artist_id": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "id": 0,
    "is_active": true,
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "url": "https://e621.net",
    "normalized_url": "http://e621.net/",
    "artist": {
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
      "updated_at": "0000-00-00T00:00:00.000-00:00"
    }
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results)" %}
```javascript
[]
```
{% endswagger-response %}

{% endswagger %}