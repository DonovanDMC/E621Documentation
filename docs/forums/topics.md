# Forum Topics

An alias for `/forum_topics` exists: `/ftopics` (hide, unhide, mark_all_as_read, subscribe, and ubsuscribe routes are not supported).

{% swagger method="get" path="/forum_topics.json" baseUrl="https://e621.net" summary="Search Forum Topics" %}
{% swagger-description %}
<mark style="color:red;">Moderator+ Required</mark> To search hidden forum topics not created by the authenticated user.

Some topics may be in specific categories that require certain user levels to view.
{% endswagger-description %}

{% swagger-parameter in="query" name="search[title_matches]" type="String" %}
The title of the forum topic (fuzzy matching).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[title]" type="String" %}
The title of the forum topic (exact matching).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[category_id]" type="Number" %}
The ID of the category the forum topic is in.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_hidden]" type="Boolean" %}
If the forum topic is hidden.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_locked]" type="Boolean" %}
If the forum topic is locked.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_sticky]" type="Boolean" %}
If the forum topic is sticky.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `sticky`
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
    "category_id": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "creator_id": 0,
    "id": 0,
    "is_hidden": false,
    "is_locked": false,
    "is_sticky": false,
    "response_count": 0,
    "title": "",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "updater_id": 0
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

{% swagger method="get" path="/forum_topics/{id}.json" baseUrl="https://e621.net" summary="Get Forum Topic" %}
{% swagger-description %}
<mark style="color:red;">Moderator+ Required</mark> If the forum topic is hidden, and not created by the authenticated user.

Some topics may be in specific categories that require certain user levels to view.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "category_id": 0,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "id": 0,
  "is_hidden": false,
  "is_locked": false,
  "is_sticky": false,
  "response_count": 0,
  "title": "",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0
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

{% swagger method="post" path="/forum_topics/{id}/hide.json" baseUrl="https://e621.net" summary="Hide Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark> If the forum topic is not yours.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic to hide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "category_id": 0,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "id": 0,
  "is_hidden": false,
  "is_locked": false,
  "is_sticky": false,
  "response_count": 0,
  "title": "",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0
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

{% swagger method="post" path="/forum_topics/{id}/unhide.json" baseUrl="https://e621.net" summary="Unhide Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic to unhide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "category_id": 0,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "id": 0,
  "is_hidden": false,
  "is_locked": false,
  "is_sticky": false,
  "response_count": 0,
  "title": "",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0
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

{% swagger method="post" path="/forum_topics/{id}/subscribe.json" baseUrl="https://e621.net" summary="Subscribe To Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Some topics may be in specific categories that require certain user levels to view.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic to subscribe to.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "category_id": 0,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "id": 0,
  "is_hidden": false,
  "is_locked": false,
  "is_sticky": false,
  "response_count": 0,
  "title": "",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0
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

{% swagger method="post" path="/forum_topics/{id}/subscribe.json" baseUrl="https://e621.net" summary="Unubscribe From Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Some topics may be in specific categories that require certain user levels to view.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic to unsubscribe from.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "category_id": 0,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "id": 0,
  "is_hidden": false,
  "is_locked": false,
  "is_sticky": false,
  "response_count": 0,
  "title": "",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0
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
<mark style="color:blue;">Authorization Required</mark>

{% endswagger-description %}

{% swagger-response status="302: Found" description="Success" %}
```html
<html><body>You are being <a href="https://e621.net/forum_topics">redirected</a>.</body></html>
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/forum_topics.json" baseUrl="https://e621.net" summary="Create Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Some topics may be in specific categories that require certain user levels to create topics.
{% endswagger-description %}

{% swagger-parameter in="body" name="forum_topic[title]" type="String" %}
The title of the forum topic.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[category_id]" type="Number" %}
The ID of the category the forum topic is in.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_sticky]" type="Number" %}
If the forum topic is sticky.

<mark style="color:red;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_locked]" type="Number" %}
If the forum topic is locked.

<mark style="color:red;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][body]" type="String" %}
The body of the first post in the topic. Mutually exclusive with `forum_topic[original_post_attributes][id]`.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][id]" type="Boolean" %}
IThe ID of the post to use as the first post of this topic. Mutually exclusive with `forum_topic[original_post_attributes][body]`.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "id": 0,
  "is_hidden": false,
  "topic_id": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0,
  "warning_type": null, // warning, record, ban
  "warning_user_id": null
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

{% swagger-response status="422: Unprocessable Entity" description="Restricted Topic" %}
```javascript
{
  "errors": {
    "original_post.topic": [
      "is restricted",
      "does not allow replies"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Restricted Category" %}
```javascript
{
  "errors": {
    "category": [
      "does not allow new topics"
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

{% swagger-response status="500: Internal Server Error" description="Invalid Category" %}
```javascript
{
  "success": false,
  "message": "An unexpected error occurred.",
  "code": "00000000-0000-0000-0000-000000000000"
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

{% endswagger %}

{% swagger method="patch" path="/forum_topics/{id}.json" baseUrl="https://e621.net" summary="Edit Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> If the forum topic is not yours.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum topic to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_post[body]" type="String" %}
The body of the forum post.
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

{% swagger-response status="422: Unprocessable Entity" description="Blank Body" %}
```javascript
{
  "errors": {
    "body": [
      "can't be blank",
      "is too short (minimum is 1 character"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Too Long" %}
```javascript
{
  "errors": {
    "body": [
      "is too long (maximum is 50000 characters)"
    ]
  }
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/forum_posts/{id}.json" baseUrl="https://e621.net" summary="Delete Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

{% endswagger-description %}

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

{% swagger method="post" path="/forum_posts/{id}/votes.json" baseUrl="https://e621.net" summary="Create Forum Post Vote" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark> If account is less than 3 days old.

Votes can only be added to posts which are the OP of an alias request, implication request, or bulk update request.

Access denied error messages can be combined, separated by a semicolon and space (`; `).
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to vote on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_post_vote[score]" type="Number" required="true" %}
The vote to cast. One of: `-1`, `0`, `1`.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "forum_post_id": 0,
  "id": 0,
  "score": 0, // 1, 0, -1
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

{% swagger-response status="403: Forbidden" description="Account Too New" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: Creator can not yet perform this action. Account is too new"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Invalid Score" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: Score is not included in the list"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Cannot Vote On Own Post" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: You cannot vote on your own requests"
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

{% swagger method="delete" path="/forum_posts/{id}/votes.json" baseUrl="https://e621.net" summary="Delete Forum Post Vote" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to delete the vote on.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{}
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