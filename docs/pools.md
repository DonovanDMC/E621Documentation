# Pools

{% swagger method="get" path="/pools.json" baseUrl="https://e621.net" summary="Search Pools" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="search[name_matches]" type="String" %}
The name of the pool.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[description_matches]" type="String" %}
The description of the pool.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="Number" %}
The creator of the pool.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="String" %}
The ID of the creator of the pool/.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" type="Boolean" %}
If the pool is "active". (Doesn't really mean much.)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[category]" type="String" %}
The category of the pool. One of: `series`, `collection`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `name`, `created_at`, `post_count`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See [Search Parameters: search\[id\]](other/search_parameters.md#search-id)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See [Search Parameters: limit](other/search_parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](other/search_parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  {
    "category": "series",
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "creator_id": 0,
    "creator_name": "",
    "description": "",
    "id": 0,
    "is_active": true,
    "name": "",
    "post_count": 0,
    "post_ids": [
      0
    ],
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

{% endswagger %}

{% swagger method="get" path="/pools/{id}.json" baseUrl="https://e621.net" summary="Get Pool" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="String" required="true" %}
The ID of the pool to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "category": "series",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "description": "",
  "id": 0,
  "is_active": true,
  "name": "",
  "post_count": 0,
  "post_ids": [
    0
  ],
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

{% endswagger %}

{% swagger method="post" path="/pools.json" baseUrl="https://e621.net" summary="Create Pool" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Moderator+ Required</mark> If account is less than one week old.

Duplicate post IDs are silently ignored.
Post IDs are not validated.
{% endswagger-description %}

{% swagger-parameter in="body" name="pool[name]" type="String" required="true" %}
The name of the pool. Cannot be only digits.
Min: 1 / Max: 250
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[description]" type="String" %}
The description of the pool.
Max: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[category]" type="String" %}
The category of the pool. One of: `series`, `collection`
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[is_active]" type="String" %}
If the pool is active.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[post_ids][]" type="String" %}
An array of post ids to create the pool with.
Max: 1000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[post_ids_string]" type="String" %}
A space separated string of post ids to create the pool with.
Max: 1000
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "category": "series",
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "creator_name": "",
  "description": "",
  "id": 0,
  "is_active": true,
  "name": "",
  "post_count": 0,
  "post_ids": [
    0
  ],
  "updated_at": "0000-00-00T00:00:00.000-00:00"
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

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
  "errors": {
    "creator": [
      "can not yet perform this action. Account is too new."
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Name Taken" %}
```javascript
{
  "errors": {
    "name": [
      "has already been taken"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Name Too Long" %}
```javascript
{
  "errors": {
    "name": [
      "is too long (maximum is 250 characters)"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Name Only Digits" %}
```javascript
{
  "errors": {
    "name": [
      "cannot contain only digits"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Description Too Long" %}
```javascript
{
  "errors": {
    "description": [
      "is too long (maximum is 10000 characters)"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Category" %}
```javascript
{
  "errors": {
    "category": [
      "is not included in the list"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Hourly Limit Reached" %}
```javascript
{
  "errors": {
    "creator": [
      "have reached the hourly limit for this action"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Too Many Posts" %}
```javascript
{
  "errors": {
    "base": [
      "Pools can have up to 1,000 posts each"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Name Missing" %}
```javascript
{
  "success": false,
  "message": "An unexpected error occurred.",
  "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="delete" path="/pools/{id}.json" baseUrl="https://e621.net" summary="Delete Pool" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark>

{% endswagger-description %}

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

{% swagger method="put" path="/pools/{id}/revert.json" baseUrl="https://e621.net" summary="Revert Pool" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the pool to revert.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="version_id" type="Number" required="true" %}
The ID of the version to revert to.
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