# Forum Posts

{% swagger method="get" path="/forum_posts.json" baseUrl="https://e621.net" summary="Search Forum Posts" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[topic_title_matches]" type="String" %}
The title of the topic the forum post is under.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
The ID of the forum post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[body_matches]" type="String" %}
The body of the post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" %}
The ID of the creator of the forum post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the forum post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[topic_category_id]" type="Number" %}
The ID of the category the forum post is under
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
The maximum number of forum posts to return. Between 20 and 320
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="Number" %}
The page of results to get. Numbered pages are limited to 750. Use a & b prefixes with a forum post id for after and before respectively.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
    {
        "id": 0,
        "topic_id": 0,
        "creator_id": 0,
        "updater_id": 0,
        "body": "content",
        "is_hidden": false,
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "warning_type": null, // "warning", "record", "ban"
        "warning_user_id": null, // user id
    }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
{
    "forum_posts": []
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/forum_posts/:id/warning.json" baseUrl="https://e621.net" summary="Add A Warning To A Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to add a warning to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="record_type" type="String" required="false" %}
The type of warning to add to the forum post. One of:

`warning`

,

`record`

,

`ban`

,

`unmark`

.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "html": "<new forum post html contents>",
    "posts": {} // unknown
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

{% swagger-response status="500: Internal Server Error" description="Invalid Warning Type" %}
```javascript
{
    "success": false,
    "message": "'TYPE' is not a valid warning_type",
    "code": "UUID"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/forum_posts/:id/hide.json" baseUrl="https://e621.net" summary="Hide A Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+Required</mark> if the post is not yours

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to hide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "topic_id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "body": "content",
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "warning_type": null, // "warning", "record", "ban"
    "warning_user_id": null, // user id
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/forum_posts/:id/unhide.json" baseUrl="https://e621.net" summary="Unhide A Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> regardless

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="false" %}
The ID of the forum post to unhide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "topic_id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "body": "content",
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "warning_type": null, // "warning", "record", "ban"
    "warning_user_id": null, // user id
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/forum_posts/:id.json" baseUrl="https://e621.net" summary="Get Forum Post" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "topic_id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "body": "content",
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "warning_type": null, // "warning", "record", "ban"
    "warning_user_id": null, // user id
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}
