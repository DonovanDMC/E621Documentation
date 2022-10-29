# Comments

{% swagger method="get" path="/comments.json" baseUrl="https://e621.net" summary="Search Comments" %}
{% swagger-description %}
Search options only work when 

`group_by=comment`

.
{% endswagger-description %}

{% swagger-parameter in="query" name="group_by" type="String" required="false" %}
The grouping of the returned results. On of 

`post`

, 

`comment`

. To get useful results, use 

`comment`

. The default is 

`post`

.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[do_not_bump_post]" type="Boolean" %}
If the post did not bump. The UI for searching inverts this option.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the comment.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" %}
The ID of the creator of the comment.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
The ID of the comment.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_hidden]" type="Boolean" %}
If the comment is hidden.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_sticky]" type="Boolean" %}
If the comment is sticky (post as moderator).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" type="String" %}
The IP Address of the creator of the comment. Requires Moderator.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[post_id]" type="Number" %}
The ID of the post the comment was made on.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: 

`id_desc`

, 

`updated_at_desc`

, 

`score_desc`

, 

`post_id_desc`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
The maximum number of comments to return. Between 20 and 320
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
The page of results to get. Numbered pages are limited to 750. Use a & b prefixes with a comment id for after and before respectively.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results, `group_by=post`)" %}
```javascript
// This is https://e621.net/posts/546281
// most data has been genericized or truncated
{
    "posts": [
        {
            "id": 0,
            "created_at": "0000-00-00T00:00:00.000-00:00",
            "updated_at": "0000-00-00T00:00:00.000-00:00",
            "file": {
                "width": 960,
                "height": 1280,
                "ext": "jpg",
                "size": 190487,
                "md5": "900e98af5b512ba1a5f8a1a9885c1ef1",
                "url": "https://static1.e621.net/data/90/0e/900e98af5b512ba1a5f8a1a9885c1ef1.jpg"
            },
            "preview": {
                "width": 112,
                "height": 150,
                "url": "https://static1.e621.net/data/preview/90/0e/900e98af5b512ba1a5f8a1a9885c1ef1.jpg"
            },
            "sample": {
                "has": true,
                "height": 1133,
                "width": 850,
                "url": "https://static1.e621.net/data/sample/90/0e/900e98af5b512ba1a5f8a1a9885c1ef1.jpg",
                "alternates": {}
            },
            "score": {
                "up": 1424,
                "down": -29,
                "total": 1399
            },
            "tags": {
                "general": [],
                "species": [],
                "character": [],
                "copyright": [ ],
                "artist": [],
                "invalid": [],
                "lore": [],
                "meta": []
            },
            "locked_tags": [],
            "change_seq": 0,
            "flags": {
                "pending": false,
                "flagged": false,
                "note_locked": false,
                "status_locked": false,
                "rating_locked": false,
                "comment_disabled": false,
                "deleted": false
            },
            "rating": "s",
            "fav_count": 0,
            "sources": [],
            "pools": [],
            "relationships": {
                "parent_id": null,
                "has_children": true,
                "has_active_children": false,
                "children": []
            },
            "approver_id": 0,
            "uploader_id": 0,
            "description": "",
            "comment_count": 0,
            "is_favorited": false,
            "has_notes": false,
            "duration": null
        }
    ]
}
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (Results, `group_by=comment`)" %}
```javascript
[
    {
        "id": 0,
        "post_id": 0,
        "creator_id": 0,
        "body": "wooof",
        "score": 0,
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "updater_id": 0,
        "do_not_bump_post": false,
        "is_hidden": false,
        "is_sticky": false,
        "warning_type": null, // same as blips, "warning", "record", "ban"
        "warning_user_id": null,
        "creator_name": "name",
        "updater_name": "name" // haven't seen this as null
    }
]
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Error (No Results, `group_by=post`)" %}
```javascript
{
    "success": false,
    "message": "An unexpected error occurred.",
    "code": ""
}
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results, `group_by=comment`) !!" %}
```javascript
{
    "comments": []
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/comments.json" baseUrl="https://e621.net" summary="Create a Comment" %}
{% swagger-description %}
Authorization Required

Account must be older than 1 week
{% endswagger-description %}
{% endswagger %}

