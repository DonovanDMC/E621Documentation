# Artists

{% swagger method="get" path="/artists.json" baseUrl="https://e621.net" summary="Search For Artists" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See 

[Search Parameters: search\[id\]](../readme-1/search-parameters.md#search-id)


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
See 

[Search Parameters: limit](../readme-1/search-parameters.md#limit)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See 

[Search Parameters: page](../readme-1/search-parameters.md#page)


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
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:blue;">Privileged+</mark>, account must be older than 1 week

`other_names` & `urls` are silently truncated to 25 entries

`notes` is silently truncated to the wiki page limit (250,000)

individual `other_names` entries are silently truncated to 100 characters&#x20;
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

{% swagger-response status="201: Created" description="Successfully Created" %}
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

{% swagger-response status="422: Unprocessable Entity" description="Empty Name" %}
```javascript
{
    "errors": {
        "name": [
            "'' cannot be blank"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Name Too Long" %}
```javascript
{
    "errors": {
        "group_name": [
            "is too long (maximum is 100 characters)"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Group Name Too Long" %}
```javascript
{
    "errors": {
        "group_name": [
            "is too long (maximum is 100 characters)"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="URL Too Long" %}
```javascript
{
    "errors": {
        "urls.url": [
            "is too long (maximum is 4096 characters)"
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/artists/:id.json" baseUrl="https://e621.net" summary="Modify An Artist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark> if artist is locked or inactive

Unless <mark style="color:blue;">Privileged+</mark>, account must be older than 1 week

`other_names` & `urls` are silently truncated to 25 entries

`notes` is silently truncated to the wiki page limit (250,000)

individual `other_names` entries are silently truncated to 100 characters&#x20;
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[is_active]" type="Boolean" %}
If the artist is active. Requires janitor or higher.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="String" name="artist[group_name]" %}
The group name for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" type="Number" name="artist[linked_user_id]" %}
The id of the user to link with the artist. A user can be linked to multiple artists.&#x20;

<mark style="color:red;">Janitor+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" type="Boolean" name="artist[is_locked]" %}
If the artist should be locked.

<mark style="color:red;">Janitor+ Required</mark>
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

{% swagger-response status="422: Unprocessable Entity" description="Name Too Long" %}
```javascript
{
    "errors": {
        "group_name": [
            "is too long (maximum is 100 characters)"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Group Name Too Long" %}
```javascript
{
    "errors": {
        "group_name": [
            "is too long (maximum is 100 characters)"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="URL Too Long" %}
```javascript
{
    "errors": {
        "urls.url": [
            "is too long (maximum is 4096 characters)"
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/artists/:id.json" baseUrl="https://e621.net" summary="Delete An Artist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark>

This operation is idempotent

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
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:blue;">Privileged+</mark>, account must be older than 1 week

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
