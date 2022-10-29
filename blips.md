# Blips

{% swagger method="get" path=" /blips.json" baseUrl="https://e621.net" summary="Search Blips" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[creator_name]" %}
Search by the name of the creator of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" %}
Search by the id of the creator of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[body_matches]" %}
Search by the body of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[response_to]" %}
Search by the blip the blip is responding to.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" %}
Search by the ip address of the creator. Requires Moderator.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of returned results. One of: 

`id_desc`

, 

`updated_at_desc`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
The maximum number of artists to return. Between 20 and 320
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" %}
The page of results to get. Numbered pages are limited to 750. Use a & b prefixes with an artist id for after and before respectively.
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

{% swagger method="get" path="/blips/:id.json" baseUrl="https://e621.net" summary="Get Blip" %}
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

{% swagger method="post" path="/blips.json" baseUrl="https://e621.net" summary="Create Blip" %}
{% swagger-description %}
Authorization Required

Account must be older than 1 week
{% endswagger-description %}

{% swagger-parameter in="body" name="blip[body]" type="String" required="true" %}
The body of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="blip[response_to]" type="Number" %}
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

{% swagger-response status="422: Unprocessable Entity" description="Too Short" %}
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

{% swagger method="post" path="/blips/:id/warning.json" baseUrl="https://e621.net" summary="Add Warning To Blip" %}
{% swagger-description %}
Requires Authentication

Requires Moderator or higher

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to add a warning to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="record_type" type="String" %}
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
    "html": "<new blip html contents",
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

{% swagger method="post" path="/blips/:id/hide.json" baseUrl="https://e621.net" summary="Hide Blip" %}
{% swagger-description %}
Authorization Required

Requires moderator if the blip is not yours

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

{% swagger method="post" path="/blips/:id/unhide.json" baseUrl="https://e621.net" summary="Unhide Blip" %}
{% swagger-description %}
Requires Authentication

Requires moderator regardless

This operation is idempotent
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" %}
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
// HTML Response
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/blips/:id.json" baseUrl="https://e621.net" summary="Modify Blip" %}
{% swagger-description %}
Requires Authentication

Requires Moderator if the blip is not yours

Blips older than 5 minutes cannot be edited by non-moderators.
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
{% endswagger %}

{% swagger method="delete" path="/blips/:id.json" baseUrl="https://e621.net" summary="Delete Blip" %}
{% swagger-description %}
Requires Authentication

Requires Moderator
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
