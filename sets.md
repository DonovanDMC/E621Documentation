# Sets



{% swagger method="get" path="/post_sets.json" baseUrl="https://e621.net" summary="Search For Sets" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" type="String" required="false" %}
See

[Search Parameters: search\[id\]](common/search-parameters.md#search-id)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[name]" type="String" required="false" %}
Fuzzy matching for the name of sets.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[shortname]" type="String" required="false" %}
Matching for the short name of sets.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" required="false" %}
The name of the creator of the set.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" required="false" %}
The ID of the creator of the set. Accepts a comma separated list.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" required="false" %}
The order of the returned results. One of:

`updated_at`, `name`, `shortname`

`created_at`, `post_count`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_public]" type="Boolean" required="false" %}
If the set is public.

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" required="false" %}
See

[Search Parameters: limit](common/search-parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" required="false" %}
See

[Search Parameters: page](common/search-parameters.md#page)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  {
    "id": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "creator_id": 0,
    "is_public": true,
    "name": "name",
    "shortname": "shortname",
    "description": "description",
    "post_count": 4,
    "transfer_on_delete": true,
    "post_ids": [
      1,
      2,
      3,
      4
    ]
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

{% swagger method="get" path="/post_sets/:id.json" baseUrl="https://e621.net" summary="Get A Set" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "id": 0,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "updated_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "is_public": true,
  "name": "name",
  "shortname": "shortname",
  "description": "description",
  "post_count": 4,
  "transfer_on_delete": true,
  "post_ids": [
    1,
    2,
    3,
    4
  ]
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied" %}
```javascript
// private sets can only be viewed by their owner or Moderator+
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

{% swagger method="post" path="/post_sets.json" baseUrl="https://e621.net" summary="Create A Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Unless <mark style="color:red;">Janitor+</mark>, account must be older than 3 days to create public sets
{% endswagger-description %}

{% swagger-parameter in="body" name="post_set[name]" required="true" type="String" %}
The name of the set.

Min: 3 / Max: 100
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[short_name]" required="true" type="String" %}
Short name of the set. Cannot only be digits.

Min: 3 / Max: 50
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[description]" required="false" type="String" %}
The description of the set.

Max: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[is_public]" required="false" type="Boolean" %}
If the set is public.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[transfer_on_delete]" type="Boolean" %}
If parents of deleted posts are transferred into the set.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "id": 0,
  "name": "name",
  "shortname": "shortname",
  "description": "description",
  "is_public": false,
  "transfer_on_delete": false,
  "creator_id": 0,
  "post_ids": [],
  "post_count": 0,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "updated_at": "0000-00-00T00:00:00.000-00:00"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
// only applies to Former Staff and below
{
  "errors": {
    "base": [
      "Can't make a set public until your account is at least three days old"
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
      "is already taken"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Short Name Taken" %}
```javascript
{
  "errors": {
    "shortname": [
      "is already taken"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Name Too Short/Long" %}
```javascript
{
  "errors": {
    "name": [
      "must be between three and one hundred characters long"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Short Name Too Short/Long" %}
```javascript
{
  "errors": {
    "name": [
      "must be between three and fifty characters long"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Short Name Only Digits" %}
```javascript
{
  "errors": {
    "shortname": [
      "must contain at least one lowercase letter or underscore"
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

{% swagger-response status="422: Unprocessable Entity" description="Hourly Limit Reached" %}
```javascript
// only applies to Former Staff and below
{
  "errors": {
    "base": [
      "You have already created 6 sets in the last hour."
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Set Limit Reached" %}
```javascript
{
  "errors": {
    "base": [
      "You can only create 75 sets."
    ]
  }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/post_sets/:id.json" baseUrl="https://e621.net" summary="Modify A Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> if the set isn't yours.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```
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

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
// only applies to Former Staff and below
{
  "errors": {
    "base": [
      "Can't make a set public until your account is at least three days old"
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
      "is already taken"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Short Name Taken" %}
```javascript
{
  "errors": {
    "name": [
      "is already taken"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Name Too Short/Long" %}
```javascript
{
  "errors": {
    "name": [
      "must be between three and one hundred characters long"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Short Name Too Short/Long" %}
```javascript
{
  "errors": {
    "name": [
      "must be between three and fifty characters long"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Short Name Only Digits" %}

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
{% endswagger %}

{% swagger method="delete" path="/post_sets/:id.json" baseUrl="https://e621.net" summary="Delete A Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> if the set isn't yours.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" %}
The ID of the set.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}
```
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Acesss Denied" %}
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
