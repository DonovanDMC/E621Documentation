# Favorites

{% swagger method="get" path="/favorites.json" baseUrl="https://e621.net" summary="Get Favorites" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark> If `user_id` is not specified

<mark style="color:red;">Moderator+ Required</mark> If `user_id` is blocked, or has privacy mode on

The authenticated user bypasses privacy mode checks, but not block checks (concerning the authenticated user's favorites).
{% endswagger-description %}

{% swagger-parameter in="query" name="user_id" type="Number" %}
The ID of the user whose favorites to get.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See [Search Parameters: limit](common/search-parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](common/search-parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "posts": [
    {
      "approver_id": null, // user id
      "change_seq": 0,
      "comment_count": 0,
      "created_at": "0000-00-00T00:00:00.000-00:00",
      "description": "",
      "duration": null,
      "fav_count": 0,
      "file": {
        "ext": "png",
        "height": 4000,
        "md5": "dc3a90deef089384f39e45fdaea96e78",
        "size": 3681606,
        "url": "https://static1.e621.net/data/dc/3a/dc3a90deef089384f39e45fdaea96e78.png",
        "width": 4000
      },
      "flags": {
        "pending": false,
        "flagged": false,
        "note_locked": false,
        "status_locked": false,
        "rating_locked": true,
        "deleted": false
      },
      "has_notes": false,
      "id": 3405794,
      "is_favorited": false,
      "locked_tags": [],
      "pools": [], // numeric pool ids
      "preview": { // width/height may not be correct
        "height": 150,
        "url": "https://static1.e621.net/data/preview/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg",
        "width": 150
      },
      "rating": "s",
      "relationships": {
        "children": [], // numeric post ids
        "has_active_children": false,
        "has_children": false,
        "parent_id": null // post id
      },
      "sample": {
        "alternates": {},
        "has": false,
        "height": 850,
        "width": 850,
        "url": "https://static1.e621.net/data/sample/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg"
      },
      "score": {
        "up": 0,
        "down": 0,
        "total": 0
      },
      "sources": "https://twitter.com/broitsCody/status/1532629699083481088",
      "tags": {
        "general": [],
        "species": [],
        "character": [],
        "artist": [],
        "invalid": [],
        "lore": [],
        "meta": []
      },
      "updated_at": "0000-00-00T00:00:00.000-00:00",
      "uploader_id": 0
    }
  ]
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Favorites Hidden" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: This users favorites are hidden"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Invalid User/No Auth" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/favorites.json" baseUrl="https://e621.net" summary="Add Favorite" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

{% endswagger-description %}

{% swagger-parameter in="body" name="post_id" type="Number" required="true" %}
The ID of the post to favorite.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "post": {
    "approver_id": null, // user id
    "change_seq": 0,
    "comment_count": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "description": "",
    "duration": null,
    "fav_count": 0,
    "file": {
      "ext": "png",
      "height": 4000,
      "md5": "dc3a90deef089384f39e45fdaea96e78",
      "size": 3681606,
      "url": "https://static1.e621.net/data/dc/3a/dc3a90deef089384f39e45fdaea96e78.png",
      "width": 4000
    },
    "flags": {
      "pending": false,
      "flagged": false,
      "note_locked": false,
      "status_locked": false,
      "rating_locked": true,
      "deleted": false
    },
    "has_notes": false,
    "id": 3405794,
    "is_favorited": false,
    "locked_tags": [],
    "pools": [], // numeric pool ids
    "preview": { // width/height may not be correct
      "height": 150,
      "url": "https://static1.e621.net/data/preview/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg",
      "width": 150
    },
    "rating": "s",
    "relationships": {
      "children": [], // numeric post ids
      "has_active_children": false,
      "has_children": false,
      "parent_id": null // post id
    },
    "sample": {
      "alternates": {},
      "has": false,
      "height": 850,
      "width": 850,
      "url": "https://static1.e621.net/data/sample/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg"
    },
    "score": {
      "up": 0,
      "down": 0,
      "total": 0
    },
    "sources": "https://twitter.com/broitsCody/status/1532629699083481088",
    "tags": {
      "general": [],
      "species": [],
      "character": [],
      "artist": [],
      "invalid": [],
      "lore": [],
      "meta": []
    },
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "uploader_id": 0
  }
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

{% swagger-response status="404: Not Found" description="Invalid Post" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Post Already Favorited" %}
```javascript
{
  "success": false,
  "message": "You have already favorited this post",
  "code": null
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/favorites/{id}.json" baseUrl="https://e621.net" summary="Remove Favorite" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

This operation is idempotent.

A success will be returned even if the post has not been favorited, or if the post does not exist.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the post to unfavorite.
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

{% endswagger %}