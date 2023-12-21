# Post Sets

{% swagger method="get" path="/post_sets.json" baseUrl="https://e621.net" summary="Search Post Sets" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="search[name]" type="String" %}
The name of the set.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[shortname]" type="String" %}
The shortname of the set.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_public]" type="Boolean" %}
If the set is public.
<mark style="color:red;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" type="String" %}
The name of the creator of the set.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" type="Number" %}
The ID of the creator of the set.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `update`, `updated_at`, `name`, `shortname`, `created_at`, `postcount`, `post_count`
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
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "creator_id": 0,
    "description": "",
    "id": 0,
    "is_public": false,
    "name": "",
    "post_count": 0,
    "post_ids": [
      0
    ],
    "shortname": "",
    "transfer_on_delete": false,
    "updated_at": "0000-00-00T00:00:00.000-00:00"
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
// See https://github.com/e621ng/e621ng/issues/359
{
  "post_sets": []
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/post_sets/{id}.json" baseUrl="https://e621.net" summary="Get Post Set" %}
{% swagger-description %}
<mark style="color:red;">Moderator+ Required</mark> If set is private.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "description": "",
  "id": 0,
  "is_public": false,
  "name": "",
  "post_count": 0,
  "post_ids": [
    0
  ],
  "shortname": "",
  "transfer_on_delete": false,
  "updated_at": "0000-00-00T00:00:00.000-00:00"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Access Denied (Private)" %}
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

{% swagger method="post" path="/post_sets.json" baseUrl="https://e621.net" summary="Create Post Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark> If account is less than 3 days old.

{% endswagger-description %}

{% swagger-parameter in="body" name="post_set[name]" type="String" required="true" %}
The name of the set.

Min: 3 / Max: 100
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[shortname]" type="String" required="true" %}
The shortname of the set. Cannot be only digits.

Min: 3 / Max: 50
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[description]" type="String" %}
The description of the set.

Max: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[is_public]" type="Boolean" %}
If the set is public.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[transfer_on_delete]" type="Boolean" %}
If parents of deleted posts are transferred into the set.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "description": "",
  "id": 0,
  "is_public": false,
  "name": "",
  "post_count": 0,
  "post_ids": [
    0
  ],
  "shortname": "",
  "transfer_on_delete": false,
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
    "shortname": [
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

{% swagger method="patch" path="/comments/{id}.json" baseUrl="https://e621.net" summary="Edit Post Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark> If account is less than 3 days old.

<mark style="color:yellow;">Admin+ Required</mark> If the set is not yours.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[name]" type="String" required="true" %}
The name of the set.

Min: 3 / Max: 100
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[shortname]" type="String" required="true" %}
The shortname of the set. Cannot be only digits.

Min: 3 / Max: 50
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[description]" type="String" %}
The description of the set.

Max: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[is_public]" type="Boolean" %}
If the set is public.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_set[transfer_on_delete]" type="Boolean" %}
If parents of deleted posts are transferred into the set.
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

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
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
    "shortname": [
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

{% endswagger %}

{% swagger method="delete" path="/post_sets/{id}.json" baseUrl="https://e621.net" summary="Delete Post Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> If the set isn't yours.

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set to delete.
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

{% swagger method="post" path="/post_sets/{id}/add_posts.json" baseUrl="https://e621.net" summary="Add Posts To Post Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> If the post set isn't owned or maintained by you.

While the limit is 10,000 posts, attempting to add that many posts at once will most likely result in a timeout with status code 524. A request that would take the set over the 10,000 post limit will fail and none of the posts will be added.
Invalid IDs are silently ignored.
This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set to add posts to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_ids[]" type="Number" required="true" %}
An array of post IDs to add to the set.
Limit: 10,000
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "description": "",
  "id": 0,
  "is_public": false,
  "name": "",
  "post_count": 0,
  "post_ids": [
    0
  ],
  "shortname": "",
  "transfer_on_delete": false,
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Post Set Too Large" %}
```javascript
{
  "errors": {
    "base": [
      "Sets can have up to 10,000 posts each"
    ]
  }
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="post_ids[] missing" %}
```javascript
{
  "success": false,
  "message": "An unexpected error occurred.",
  "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="post" path="/post_sets/{id}/remove_posts.json" baseUrl="https://e621.net" summary="Remove Posts From Post Set" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark> If the post set isn't owned or maintained by you.

Invalid IDs are silently ignored.
This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set to remove posts from.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_ids[]" type="Number" required="true" %}
An array of post IDs to remove from the set
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "creator_id": 0,
  "description": "",
  "id": 0,
  "is_public": false,
  "name": "",
  "post_count": 0,
  "post_ids": [
    0
  ],
  "shortname": "",
  "transfer_on_delete": false,
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

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
  "success": false,
  "reason": "not found"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="post_ids[] missing" %}
```javascript
{
  "success": false,
  "message": "An unexpected error occurred.",
  "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}

{% endswagger %}

{% swagger method="get" path="/post_sets/for_select.json" baseUrl="https://e621.net" summary="Post Sets For Select" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

undefined

Invalid IDs are silently ignored.
This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the set to remove posts from.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="post_ids[]" type="Number" required="true" %}
An array of post IDs to remove from the set
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript
{
  "Owned": [
    "", // name
    0 // id
  ],
  "Maintained": [
    "", // name
    0 // id
  ]
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