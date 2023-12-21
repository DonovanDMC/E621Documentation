# Admin

{% swagger method="patch" path="/admin/users/{id}.json" baseUrl="https://e621.net" summary="Edit User" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

<mark style="color:purple;">BD Staff Required</mark> to edit flags of admins

Even if unchanged, user[level] MUST be provided when changing `can_approve_posts`, `no_flagging`, `replacements_beta`, and `can_upload_free`. Due to this requirement, editing the flags of any admin (including the current user) will always fail, unless the user is <mark style="color:purple;">BD Staff</mark>. This route will not return errors for almost anything.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the user to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[level]" type="Number" %}
The level of the user. Providing this is required for editing any "flags".
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[profile_about]" type="String" %}
The about section of the user.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[can_approve_posts]" type="Boolean" %}
If the user can approve posts.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[profile_artinfo]" type="String" %}
The "Artist Information" section of the user.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[base_upload_limit]" type="Number" %}
The base upload limit of the user.  **10** by default. Invalid values will be interpreted as **0**.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[email]" type="String" %}
The email of the user.

<mark style="color:purple;">BD Staff Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[verified]" type="Boolean" %}
If the user's email is verified.

<mark style="color:purple;">BD Staff Required</mark>
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
<html><body>You are being <a href="https://e621.net/users/{id}">redirected</a>.</body></html>
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="No Parameters" %}
```javascript
{
  "success": false,
  "message": "param is missing or the value is empty: user",
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

{% swagger-response status="403: Forbidden" description="Not BD Staff" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: Only BD staff can promote to admin"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Not BD Staff" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: Can't demote BD staff"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/admin/users/{id}/update_blacklist.json" baseUrl="https://e621.net" summary="Edit User's Blacklist" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the user to edit the blacklist of.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="user[blacklisted_tags]" type="String" required="true" %}
The user's new blacklist.
{% endswagger-parameter %}

{% swagger-response status="302: Found" description="Success" %}
```html
<html><body>You are being <a href="https://e621.net/admin/users/{id}/edit_blacklist">redirected</a>.</body></html>
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

{% swagger-response status="500: Internal Server Error" description="Too Long" %}
```javascript
{
  "success": false,
  "message": "Validation failed: Blacklisted tags is too long (maximum is 150000 characters)",
  "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/admin/users/alt_list.json" baseUrl="https://e621.net" summary="Get Alt Accounts" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

Returns a list of alt accounts.
{% endswagger-description %}

{% swagger-parameter in="query" name="page" type="Number" %}
The page of results to get. Results are paginated 250 to a page. Min: 1, Max: 9999
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
[
  [
    20, // user id (concerned user)
    [
      21 // user id (suspected alt)
    ]
  ],
  [
    21,
    [
      20
    ]
  ]
]
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