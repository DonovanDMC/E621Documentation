# Artist Versions

{% swagger method="get" path="/artist_versions.json" baseUrl="https://e621.net" summary="Search Artist Versions" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
The ID of the specific artist version to get.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[name]" type="String" %}
Search by the name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[artist_id]" type="Number" %}
Search by the id of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[updater]" type="String" %}
Search by the name of the updater.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[updater_id]" type="Number" %}
Search by the id of the updater.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
The maximum number of artists to return. Between 20 and 320
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
The page of results to get. Numbered pages are limited to 750. Use a & b prefixes with an artist id for after and before respectively.
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

A route like /artist\_versions/:id.json does not exist. Use the search route with `search[id]` instead.
