# Pools

{% swagger method="get" path="/pools.json" baseUrl="https://e621.net" summary="Search For Pools" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[name_matches]" type="String" %}
Fuzzy matching for the name of pools.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[description_matches]" type="String" %}
Fuzzy matching for the description of pools.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the pool.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" %}
The ID of the creator of the pool. Accepts a comma separated list.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" type="Boolean" %}
If the pool is active.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[category]" type="String" %}
The category of the pool. One of: 

`series`

, 

`collection`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: 

`name`

, 

`created_at`

, 

`post_count`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="String" %}
See 

[Search Parameters: search\[id\]](common/search-parameters.md#search-id)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See 

[Search Parameters: limit](common/search-parameters.md#limit)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See 

[Search Parameters: page](common/search-parameters.md#page)


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  {
    "id": 0,
    "name": "name",
    "creator_id": 0,
    "description": "description",
    "is_active": true,
    "post_ids": [
      1,
      2,
      3,
      4
    ],
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category": "series", // "collection"
    "creator_name": "",
    "post_count": 4
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

{% swagger method="get" path="/pools/:id.json" baseUrl="https://e621.net" summary="Get A Pool" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the pool to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "id": 0,
  "name": "name",
  "creator_id": 0,
  "description": "description",
  "is_active": true,
  "post_ids": [
    1,
    2,
    3,
    4
  ],
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "category": "series", // "collection"
  "creator_name": "",
  "post_count": 4
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

{% swagger method="post" path="/pools.json" baseUrl="https://e621.net" summary="Create A Pool" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:red;">Moderator+</mark>, account must be at least 1 week old.

Duplicate {ost IDs are silently dropped.

Post IDs are not validated.
{% endswagger-description %}

{% swagger-parameter in="body" name="pool[name]" required="true" %}
The name of the pool. Cannot be only digits.

Min: 1 / Max: 250
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[description]" %}
The description of the pool.

Max: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[category]" required="false" %}
The category of the pool. One of: 

`series`

, 

`collection`
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[is_active]" %}
If the pool is active.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[post_ids][]" %}
An array of post ids to create the pool with.&#x20;

Max: 1000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pool[post_ids_string]" %}
A space separated string of post ids to create the pool with.

Max: 1000
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "id": 0,
  "name": "name",
  "creator_id": 0,
  "description": "description",
  "is_active": true,
  "post_ids": [
    1,
    2,
    3,
    4
  ],
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "category": "series", // "collection"
  "creator_name": "",
  "post_count": 4
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
  "errors": {
    "creator": [
      "can not yet perform this action. Account is too new"
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
// only applies to Former Staff and below
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
  "code": ""
}
```
{% endswagger-response %}
{% endswagger %}

