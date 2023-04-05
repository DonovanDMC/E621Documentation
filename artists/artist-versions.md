# Artist Versions

A route like /artist\_versions/:id.json does not exist. Use the search route with `search[id]` instead.

{% swagger method="get" path="/artist_versions.json" baseUrl="https://e621.net" summary="Search Artist Versions" %}
{% swagger-description %}
<mark style="color:blue;">

Authorization Required

</mark>
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

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: 

`name`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" type="String" %}
The ip address of the updater.&#x20;

See [Search Parameters: search\[ip\_addr\]](../common/search-parameters.md#search-ip\_addr)
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
        "name": "name",
        "creator_id": 0,
        "is_active": true,
        "group_name": "",
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "other_names": ["othername"],
        "linked_user_id": 0, // or null
        "is_locked": false,
        "notes": "note", // or null
        // note domains is not returned
        "urls": [
            // note urls is drastically different
            "https://e621.net",
            "-https://e926.net"
        ]
    }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
{
    "artist_versions": []
}
```
{% endswagger-response %}
{% endswagger %}
