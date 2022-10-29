# Artists

{% swagger method="get" path="/artists.json" baseUrl="https://e621.net" summary="Search For Artists" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
The ID of a specific artist to search for.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" type="Boolean" %}
If the artist is active.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[has_tag]" type="Boolean" %}
If the artist has a tag.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[any_name_matches]" type="String" %}
Search by name matches.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of returned search results. One of: 

`created_at`

, 

`updated_at`

, 

`name,`

 

`post_count`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[url_matches]" type="String" %}
Search by url matches.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_linked]" type="Boolean" %}
If the artist is linked to a user.
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
            {
                "id": 0,
                "artist_id": 0,
                "url": "https://e621.net",
                "normalized_url": "http://e621.net/",
                "created_at": "0000-00-00T00:00:00.000-00:00",
                "updated_at": "0000-00-00T00:00:00.000-00:00",
                "is_active": true
            }
        ]
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

{% swagger method="get" path="/artists/:id.json" baseUrl="https://e621.net" summary="Get An Artist" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" required="true" type="String" %}
The ID of the artist to get.



You can put a name here, but I'd recommend using the search instead.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successful" %}
```javascript
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
    "domains": [],
    "urls": [
        {
            "id": 0,
            "artist_id": 0,
            "url": "https://e926.net",
            "normalized_url": "http://e926.net/",
            "created_at": "0000-00-00T00:00:00.000-00:00",
            "updated_at": "0000-00-00T00:00:00.000-00:00",
            "is_active": false
        },
        {
            "id": 0,
            "artist_id": 0,
            "url": "https://e621.net",
            "normalized_url": "http://e621.net/",
            "created_at": "0000-00-00T00:00:00.000-00:00",
            "updated_at": "0000-00-00T00:00:00.000-00:00",
            "is_active": true
        }
    ]
}
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Not Found (Name)" %}
```javascript
// HTML page (yes, even with the .json ending)
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found (ID)" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/artists.json" baseUrl="https://e621.net" summary="Create An Artist" %}
{% swagger-description %}
Requires Authorization

Account must be older than 1 week to use this
{% endswagger-description %}

{% swagger-parameter in="body" name="artist[is_active]" type="Boolean" %}
If the artist is active. Requires janitor or higher.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[group_name]" required="false" type="String" %}
The group name for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[linked_user_id]" type="Number" %}
The id of the user to link with the artist. A user can be linked to multiple artists.  Requires Janitor or higher.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[is_locked]" type="Boolean" %}
If the artist should be locked. Requires janitor or higher.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[name]" required="true" type="String" %}
The name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[notes]" type="String" %}
The notes for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[other_names_string]" type="String" %}
The other names for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[url_string]" type="String" %}
The urls associated with the artist.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully Created" %}
```javascript
{
    "id": 0,
    "name": "name",
    "creator_id": 0,
    "is_active": true,
    "group_name": "",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "other_names": [],
    // note neither domains or urls is returned (even if provided)
    "linked_user_id": null,
    "is_locked": false,
    "notes": null
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Duplicate Name" %}
```javascript
{
    "errors": {
        "name": [
            "has already been taken"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
    "errors": {
        "base": [
            "User can not yet perform this action. Account is too new."
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/artists/:id.json" baseUrl="https://e621.net" summary="Modify An Artist" %}
{% swagger-description %}
Requires Authorization

Unless Janitor or higher, Locked/Inactive artists cannot be edited.

Account must be older than 1 week to use this.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[is_active]" type="Boolean" %}
If the artist is active. Requires janitor or higher.
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="Basic" %}
The authorization for the request, in the basic format.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="String" name="artist[group_name]" %}
The group name for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="Number" name="artist[linked_user_id]" %}
The id of the user to link with the artist. A user can be linked to multiple artists. Requires Janitor or higher.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="Boolean" name="artist[is_locked]" %}
If the artist should be locked. Requires janitor or higher.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="String" name="artist[name]" %}
The name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="String" name="artist[notes]" %}
The notes for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="String" name="artist[other_names_string]" %}
The other names for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="String" name="artist[url_string]" %}
The urls associated with the artist.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```javascript
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Artist Not Found" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Inactive Artist" %}
```javascript
{
    "errors": {
        "base": [
            "Artist is inactive"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Locked Artist" %}
```javascript
{
    "errors": {
        "base": [
            "Artist is locked"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
    "errors": {
        "base": [
            "User can not yet perform this action. Account is too new."
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/artists/:id.json" baseUrl="https://e621.net" summary="Delete An Artist" %}
{% swagger-description %}
Requires Authorization

Requires Janitor or higher

This operation is idempotent

Account must be older than 1 week to use this

Deleting an artist does not actually delete the artist, it sets `is_active` to false
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist to delete.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
// HTML Page
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied" %}
```javascript
{
    "success": false,
    "reason": "Access Denied"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Artist Not Found" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
    "errors": {
        "base": [
            "User can not yet perform this action. Account is too new."
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/artists/:id/revert.json" baseUrl="https://e621.net" summary="Revert An Artist To A Previous Version" %}
{% swagger-description %}
Requires Authorization

Account must be older than 1 week to use this

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist to revert.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="version_id" type="Number" required="true" %}
The ID of the version to revert to.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```javascript
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Invalid Artist or Invalid Version" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
    "errors": {
        "base": [
            "User can not yet perform this action. Account is too new."
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}
