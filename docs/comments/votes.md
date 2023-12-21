# Comment Votes

Searching is html only.

{% swagger method="post" path="/comment_votes/lock.json" baseUrl="https://e621.net" summary="Lock Comment Votes" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark>

An error is not returned if an invalid id is provided.

Locked votes cannot be unlocked, they must be deleted.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="body" name="ids" type="String" required="true" %}
Comma separated list of votes to lock. Invalid IDs are ignored.
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

{% endswagger %}

{% swagger method="post" path="/comment_votes/{id}/delete.json" baseUrl="https://e621.net" summary="Delete Comment Votes" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>

An error is not returned if an invalid id is provided.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="body" name="ids" type="String" required="true" %}
Comma separated list of votes to delete. Invalid IDs are ignored.
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

{% endswagger %}