# Notes

The notes route returns errors differently than other routes. Errors are concentrated in a single `reasons` key at the root.

{% swagger method="get" path="/notes.json" baseUrl="https://e621.net" summary="Search Notes" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="search[body_matches]" type="String" %}
The body of the note.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" type="String" %}
If the note is active.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[post_id]" type="Number" %}
The ID of the post the note is on. Multiple posts can be provided as a comma separated list.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[post_tags_match]" type="String" %}
The tags of the post the note is on.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the note.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="String" %}
The ID of the creator of the note.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See [Search Parameters: search\[id\]](other/search_parameters.md#search-id)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See [Search Parameters: limit](other/search_parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](other/search_parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  {
    "body": "",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "creator_id": 0, // user id
    "creator_name": "",
    "height": 0,
    "id": 0,
    "is_active": true,
    "post_id": 0,
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "version": 0,
    "width": 0,
    "x": 0,
    "y": 0
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
{
  "notes": []
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/notes/{id}.json" baseUrl="https://e621.net" summary="Get Note" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
The ID of the note to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0, // user id
  "creator_name": "",
  "height": 0,
  "id": 0,
  "is_active": true,
  "post_id": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "version": 0,
  "width": 0,
  "x": 0,
  "y": 0
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

{% swagger method="post" path="/notes.json" baseUrl="https://e621.net" summary="Create Note" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

{% endswagger-description %}

{% swagger-parameter in="body" name="note[post_id]" type="String" required="true" %}
The ID of the post to create the note on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[x]" type="Number" required="true" %}
The X coordinate of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[y]" type="Number" required="true" %}
The Y coordinate of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[width]" type="Number" required="true" %}
The width of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[height]" type="Number" required="true" %}
The height of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[body]" type="String" required="true" %}
The body of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[html_id]" type="String" %}
A pass-through string.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0, // user id
  "creator_name": "",
  "height": 0,
  "id": 0,
  "is_active": true,
  "post_id": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "version": 0,
  "width": 0,
  "x": 0,
  "y": 0,
  "html_id": null
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
  "success": false,
  "reasons": [
    "User can not yet perform this action. Account is too new."
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Placement" %}
```javascript
// Invalid X/Y or width/height stretch outside of image.
{
  "success": false,
  "reasons": [
    "Note must be inside the image"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Note Locked" %}
```javascript
{
  "success": false,
  "reasons": [
    "Post is note locked"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Too Long" %}
```javascript
{
  "success": false,
  "reasons": [
    "Body is too long (maximum is 1000 characters)"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Too Short" %}
```javascript
{
  "success": false,
  "reasons": [
    "Body is too short (minimum is 1 character)"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Empty" %}
```javascript
{
  "success": false,
  "reasons": [
    "Body can't be blank"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Post" %}
```javascript
{
  "success": false,
  "reasons": [
    "Post must exist"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Post Not Provided" %}
```javascript
{
  "success": false,
  "reasons": [
    "Post can't be blank"
  ]
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="patch" path="/notes/{id}.json" baseUrl="https://e621.net" summary="Edit Note" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
The ID of the note to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[x]" type="Number" %}
The X coordinate of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[y]" type="Number" %}
The Y coordinate of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[width]" type="Number" %}
The width of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[height]" type="Number" %}
The height of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[body]" type="String" %}
The body of the note.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0, // user id
  "creator_name": "",
  "height": 0,
  "id": 0,
  "is_active": true,
  "post_id": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "version": 0,
  "width": 0,
  "x": 0,
  "y": 0
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
  "reasons": [
    "User can not yet perform this action. Account is too new."
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Placement" %}
```javascript
// Invalid X/Y or width/height stretch outside of image.
{
  "success": false,
  "reasons": [
    "Note must be inside the image"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Note Locked" %}
```javascript
{
  "success": false,
  "reasons": [
    "Post is note locked"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Too Long" %}
```javascript
{
  "success": false,
  "reasons": [
    "Body is too long (maximum is 1000 characters)"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Too Short" %}
```javascript
{
  "success": false,
  "reasons": [
    "Body is too short (minimum is 1 character)"
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Body Empty" %}
```javascript
{
  "success": false,
  "reasons": [
    "Body can't be blank"
  ]
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/notes/{id}.json" baseUrl="https://e621.net" summary="Delete Note" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

This operation is idempotent.

A success will be returned even if the note does not exist.

Deleting a note does not actually delete it, it just changes `is_active` to false.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
The ID of the note to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[x]" type="Number" %}
The X coordinate of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[y]" type="Number" %}
The Y coordinate of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[width]" type="Number" %}
The width of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[height]" type="Number" %}
The height of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[body]" type="String" %}
The body of the note.
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

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
  "success": false,
  "reasons": [
    "User can not yet perform this action. Account is too new."
  ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Note Locked" %}
```javascript
{
  "success": false,
  "reasons": [
    "Post is note locked"
  ]
}
```
{% endswagger-response %}

{% endswagger %}