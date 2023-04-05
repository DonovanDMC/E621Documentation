# Forum Topics

{% swagger method="get" path="/forum_topics.json" baseUrl="https://e621.net" summary="Search Forum Topics" %}
{% swagger-description %}
Some topics may be in specific categories that require certain user levels.

E621 does not provide a form to search topics, so the information here may be inaccurate or incomplete.
{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" type="Number" required="false" %}
See 

[Search Parameters: search\[id\]](../common/search-parameters.md#search-id)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[title_matches]" type="String" required="false" %}
The title of the forum topic (fuzzy matching).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[title]" type="String" required="false" %}
The title of the forum topic (exact matching).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_locked]" type="Boolean" required="false" %}
If the forum topic is locked.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_sticky]" type="Boolean" required="false" %}
If the forum topic is stickied.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_hidden]" type="Boolean" required="false" %}
If the forum topic is hidden.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[category_id]" type="Number" required="false" %}
The ID of the category the forum topic is in.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" required="false" %}
The order of the returned results. One of:

`sticky`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" required="false" %}
See 

[Search Parameters: limit](../common/search-parameters.md#limit)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="Number" required="false" %}
See 

[Search Parameters: page](../common/search-parameters.md#page)


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
    {
        "id": 0,
        "creator_id": 0,
        "updater_id": 0,
        "title": "content",
        "response_count": 0,
        "is_sticky": false,
        "is_locked": false,
        "is_hidden": false,
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "category_id": 0
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

{% swagger method="get" path="/forum_topics/:id.json" baseUrl="https://e621.net" summary="Get A Forum Topic" %}
{% swagger-description %}
Some topics may be in specific categories that require certain user levels.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
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

{% swagger method="post" path="/forum_topics/:id/hide.json" baseUrl="https://e621.net" summary="Hide A Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+Required</mark> if the topic is not yours

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic to hide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
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

{% swagger method="post" path="/forum_topics/:id/unhide.json" baseUrl="https://e621.net" summary="Unhide A Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> regardless

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="false" %}
The ID of the forum topic to unhide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
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

{% swagger method="post" path="/forum_topics/:id/create_merge.json" baseUrl="https://e621.net" summary="Merge Forum Topics" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>

The original forum topic may be left in a broken state after merging.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the topic to merge.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="merged_id" type="Number" required="true" %}
The ID of the topic to merge into. 
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="Success(?)" %}
```html
<!-- returned regardless of if anything actually happened -->
<html><body>You are being <a href="https://e621.net/forum_topics/:id">redirected</a>.</body></html>
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Invalid Topic/Merge Topic" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/forum_topics/:id/subscribe.json" baseUrl="https://e621.net" summary="Subscribe To A Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> if the topic is not visible to you (hidden or otherwise)

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the topic to subscribe to.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
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

{% swagger method="post" path="/forum_topics/:id/unsubscribe.json" baseUrl="https://e621.net" summary="Unsubscribe From A Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> if the topic is not visible to you (hidden or otherwise)

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the topic to unsubscribe from.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
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

{% swagger method="post" path="/forum_topics/mark_all_as_read.json" baseUrl="https://e621.net" summary="Mark All Forum Topics As Read" %}
{% swagger-description %}
<mark style="color:blue;">

Authorization Required

</mark>
{% endswagger-description %}

{% swagger-response status="302: Found" description="Success" %}
```javascript
<html><body>You are being <a href="https://e621.net/forum_topics">redirected</a>.</body></html>
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/forum_topics.json" baseUrl="https://e621.net" summary="Create A Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Some categories may have specific level requirements to create topics.
{% endswagger-description %}

{% swagger-parameter in="body" name="forum_topic[title]" type="String" required="true" %}
The title of the topic.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[category_id]" type="Number" required="true" %}
The ID of the category to put the topic in.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][body]" type="String" required="false" %}
The body of the first post in the topic. Mutually exclusive with

`forum_topic[original_post_attributes][id]`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][id]" type="Number" required="false" %}
The ID of the post to use as the first post of this topic. Mutually exclusive with

`forum_topic[original_post_attributes][body]`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_sticky]" type="Boolean" required="false" %}
If the topic is sticky.

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_locked]" type="Boolean" required="false" %}
If the topic is locked.

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
        "errors": {
            "original_post.creator": [
                "can not yet perform this action. Account is too new"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Original Post" %}
```javascript
{
        "errors": {
            "original_post": [
                "is invalid"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Restricted Category" %}
```javascript
{
        "errors": {
            "original_post.topic": [
                "is restricted"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Blank Original Post" %}
```javascript
{
        "errors": {
            "original_post": [
                "can't be blank"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Category" %}
```javascript
{
        "errors": {
            "category": [
                "must exist"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Title Too Long" %}
```javascript
{
        "errors": {
            "title": [
                "is too long (maximum is 250 characters)"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Original Post Body Too Long" %}
```javascript
{
        "errors": {
            "original_post.body": [
                "is too long (maximum is 50000 characters)"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Original Post Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/forum_topics/:id.json" baseUrl="https://e621.net" summary="Modify A Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> if the forum topic is not yours
{% endswagger-description %}

{% swagger-parameter in="path" type="Numbe" %}
The ID of the forum topic to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[title]" type="Number" %}
The title of the topic.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[category_id]" type="Number" %}
The ID of the category to put the topic in.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][body]" type="String" %}
The body of the first post in the topic. Mutually exclusive with

`forum_topic[original_post_attributes][id]`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][id]" type="Number" %}
The ID of the post to use as the first post of this topic. Mutually exclusive with

`forum_topic[original_post_attributes][body]`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_sticky]" type="Boolean" %}
If the topic is sticky.

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_locked]" type="Boolean" %}
If the topic is locked.

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```javascript
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

{% swagger method="delete" path="/forum_topics/:id.json" baseUrl="https://e621.net" summary="Delete A Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" %}
The ID of the forum topic to delete.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```javascript
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
