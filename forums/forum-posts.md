# Forum Posts

An alias for `/forum_posts` exists: `/fposts`

{% swagger method="get" path="/forum_posts.json" baseUrl="https://e621.net" summary="Search Forum Posts" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" type="Number" required="false" %}
See 

[Search Parameters: search\[id\]](../common/search-parameters.md#search-id)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[topic_title_matches]" type="String" required="false" %}
The title of the topic the forum post is under.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[body_matches]" type="String" required="false" %}
The body of the post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" required="false" %}
The ID of the creator of the forum post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" required="false" %}
The name of the creator of the forum post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[topic_category_id]" type="Number" required="false" %}
The ID of the category the forum post is under
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

{% swagger method="post" path="/forum_posts/:id/warning.json" baseUrl="https://e621.net" summary="Add A Warning To A Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to add a warning to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="record_type" type="String" required="true" %}
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
    "code": "00000000-0000-0000-0000-000000000000"
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

{% swagger method="post" path="/forum_posts.json" baseUrl="https://e621.net" summary="Create A Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Some topics may be in specific categories that require certain user levels.
{% endswagger-description %}

{% swagger-parameter in="body" name="forum_post[topic_id]" type="Number" required="true" %}
The ID of the forum topic this forum post should be in.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_post[body]" type="String" required="true" %}
The body of the forum post.
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
            "is too short (minimum is 1 character)"
        ]
    }
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

{% swagger-response status="422: Unprocessable Entity" description="Topic Locked" %}
```javascript
{
  "errors": {
    "topic": [
      "is locked"
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

{% swagger method="patch" path="/forum_posts/:id.json" baseUrl="https://e621.net" summary="Modify A Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> if the forum post is not yours
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_post[body]" type="String" required="true" %}
The body of the forum post.
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

{% swagger method="delete" path="/forum_posts/:id.json" baseUrl="https://e621.net" summary="Delete A Forum Post" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin Required</mark>
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to delete.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```javascript
{
    // Response
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

{% swagger method="post" path="/forum_posts/:id/votes.json" baseUrl="https://e621.net" summary="Create Forum Post Vote" %}
{% swagger-description %}
<mark style="color:blue;">Authentication Required</mark>

Votes can only be added to posts which are the OP of an alias request, implication request, or bulk update request.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post to vote on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_post_vote[score]" type="Number" %}
The vote to add to the post. 

`1`

 for up, 

`0`

 for meh, and 

`-1`

 for down.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "forum_post_id": 0,
    "creator_id": 0,
    "score": 0, // 1, -1
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "creator_name": "test"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Vote Already Taken" %}
```javascript
{
    "success": false,
    "reason": "Access Denied: Your vote has already been taken"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Cannot Vote On Post" %}
<pre class="language-javascript"><code class="lang-javascript"><strong>// Post is not an alias request, implication request, or bulk update request OP
</strong><strong>{
</strong>    "success": false,
    "reason": "Access Denied"
}
</code></pre>
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
{% endswagger %}

{% swagger method="delete" path="/forum_posts/:id/votes.json" baseUrl="https://e621.net" summary="Delete Forum Post Vote" %}
{% swagger-description %}
<mark style="color:blue;">

Authorization Required

</mark>
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the forum post remove a vote from.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Cannot Vote On Post" %}
```javascript
{
    "success": false,
    "reason": "Access Denied"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Vote Does Not Exist" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}
