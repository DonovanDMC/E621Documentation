# Favorites

{% swagger method="get" path="/favorites.json" baseUrl="https://e621.net" summary="Get Favorites" %}
{% swagger-description %}
<mark style="color:blue;">Authentication Required</mark> if `user_id` is not specified

<mark style="color:red;">Moderator+ Required</mark> If `user_id` is blocked, or has privacy mode on
{% endswagger-description %}

{% swagger-parameter in="query" name="user_id" type="Number" %}
The ID of the user whose favorites to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "posts": [
      // Complete posts, see Posts "Get A Post" for structure
  ]
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Favorites Hidden" %}
```javascript
{
    "success": false,
    "reason": "Access Denied: This users favorites are hidden"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Invalid User/No Auth" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/favorites.json" baseUrl="https://e621.net" summary="Add A Favorite" %}
{% swagger-description %}
<mark style="color:blue;">

Authorization Required

</mark>
{% endswagger-description %}

{% swagger-parameter in="body" name="post_id" type="Number" required="true" %}
The ID of the post to favorite.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "post": {
      // Complete posts, see Posts "Get A Post" for structure
  }
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Invalid Post" %}
```javascript
{
    "success": false,
    "reason": "not found"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Post Already Favorited" %}
```javascript
{
    "success": false,
    "message": "You have already favorited this post",
    "code": null
}
```


{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/favorites/:id.json" baseUrl="https://e621.net" summary="Remove A Favorite" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the post to unfavorite.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}
{% endswagger %}
