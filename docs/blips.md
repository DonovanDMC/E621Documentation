# Blips

{% swagger method="get" path="/blips.json" baseUrl="https://e621.net" summary="Search Blips" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
Search by the name of the creator of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="String" %}
Search by the id of the creator of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[body_matches]" type="String" %}
Search by the body of the blip.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[response_to]" type="Number" %}
Search by the blip the blip is responding to.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[ip_addr]" type="String" %}
Search by the ip address of the creator. See [Search Parameters: search\[ip\_addr\]](common/search-parameters.md#search-ip\_addr).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `updated_at`, `updated_at_desc`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See [Search Parameters: search\[id\]](common/search-parameters.md#search-id)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See [Search Parameters: limit](common/search-parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](common/search-parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  {
    "body": "",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "creator_id": 0,
    "creator_name": "",
    "id": 0,
    "is_hidden": false,
    "response_to": null, // blip id
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "warning_type": null, // warning, record, ban
    "warning_user_id": null // user id
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
// See https://github.com/e621ng/e621ng/issues/359
{
  "blips": []
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/blips/{id}.json" baseUrl="https://e621.net" summary="Get Blip" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "id": 0,
  "is_hidden": false,
  "response_to": null, // blip id
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "warning_type": null, // warning, record, ban
  "warning_user_id": null // user id
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

{% swagger method="post" path="/blips/{id}/warning.json" baseUrl="https://e621.net" summary="Add Warning To Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to add a warning to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="record_type" type="String" required="true" %}
The type of warning to add to the blip. One of: `warning`, `record`, `ban`, `unmark`.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "html": "", // new blip html contents
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

{% swagger method="post" path="/blips/{id}/hide.json" baseUrl="https://e621.net" summary="Hide Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark> If the blip is not yours.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to hide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "id": 0,
  "is_hidden": false,
  "response_to": null, // blip id
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "warning_type": null, // warning, record, ban
  "warning_user_id": null // user id
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

{% swagger method="post" path="/blips/{id}/unhide.json" baseUrl="https://e621.net" summary="Unhide Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to unhide.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "id": 0,
  "is_hidden": false,
  "response_to": null, // blip id
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "warning_type": null, // warning, record, ban
  "warning_user_id": null // user id
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

{% swagger method="post" path="/blips.json" baseUrl="https://e621.net" summary="Create Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:blue;">Privileged+ Required</mark> If account is less than one week old.

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
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "id": 0,
  "is_hidden": false,
  "response_to": null, // blip id
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "warning_type": null, // warning, record, ban
  "warning_user_id": null // user id
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

{% swagger-response status="422: Unprocessable Entity" description="Invalid Response To" %}
```javascript
{
  "errors": {
    "response_to": [
      "must exist"
    ]
  }
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
    "creator": [
      "User can not yet perform this action. Account is too new."
    ]
  }
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/blips/{id}.json" baseUrl="https://e621.net" summary="Edit Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> If the blip is older than 5 minutes, or is not yours.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="blip[body]" type="String" required="true" %}
The new body of the blip.
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

{% swagger-response status="422: Unprocessable Entity" description="Blip Too Old" %}
```javascript
{
  "success": false,
  "message": "You cannot edit blips more than 5 minutes old",
  "code": null
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/blips/{id}.json" baseUrl="https://e621.net" summary="Delete Blip" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the blip to delete.
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