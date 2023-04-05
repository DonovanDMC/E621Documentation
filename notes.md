# Notes

{% swagger method="get" path="/notes.json" baseUrl="https://e621.net" summary="Search Notes" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="search[id]" type="String" %}
See 

[Search Parameters: search\[id\]](common/search-parameters.md#search-id)


{% endswagger-parameter %}

{% swagger-parameter in="body" name="search[is_active]" type="Boolean" %}
If the note is active.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="search[body_matches]" type="String" %}
The body of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="search[creator_id]" type="Number" %}
The ID of the creator of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="search[creator_name]" type="String" %}
The name of the creator of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="search[post_id]" type="Number" %}
The ID of the post the note is on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="search[post_tags_match]" type="String" %}
The tags of the post the note is on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="limit" type="Number" %}
See 

[Search Parameters: limit](common/search-parameters.md#limit)


{% endswagger-parameter %}

{% swagger-parameter in="body" name="page" type="String" %}
See 

[Search Parameters: page](common/search-parameters.md#page)


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
    {
        "id": 0,
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "creator_id": 0,
        "x": 0,
        "y": 0,
        "width": 0,
        "height": 0,
        "version": 0,
        "is_active": true,
        "post_id": 0,
        "body": "content",
        "creator_name": "name"
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

{% swagger method="get" path="/notes/:id.json" baseUrl="https://e621.net" summary="Get A Note" %}
{% swagger-description %}
Visiting /notes/:id in html form will redirect to /posts/:postID/
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" %}
The ID of the note.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "creator_id": 0,
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0,
    "version": 0,
    "is_active": true,
    "post_id": 0,
    "body": "content",
    "creator_name": "name"
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

{% swagger method="post" path="/notes.json" baseUrl="https://e621.net" summary="Create A Note" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:blue;">Privileged+</mark>, account must be older than 1 week
{% endswagger-description %}

{% swagger-parameter in="body" required="true" name="n" type="Number" %}
The ID of the post the note is for.
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="note[x]" type="Number" %}
The X location of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="note[y]" type="Number" %}
The Y location of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="note[width]" type="Number" %}
The width of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="note[height]" type="Number" %}
The height of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="note[body]" type="String" %}
The body of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[html_id]" type="String" %}
A pass-through string.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "post_id": 0,
    "x": 0,
    "y": 0,
    "width": 0
    "height": 0,
    "is_active": true,
    "body": "content",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "version": 0,
    "html_id": null, // no idea what this actually is, but it comes through from creation
    "creator_name": "name"
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
// this applies for both invalid x/y, as well as 
// width/height values bleeding off the image
{
    "success": false,
    "reasons": [
        "Note must be inside the image"
    ]
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Notes Locked" %}
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

{% swagger method="patch" path="/notes/:id.json" baseUrl="https://e621.net" summary="Modify A Note" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:blue;">Privileged+</mark>, account must be older than 1 week
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the note to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[x]" type="Number" %}
The X location of the note.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="note[y]" type="Number" %}
The Y location of the note.
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
    "id": 0,
    "creator_id": 0,
    "post_id": 0,
    "x": 0,
    "y": 0,
    "width": 0
    "height": 0,
    "is_active": true,
    "body": "content",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "version": 0,
    "html_id": null, // no idea what this actually is, but it comes through from creation
    "creator_name": "name"
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
// this applies for both invalid x/y, as well as 
// width/height values bleeding off the image
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
{% endswagger %}

{% swagger method="delete" path="/notes/:id.json" baseUrl="https://e621.net" summary="Delete A Note" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:blue;">Privileged+</mark>, account must be older than 1 week

This operation is idempotent

Unless your account is not old enough or the post has notes locked, a success will always be returned (even if the note does not exist)
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" %}
The ID of the note to delete.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```javascript
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
    "errors": {
        "post": [
            "is note locked"
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}
