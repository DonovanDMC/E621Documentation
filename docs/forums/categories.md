---
description: >-
  These are very poorly documented as the routes are admin only, typically only respond with html (unless an error shows up), and are extremely unpredictable. They have only been included to completely fill out the Forums section.
---

# Forum Categories

GET /forum_categories does not support JSON

{% swagger method="post" path="/forum_categories.json" baseUrl="https://e621.net" summary="Create Forum Category" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

Due to this being admin only and typically ui based, there are no standard responses for errors or otherwise.
{% endswagger-description %}

{% swagger-parameter in="body" name="forum_category[name]" type="String" required="true" %}
The name of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[description]" type="String" %}
The description of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_create]" type="Number" %}
The level users must be to create topics in the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_reply]" type="Number" %}
The level users must be to reply to topics in the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_view]" type="Number" %}
The level users must be to view topics in the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[cat_order]" type="Number" %}
The sorting order of the category.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="Unknown" %}
```html
// This will be returned regardless if a category was actually created (unless the controller or database returns an error)
<html><body>You are being <a href="https://e621.net/forum_categories">redirected</a>.</body></html>
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Missing Or Invalid Name" %}
```javascript
{
  "success": false,
  "message": "PG::NotNullViolation: ERROR:  null value in column \"name\" violates not-null constraint\nDETAIL:  Failing row contains (0, null, , null, 0, 0, 0).\n",
  "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Empty Body" %}
```javascript
{
  "success": false,
  "message": "param is missing or the value is empty: forum_category\nDid you mean?  format\n               controller\n               action",
  "code": null
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

{% swagger method="patch" path="/forum_categories/{id}.json" baseUrl="https://e621.net" summary="Edit Forum Category" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

Due to this being admin only and typically ui based, there are no standard responses for errors or otherwise.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the category to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[name]" type="String" %}
The name of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[description]" type="String" %}
The description of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_create]" type="Number" %}
The level users must be to create topics in the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_reply]" type="Number" %}
The level users must be to reply to topics in the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_view]" type="Number" %}
The level users must be to view topics in the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[cat_order]" type="Number" %}
The sorting order of the category.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="Unknown" %}
```html
// This will be returned regardless of anything being changed (unless the controller or database returns an error)
<html><body>You are being <a href="https://e621.net/forum_categories">redirected</a>.</body></html>
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

{% swagger method="delete" path="/forum_categories/{id}.json" baseUrl="https://e621.net" summary="Delete Forum Category" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

As far as I can tell, there is no way to use this from the ui, so forum categories are not meant to be deleted.

This route does not support json, and as such will return a 406 Unacceptable error. The category will still be deleted.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the category to delete.
{% endswagger-parameter %}

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

{% swagger-response status="406: Not Acceptable" description="Success(?)" %}
// The category will be deleted if the conditions are right, but an error will be returned regardless.

{% endswagger-response %}

{% endswagger %}