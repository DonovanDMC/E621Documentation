# Artists

{% swagger method="get" path="/artists.json" baseUrl="https://e621.net" summary="Search Artists" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="search[name]" type="String" %}
The name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[group_name]" type="String" %}
The group name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[any_other_name_like]" type="String" %}
Any name being similar.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[any_name_matches]" type="String" %}
Any name matching.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[any_name_or_url_matches]" type="String" %}
Any name or url matching.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[url_matches]" type="String" %}
Any url matching.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" type="Boolean" %}
If the artist is active.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" %}
The ID of the creator of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[has_tag]" type="Boolean" %}
If the artist has a tag.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_linked]" type="Boolean" %}
If the artist is linked to a user.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `updated_at`, `name`, `post_count`
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
      {
        "artist_id": 0,
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "id": 0,
        "is_active": true,
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "url": "https://e621.net",
        "normalized_url": "http://e621.net/"
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

{% swagger method="get" path="/artists/{nameOrID}.json" baseUrl="https://e621.net" summary="Get An Artist" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="path" name="nameOrID" type="String" required="true" %}
The name or ID of the artist to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
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
  "domains": [
    [
      "e621.net",
      1
    ]
  ],
  "urls": [
    {
      "artist_id": 0,
      "created_at": "0000-00-00T00:00:00.000-00:00",
      "id": 0,
      "is_active": true,
      "updated_at": "0000-00-00T00:00:00.000-00:00",
      "url": "https://e621.net",
      "normalized_url": "http://e621.net/"
    }
  ]
}
```
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

{% swagger method="post" path="/artists.json" baseUrl="https://e621.net" summary="Create An Artist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

`other_names` & `urls` are silently truncated to 25 entries.

`notes` is silently truncated to the wiki page limit (250,000).

Individual `other_names` are silently truncated to 100 characters.
{% endswagger-description %}

{% swagger-parameter in="body" name="artist[name]" type="String" required="true" %}
The name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[group_name]" type="String" %}
The group name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[is_active]" type="Boolean" %}
If the artist is active.

<mark style="color:red;">Janitor+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[is_locked]" type="Boolean" %}
If the artist is locked.

<mark style="color:red;">Janitor+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[linked_user_id]" type="Number" %}
The id of the user to link with the artist. A single user can be linked to multiple artists.

<mark style="color:red;">Janitor+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[notes]" type="String" %}
The notes for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[other_names_string]" type="String" %}
The other names of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[url_string]" type="String" %}
The urls of the artist.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
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
  "updated_at": "0000-00-00T00:00:00.000-00:00"
}
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
    "name": [
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

{% swagger method="patch" path="/artists/{id}.json" baseUrl="https://e621.net" summary="Edit An Artist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

<mark style="color:red;">Janitor+ Required</mark> If artist is locked or inactive.

`other_names` & `urls` are silently truncated to 25 entries.

`notes` is silently truncated to the wiki page limit (250,000).

Individual `other_names` are silently truncated to 100 characters.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[group_name]" type="String" %}
The group name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[is_active]" type="Boolean" %}
If the artist is active.

<mark style="color:red;">Janitor+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[is_locked]" type="Boolean" %}
If the artist is locked.

<mark style="color:red;">Janitor+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[linked_user_id]" type="Number" %}
The id of the user to link with the artist. A single user can be linked to multiple artists.

<mark style="color:red;">Janitor+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[name]" type="String" %}
The name of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[notes]" type="String" %}
The notes for the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[other_names_string]" type="String" %}
The other names of the artist.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="artist[url_string]" type="String" %}
The urls of the artist.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied" %}
```javascript
{
  "success": false,
  "reason": "Access Denied"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
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
    "name": [
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

{% swagger method="delete" path="/artists/{id}.json" baseUrl="https://e621.net" summary="Delete An Artist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark>

This operation is idempotent.

Deleting an artist does not actually delete the artist, it sets `is_active` to false.

To "undelete" an artist, use [Edit An Artist](./#edit-an-artist) with `artist[is_active]=true`.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist to delete.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied" %}
```javascript
{
  "success": false,
  "reason": "Access Denied"
}
```
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

{% swagger method="post" path="/artists/{id}/revert.json" baseUrl="https://e621.net" summary="Revert An Artist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

<mark style="color:red;">Janitor+ Required</mark> If artist is locked or inactive.

This operation is idempotent.

`version_id` can be specified in the query, or the body.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the artist to revert.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="version_id" type="Number" %}
The ID of the version to revert to.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied" %}
```javascript
{
  "success": false,
  "reason": "Access Denied"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Invalid Artist/Version ID" %}
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

{% endswagger %}