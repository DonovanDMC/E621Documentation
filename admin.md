# Admin

{% swagger method="put" path="/admin/users/:id.json" baseUrl="https://e621.net" summary="Edit A User" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>

Even if unchanged, `user[level]` MUST be provided, else a 500 Internal Server Error will be returned, along with making a junk mod action entry.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the user to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[level]" required="true" type="Number" %}
The level of the user. Even if unchanged, this must be specified.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[profile_about]" type="String" %}
The about section of the user.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[can_approve_posts]" type="Boolean" %}
If the user can approve posts.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[profile_artinfo]" type="String" %}
The commissions section of the user.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[base_upload_limit]" type="Number" %}
The base upload limit of the user. 

**10**

 by default.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[email]" type="String" %}
The email of the user.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[verified]" type="Boolean" %}
If the user's email is verified.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[enable_privacy_mode]" type="Boolean" %}
If the user's favorites are hidden.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[name]" type="String" %}
The name of the user.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[no_flagging]" type="Boolean" %}
If the user has flagging disabled.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[replacements_beta]" type="Boolean" %}
If the user is part of replacements beta.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[can_upload_free]" type="Boolean" %}
If the user has unrestricted uploads.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="Success" %}
```html
<html><body>You are being <a href="https://e621.net/users/:id">redirected</a>.</body></html>
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="No Parameters" %}
```javascript
{
    "success": false,
    "message": "param is missing or the value is empty: user\nDid you mean?  format\n               controller\n               action\n               id",
    "code": null
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied" %}
<pre class="language-javascript"><code class="lang-javascript"><strong>// Attempting to assign a level you cannot assign (e.g. mod assigning admin)
</strong><strong>// attempting to change the level of a moderator+ as a moderator
</strong><strong>{
</strong>    "success": false,
    "reason": "Access Denied"
}</code></pre>
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Missing Level" %}
```javascript
{
    "success": false,
    "message": "undefined method `>=' for nil:NilClass\n\n        is_verified? && self.level >= value && self.id.present?\n                                   ^^",
    "code": "UUID"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/admin/users/:id/update_blacklist.json" baseUrl="https://e621.net" summary="Update User's Blacklist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the user to edit the blacklist of.
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="user[blacklisted_tags]" type="String" %}
The user's new blacklist.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="Success" %}
```javascript
<html><body>You are being <a href="https://e621.net/admin/users/:id/edit_blacklist">redirected</a>.</body></html>
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Too Long" %}
```javascript
{
    "success": false,
    "message": "Validation failed: Blacklisted tags is too long (maximum is 150000 characters)",
    "code": "UUID"
}
```
{% endswagger-response %}
{% endswagger %}
