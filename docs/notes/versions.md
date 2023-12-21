# Note Versions

{% swagger method="get" path="/note_versions.json" baseUrl="https://e621.net" summary="Search Note Versions" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="updater_id" type="Number" %}
The ID of the updater.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="updater_name" type="String" %}
The name of thne updater.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="post_id" type="Number" %}
The ID of the post the note is on.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="note_id" type="Number" %}
The ID of the note.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="is_active" type="Boolean" %}
If the note is active (not deleted).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="body_matches" type="String" %}
The body of the note.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" type="String" %}
The ip address of the updater.

See [Search Parameters: search\[ip\_addr\]](../other/search_parameters.md#search-ip\_addr).
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
[
  {
    "body": "",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "height": 0,
    "id": 0,
    "is_active": false,
    "note_id": 0,
    "post_id": 0,
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "updater_id": 0,
    "version": 0,
    "width": 0,
    "x": 0,
    "y": 0
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
// See https://github.com/e621ng/e621ng/issues/359
{
  "note_versions": []
}
```
{% endswagger-response %}

{% endswagger %}