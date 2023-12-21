---
description: >-
  This api is intentionally limited, you cannot create dmails.
---

# DMails

{% swagger method="get" path="/dmails.json" baseUrl="https://e621.net" summary="Get DMails" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

{% endswagger-description %}

{% swagger-parameter in="query" name="search[title_matches]" type="String" %}
The title of the dmail.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[message_matches]" type="String" %}
The body of the dmail.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[to_name]" type="String" %}
The recipient of the dmail.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[from_name]" type="String" %}
The sender of the dmail.
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
    "from_id": 0,
    "id": 0,
    "is_deleted": false,
    "is_read": false,
    "owner_id": 0,
    "title": "",
    "to_id": 0,
    "updated_at": "0000-00-00T00:00:00.000-00:00"
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results)" %}
```javascript
[]
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

{% swagger method="get" path="/dmails/{id}.json" baseUrl="https://e621.net" summary="Get DMail" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Fetching a dmail does not mark it as read.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the dmail to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "body": "",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "from_id": 0,
  "id": 0,
  "is_deleted": false,
  "is_read": false,
  "owner_id": 0,
  "title": "",
  "to_id": 0,
  "updated_at": "0000-00-00T00:00:00.000-00:00"
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

{% swagger-response status="403: Forbidden" description="Access Denied" %}
```javascript
{
  "success": false,
  "reason": "Access Denied"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/dmails/{id}.json" baseUrl="https://e621.net" summary="Delete DMail" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the dmail to delete.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="Success" %}
```html
<html><body>You are being <a href="https://e621.net/dmails">redirected</a>.</body></html>
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

{% swagger-response status="403: Forbidden" description="Access Denied" %}
```javascript
{
  "success": false,
  "reason": "Access Denied"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="put" path="/dmails/{id}/mark_as_read.json" baseUrl="https://e621.net" summary="Mark DMail As Read" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the dmail to mark as read.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
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

{% swagger method="put" path="/dmails/mark_all_as_read.json" baseUrl="https://e621.net" summary="Mark All DMails As Read" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

{% endswagger-description %}

{% swagger-response status="302: Found" description="Success" %}
```html
<html><body>You are being <a href="https://e621.net/dmails">redirected</a>.</body></html>
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