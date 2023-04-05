# Artist URLs

A route like /atist\_urls/:id.json does not exist. Use the search route with `search[id]` instead.

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
The normalized url. (http:, trailing 

`/`

)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[artist]" type="String" %}
Legacy name for 

`search[artist_name]`

.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[url_matches]" %}
Legacy name for 

`search[url]`

.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[normalized_url_matches]" %}
Legacy name for 

`search[normalized_url]`

.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `id`, `artist_id`, `url`, `normalized_url`, `is_active`, `created_at` `updated_at`&#x20;

(optional for all: `_asc`/`_desc`)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See 

[Search Parameters: search\[id\]](../common/search-parameters.md#search-id)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See 

[Search Parameters: limit](../common/search-parameters.md#limit)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See 

[Search Parameters: page](../common/search-parameters.md#page)


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  {
    "id": 0,
    "artist_id": 0,
    "url": "https://e621.net",
    "normalized_url": "http://e621.net",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "is_active": true,
    "artist": {
      // Complete artist, see Artists "Get An Artist" for structure
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

{% swagger method="patch" path="/artist_urls/:id.json" baseUrl="https://e621.net" summary="Edit An Artist URL" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist url to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist_url[is_active]" type="Boolean" %}
If the artist url is active or not.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```


{% endswagger-response %}
{% endswagger %}
