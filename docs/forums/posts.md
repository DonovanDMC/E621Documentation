# Forum Posts

An alias for `/forum_posts` exists: `/fposts`

{% swagger method="get" path="/forum_posts.json" baseUrl="https://e621.net" summary="Search Forum Posts" %}
{% swagger-description %}
<mark style="color:red;">Moderator+ Required</mark> To search hidden forum posts not created by the authenticated user.

Some posts may be in specific categories that require certain user levels to view.
{% endswagger-description %}

{% swagger-parameter in="query" name="search[topic_title_matches]" type="String" %}
The title of the topic the forum post is in.
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
The ID of the category the topic containing the forum post is in.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[topic_id]" type="Number" %}
The ID of the topic the forum post is in.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_hidden]" type="Boolean" %}
If the forum post is hidden.
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

{% swagger method="get" path="/forum_posts/{id}.json" baseUrl="https://e621.net" summary="Get Forum Post" %}
{% swagger-description %}
<mark style="color:red;">Moderator+ Required</mark> If the forum post is hidden, and not created by the authenticated user.

Some posts may be in specific categories that require certain user levels to view.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/forum_posts/{id}/warning.json" baseUrl="https://e621.net" summary="Add Warning To Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to add a warning to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="record_type" type="String" required="true" %}
The type of warning to add to the forum post. One of: `warning`, `record`, `ban`, `unmark`.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "html": "", // new forum post html contents
  "posts": {}
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

{% swagger-response status="500: Internal Server Error" description="Invalid Warning Type" %}
```javascript
{
  "success": false,
  "message": "'TYPE' is not a valid warning_type",
  "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/forum_posts/{id}/hide.json" baseUrl="https://e621.net" summary="Hide Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark> If the forum post is not yours.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to hide.
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/forum_posts/{id}/unhide.json" baseUrl="https://e621.net" summary="Unhide Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to unhide.
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/forum_posts.json" baseUrl="https://e621.net" summary="Create Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Account must be at least 3 days old.

Some topics may be in specific categories that require certain user levels to reply.
{% endswagger-description %}

{% swagger-parameter in="body" name="forum_post[body]" type="String" required="true" %}
The body of the forum post.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_post[topic_id]" type="Number" required="true" %}
The ID of the topic to create the forum post in.
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
    "creator": [
      "can not yet perform this action. Account is too new"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Forum Topic" %}
```javascript
{
  "errors": {
    "topic": [
      "must exist"
    ],
    "base": [
      "Topic ID is invalid"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Missing Body" %}
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

{% swagger-response status="422: Unprocessable Entity" description="Topic (Category) Restricted" %}
```javascript
{
  "errors": {
    "topic": [
      "is restricted",
      "does not allow replies"
    ]
  }
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="patch" path="/forum_posts/{id}.json" baseUrl="https://e621.net" summary="Edit Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> If the forum post is not yours.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to edit.
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