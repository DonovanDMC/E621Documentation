---
description: >-
  These are very poorly documented as the routes are admin only, typically only
  respond with html (unless an error shows up), and are extremely unpredictable.
---

# Forum Categories

GET /forum\_categories does not support JSON

{% swagger method="post" path="/forum_categories.json" baseUrl="https://e621.net" summary="Create Forum Category" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin Required</mark>

Due to this being admin only and typically ui based, there are no standard responses for errors or otherwise.
{% endswagger-description %}

{% swagger-parameter in="body" name="forum_category[name]" type="String" required="true" %}
The name of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[description]" type="String" %}
The description of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_create]" type="Number" %}
The level users must be to create topics in this category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_reply]" type="Number" %}
The level users must be to reply to topics in this category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_view]" type="Number" %}
The level users must be to view topics in this category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[cat_order]" type="Number" %}
The sorting order of this category.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="General Response" %}
<pre class="language-html"><code class="lang-html"><strong>&#x3C;!-- This will be returned regardless if a topic was actually created (unless the controller or database returns an error) -->
</strong><strong>&#x3C;html>&#x3C;body>You are being &#x3C;a href="https://e621.net/forum_categories">redirected&#x3C;/a>.&#x3C;/body>&#x3C;/html></strong></code></pre>
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Missing Or Invalid Name" %}
```javascript
{
    "success": false,
    "message": "PG::NotNullViolation: ERROR:  null value in column \"name\" violates not-null constraint\nDETAIL:  Failing row contains (5, null, , null, 20, 20, 20).\n",
    "code": "83947b73-3350-4e0e-9f44-f12f473e9d21"
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

{% swagger method="patch" path="/forum_categories/:id.json" baseUrl="https://e621.net" summary="Edit Forum Category" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin Required</mark>

Due to this being admin only and typically ui based, there are no standard responses for errors or otherwise.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" %}
The ID of the forum category to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[name]" type="String" required="true" %}
The name of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[description]" type="String" %}
The description of the category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_create]" type="Number" %}
The level users must be to create topics in this category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_reply]" type="Number" %}
The level users must be to reply to topics in this category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[can_view]" type="Number" %}
The level users must be to view topics in this category.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_category[cat_order]" type="Number" %}
The sorting order of this category.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="General Response" %}
```html
<!-- This will be returned regardless of if anything was changed (unless the controller or database returns an error) -->
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

{% swagger method="delete" path="/forum_categories/:id.json" baseUrl="https://e621.net" summary="Delete A Forum Category" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin Required</mark>

As fa as I can tell, there is no way to use this from the ui, so forum categories are not meant to be deleted. They still can be deleted, but it will return an error
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" %}
The ID of the forum category to delete.
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
<pre class="language-javascript"><code class="lang-javascript">// In my testing, this DOES mean the category was deleted,
// though what state it and other various components are
// left in is up in the air.
<strong>// HTML Response</strong></code></pre>
{% endswagger-response %}
{% endswagger %}

