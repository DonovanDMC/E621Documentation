# Comments

{% swagger method="get" path="/comments.json" baseUrl="https://e621.net" summary="Search Comments" %}
{% swagger-description %}
No comment information will be returned in this route. See [Search Comments (Group By Comment)](./#search-comments-(group-by-comment)). This is for ui use, so it doesn't serve much api use.

This route does not support the `limit` parameter. The maximum results will always be 5.

This route does not support `search[id]`.
{% endswagger-description %}

{% swagger-parameter in="query" name="group_by" type="`post`" %}
Where to start the relation of comments from.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="tags" type="String" %}
The tags of the posts.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](../other/search_parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
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

{% swagger-response status="500: Internal Server Error" description="Success (No Results)" %}
```javascript
{
  "success": false,
  "message": "An unexpected error occurred.",
  "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/comments.json?group_by=comment" baseUrl="https://e621.net" summary="Search Comments (Group By Comment)" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="group_by" type="String" required="true" %}
`comment`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[body_matches]" type="String" %}
The body of the comment.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[do_not_bump_post]" type="Boolean" %}
If the post did not bump. The UI for searching inverts this option.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[post_tags_match]" type="String" %}
The tags of the post the comments are on.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the comment.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" %}
The ID of the creator of the comment.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_hidden]" type="Boolean" %}
If the comment is hidden.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_sticky]" type="Boolean" %}
If the comment is sticky (post as moderator).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[post_id]" type="Number" %}
The ID of the post the comment was made on. Multiple post ids can be separated by commas.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[poster_id]" type="Number" %}
The ID of the user that created the post the comment is on.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" type="String" %}
The IP Address of the creator of the comment.

See [Search Parameters: search\[ip\_addr\]](../other/search_parameters.md#search-ip\_addr).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `post_id`, `post_id_desc`, `score`, `score_desc`, `updated_at`, `updated_at_desc`
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
    "creator_name": "",
    "do_not_bump_post": false,
    "id": 0,
    "is_hidden": false,
    "is_sticky": false,
    "post_id": 0,
    "score": 0,
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "updater_id": 0,
    "updater_name": "",
    "warning_type": null, // warning, record, ban
    "warning_user_id": null
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
// See https://github.com/e621ng/e621ng/issues/359
{
  "comments": []
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/comments/{id}.json" baseUrl="https://e621.net" summary="Get Comment" %}
{% swagger-description %}
<mark style="color:red;">Moderator+ Required</mark> If comment is hidden.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "do_not_bump_post": false,
  "id": 0,
  "is_hidden": false,
  "is_sticky": false,
  "post_id": 0,
  "score": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0,
  "updater_name": "",
  "warning_type": null, // warning, record, ban
  "warning_user_id": null
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied (Hidden)" %}
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

{% swagger method="post" path="/comments/{id}/warning.json" baseUrl="https://e621.net" summary="Add Warning To Comment" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment to add a warning to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="record_type" type="String" required="true" %}
The type of warning to add to the comment. One of: `warning`, `record`, `ban`, `unmark`.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "html": "", // new comment html contents
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

{% swagger method="post" path="/comments/{id}/hide.json" baseUrl="https://e621.net" summary="Hide Comment" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark> If the comment is not yours.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment to hide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "do_not_bump_post": false,
  "id": 0,
  "is_hidden": false,
  "is_sticky": false,
  "post_id": 0,
  "score": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0,
  "updater_name": "",
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

{% swagger method="post" path="/comments/{id}/unhide.json" baseUrl="https://e621.net" summary="Unhide Comment" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment to unhide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "do_not_bump_post": false,
  "id": 0,
  "is_hidden": false,
  "is_sticky": false,
  "post_id": 0,
  "score": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0,
  "updater_name": "",
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

{% swagger method="post" path="/comments.json" baseUrl="https://e621.net" summary="Create Comment" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

<mark style="color:red;">Moderator+ Required</mark> If comment section is locked.

{% endswagger-description %}

{% swagger-parameter in="body" name="comment[body]" type="String" required="true" %}
The body of the comment.

Min: 1 / Max: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="comment[post_id]" type="Number" required="true" %}
The ID of the post to comment on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="comment[is_sticky]" type="Boolean" %}
If the comment is sticky (post as moderator).

<mark style="color:red;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="comment[is_hidden]" type="Boolean" %}
If the comment is hidden.

<mark style="color:red;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="comment[do_not_bump_post]" type="Boolean" %}
If the post should not be bumped.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "do_not_bump_post": false,
  "id": 0,
  "is_hidden": false,
  "is_sticky": false,
  "post_id": 0,
  "score": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "updater_id": 0,
  "updater_name": "",
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

{% swagger-response status="422: Unprocessable Entity" description="Empty Body" %}
```javascript
{
  "errors": {
    "body": [
      "has no content"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Too Short" %}
```javascript
{
  "errors": {
    "body": [
      "is too short (minimum is 1 character)"
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
      "is too long (maximum is 10000 characters)"
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

{% swagger-response status="422: Unprocessable Entity" description="Missing or Invalid post_id" %}
```javascript
{
  "errors": {
    "post": [
      "must exist"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Comments Locked" %}
```javascript
{
  "errors": {
    "base": [
      "Post has comments locked"
    ]
  }
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="patch" path="/comments/{id}.json" baseUrl="https://e621.net" summary="Edit Comment" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark> If comment section is locked.

<mark style="color:yellow;">Admin+ Required</mark> If the comment is not yours.

Edits performed within 5 minutes of creation will not show the "edited" text.

If the comment is not yours, the edit text will show "updated by NAME". This ignores the normal time window.

<mark style="color:red;">Moderator+ Required</mark> if comment is marked (shows warn, record, or ban message).

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="comment[body]" type="String" required="true" %}
The body of the comment.

Min: 1 / Max: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="comment[is_sticky]" type="Boolean" %}
If the comment is sticky (post as moderator).

<mark style="color:red;">Moderator+ Required</mark> if own comment

<mark style="color:yellow;">Admin+ Required</mark> otherwise
{% endswagger-parameter %}

{% swagger-parameter in="body" name="comment[is_hidden]" type="Boolean" %}
If the comment is hidden.

<mark style="color:red;">Moderator+ Required</mark> if own comment

<mark style="color:yellow;">Admin+ Required</mark> otherwise
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

{% swagger-response status="422: Unprocessable Entity" description="Empty Body" %}
```javascript
{
  "errors": {
    "body": [
      "has no content"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Too Short" %}
```javascript
{
  "errors": {
    "body": [
      "is too short (minimum is 1 character)"
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
      "is too long (maximum is 10000 characters)"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Comments Locked" %}
```javascript
{
  "errors": {
    "base": [
      "Post has comments locked"
    ]
  }
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/comments/{id}.json" baseUrl="https://e621.net" summary="Delete Comment" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment to delete.
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

{% swagger method="post" path="/comments/{id}/votes.json" baseUrl="https://e621.net" summary="Vote On Comment" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than 3 days old.

New votes cannot be cast if the comments section is locked. To remove an existing vote, send a request with the current vote. (e.g. -1 = send -1, they will cancel out). You can also use the `DELETE` method.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment to vote on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="score" type="Number" required="true" %}
The vote to cast. One of: `-1`, `1`.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="no_unvote" type="Boolean" %}
If the vote should not be removed if it already exists.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "score": 1,
  "our_score": 1 // our current vote: -1, 0, 1
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

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
  "success": false,
  "message": "Validation failed: User can not yet perform this action. Account is too new",
  "code": null
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Own Comment" %}
```javascript
{
  "success": false,
  "message": "Validation failed: You cannot vote on your own comments",
  "code": null
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Sticky Comment" %}
```javascript
{
  "success": false,
  "message": "Validation failed: You cannot vote on sticky comments",
  "code": null
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Vote" %}
```javascript
{
  "success": false,
  "message": "Invalid vote",
  "code": null
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Locked Vote" %}
```javascript
{
  "success": false,
  "message": "Vote is locked",
  "code": null
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Comment Section Locked" %}
```javascript
{
  "success": false,
  "message": "Comment section is locked",
  "code": null
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/comments/{id}/votes.json" baseUrl="https://e621.net" summary="Remove Comment Vote" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

The only vote removed will be the currently authenticated user's vote.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the comment to remove the vote from.
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

{% swagger-response status="422: Unprocessable Entity" description="Locked Vote" %}
```javascript
{
  "success": false,
  "message": "You can't remove locked votes",
  "code": null
}
```
{% endswagger-response %}

{% endswagger %}