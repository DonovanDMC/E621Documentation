# Uploads

{% swagger method="get" path="/uploads.json" baseUrl="https://e621.net" summary="Search Uploads" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark>

{% endswagger-description %}

{% swagger-parameter in="query" name="uploader_id" type="Number" %}
The ID of the uploader.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="uploader_name" type="String" %}
The name of the uploader.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="source" type="String" %}
Exact matching for the provided source.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="source_matches" type="String" %}
Like matching for the provided source.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="rating" type="String" %}
The rating of the upload. One of: `s`, `q`, `e`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="parent_id" type="Number" %}
The parent id of the upload.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="post_id" type="Number" %}
The ID of the resulting post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="has_post" type="Boolean" %}
If the upload resulted in a post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="post_tags_match" type="String" %}
The tags of the resulting post.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="status" type="String" %}
The status of the upload. This is stored and searched as generic text. The ui provides these options: `completed`, `processing`, `pending`, `*duplicate*`, `error*`.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="backtrace" type="String" %}
The backtrace/stacktrace of the error related to this upload, if it failed.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="tag_string" type="String" %}
The tags of the upload.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: `id_asc`, `id_desc`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="String" %}
See [Search Parameters: page](other/search_parameters.md#page)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
See [Search Parameters: limit](other/search_parameters.md#limit)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
See [Search Parameters: search\[id\]](other/search_parameters.md#search-id)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
  { // All of post_id, md5, file_ext, file_size, image_width & image_height can be null
    "description": "",
    "file_ext": "",
    "file_size": 0,
    "image_height": 0,
    "image_width": 0,
    "md5": "dc3a90deef089384f39e45fdaea96e78",
    "uploader_name": "",
    "backtrace": null,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "id": 0,
    "md5_confirmation": null,
    "parent_id": 0,
    "post_id": 0,
    "rating": "s",
    "source": "",
    "status": "completed",
    "tag_string": "",
    "updated_at": "0000-00-00T00:00:00.000-00:00"
  }
]
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Success (No Results) !!" %}
```javascript
// See https://github.com/e621ng/e621ng/issues/359
{
  "uploads": []
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

{% endswagger %}

{% swagger method="get" path="/uploads/{id}.json" baseUrl="https://e621.net" summary="Get Uploads" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:red;">Janitor+ Required</mark>

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The ID of the upload.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{ // All of post_id, md5, file_ext, file_size, image_width & image_height can be null
  "description": "",
  "file_ext": "",
  "file_size": 0,
  "image_height": 0,
  "image_width": 0,
  "md5": "dc3a90deef089384f39e45fdaea96e78",
  "uploader_name": "",
  "backtrace": null,
  "created_at": "0000-00-00T00:00:00.000-00:00",
  "id": 0,
  "md5_confirmation": null,
  "parent_id": 0,
  "post_id": 0,
  "rating": "s",
  "source": "",
  "status": "completed",
  "tag_string": "",
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

{% endswagger %}

{% swagger method="post" path="/uploads.json" baseUrl="https://e621.net" summary="Create Upload" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Account must be one week old to upload, unless the account is <mark style="color:yellow;">Admin+ Required</mark> or has the **Unrestricted Uploads** permission.
{% endswagger-description %}

{% swagger-parameter in="body" name="upload[direct_url]" type="String" %}
A link to a file to upload. The url must be in the site's [upload whitelist](https://e621.net/upload_whitelists). Mutually exclusive with `upload[file]`.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[file]" type="String" %}
A file to upload. Mutually exclusive with `upload[direct_url]`.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[tag_string]" type="String" %}
A Tags of the post. If not provided, `tagme` will be used.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[rating]" type="String" required="true" %}
The rating of the post. One of: `s`, `q`, `e`.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[source]" type="String" %}
The sources of the post, separated by a newline.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[description]" type="String" %}
The description of the post.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[parent_id]" type="Number" %}
The id of a post to be the parent of the post.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[locked_tags]" type="String" %}
The tags to lock on the post. <mark style="color:yellow;">Admin+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[locked_rating]" type="Boolean" %}
If the rating should be locked. <mark style="color:blue;">Privileged+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="upload[as_pending]" type="Boolean" %}
If the post should be uploaded as pending. **Unrestricted Uploads** required.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "success": true,
  "location": "/posts/0",
  "post_id": 0
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Uploads Disabled" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: Uploads are disabled"
}
```
{% endswagger-response %}

{% swagger-response status="403: Forbidden" description="Account Too New" %}
```javascript
{
  "success": false,
  "reason": "Access Denied: You can not upload during your first week."
}
```
{% endswagger-response %}

{% swagger-response status="412: Precondition Failed" description="Invalid Upload" %}
```javascript
{
  "success": false,
  "reason": "invalid",
  "messsage": "" // Semicolon (;) separated list of errors.
}
```
{% endswagger-response %}

{% swagger-response status="412: Precondition Failed" description="Duplicate Upload" %}
```javascript
{
  "success": false,
  "reason": "duplicate",
  "location": "/posts/0",
  "post_id": 0
}
```
{% endswagger-response %}

{% endswagger %}