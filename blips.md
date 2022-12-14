# Blips

{% swagger method="get" path=" /blips.json" baseUrl="https://e621.net" summary="Search Blips" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[creator_name]" required="false" %}
Search by the name of the creator of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" required="false" %}
Search by the id of the creator of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[body_matches]" required="false" %}
Search by the body of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[response_to]" required="false" %}
Search by the blip the blip is responding to.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" required="false" %}
Search by the ip address of the creator. Requires Moderator.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" required="false" %}
The order of returned results. One of:

`id_desc`

,

`updated_at_desc`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" required="false" %}
See 

[Search Parameters: limit](readme-1/search-parameters.md#limit)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" required="false" %}
See 

[Search Parameters: page](readme-1/search-parameters.md#page)


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
    {
        "id": 0,
        "creator_id": 0,
        "body": "body",
        "response_to": null, // blip id
        "created_at": "00-00-00T00:00:00.000-00:00",
        "updated_at": "00-00-00T00:00:00.000-00:00",
        "is_hidden": false,
        "warning_type": null, // "warning", "record", "ban"
        "warning_user_id": null, // user id
        "creator_name": "name"
    }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
{
    "blips": []
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/blips/:id.json" baseUrl="https://e621.net" summary="Get A Blip" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "body": "body",
    "response_to": null, // blip id
    "created_at": "00-00-00T00:00:00.000-00:00",
    "updated_at": "00-00-00T00:00:00.000-00:00",
    "is_hidden": false,
    "warning_type": null, // "warning", "record", "ban"
    "warning_user_id": null, // user id
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

{% swagger method="post" path="/blips/:id/warning.json" baseUrl="https://e621.net" summary="Add A Warning To A Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to add a warning to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="record_type" type="String" required="true" %}
The type of warning to add to the blip. One of: 

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
    "html": "<new blip html contents>",
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

{% swagger method="post" path="/blips/:id/hide.json" baseUrl="https://e621.net" summary="Hide A Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+Required</mark> if the blip is not yours

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to hide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "body": "body",
    "response_to": null, // blip id
    "created_at": "00-00-00T00:00:00.000-00:00",
    "updated_at": "00-00-00T00:00:00.000-00:00",
    "is_hidden": false,
    "warning_type": null, // "warning", "record", "ban"
    "warning_user_id": null, // user id
    "creator_name": "name"
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
{% endswagger %}

{% swagger method="post" path="/blips/:id/unhide.json" baseUrl="https://e621.net" summary="Unhide A Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> regardless

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="false" %}
The ID of the blip to unhide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "body": "body",
    "response_to": null, // blip id
    "created_at": "00-00-00T00:00:00.000-00:00",
    "updated_at": "00-00-00T00:00:00.000-00:00",
    "is_hidden": false,
    "warning_type": null, // "warning", "record", "ban"
    "warning_user_id": null, // user id
    "creator_name": "name"
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
{% endswagger %}

{% swagger method="post" path="/blips.json" baseUrl="https://e621.net" summary="Create A Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:blue;">Privileged+</mark>, account must be older than 1 week
{% endswagger-description %}

{% swagger-parameter in="body" name="blip[body]" type="String" required="true" %}
The body of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="blip[response_to]" type="Number" required="false" %}
The ID of the blip to respond to.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
    "id": 0,
    "creator_id": 0,
    "body": "body",
    "response_to": null, // blip id
    "created_at": "00-00-00T00:00:00.000-00:00",
    "updated_at": "00-00-00T00:00:00.000-00:00",
    "is_hidden": false,
    "warning_type": null, // 1 = warning, 2 = record, 3 = ban
    "warning_user_id": null, // user id
    "creator_name": "name"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Empty Body" %}
```javascript
{
    "errors": {
        "body": [
            "can't be blank"
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
            "is too short (minimum is 5 characters)"
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
            "is too long (maximum is 1000 characters)"
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
{% endswagger %}

{% swagger method="patch" path="/blips/:id.json" baseUrl="https://e621.net" summary="Modify A Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark> if the blip is not yours, or is older than 5 minutes
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="blip[body]" type="String" required="true" %}
The new body of the blip.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Too Old" %}
```javascript
// HTML Response, nothing changed
```
{% endswagger-response %}

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

{% swagger-response status="422: Unprocessable Entity" description="Empty Body" %}
```javascript
{
    "errors": {
        "body": [
            "can't be blank"
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
            "is too short (minimum is 5 characters)"
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
            "is too long (maximum is 1000 characters)"
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/blips/:id.json" baseUrl="https://e621.net" summary="Delete A Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to delete.
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
