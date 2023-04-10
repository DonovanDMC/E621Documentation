# Help Pages

{% swagger method="get" path="/help.json" baseUrl="https://e621.net" summary="Get Help Pages" %}
{% swagger-description %}
If an e621ng instance has no existing help pages, an error will be thrown. See [e621ng/e621ng#492](https://github.com/e621ng/e621ng/issues/492).

Deleted help pages may hang around in this endpoint for up to 12 hours. See [e621ng/e621ng#492](https://github.com/e621ng/e621ng/issues/492).

This endpoint accepts no search parameters.
{% endswagger-description %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
    {
        "id": 0,
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "name": "test",
        "wiki_page": "test",
        "related": "", // separated by a comma and a space
        "title": ""
    }
]
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Success (No Results)" %}
```javascript
{
    "success": false,
    "message": "An unexpected error occurred.",
    "code": "00000000-0000-0000-0000-000000000000"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/help/:nameOrID.json" baseUrl="https://e621.net" summary="Get A Help Page" %}
{% swagger-description %}
Attempting to get a non-existent help page currently returns a 302 Found. See 

[e621ng/e621ng#499](https://github.com/e621ng/e621ng/issues/499)

.
{% endswagger-description %}

{% swagger-parameter in="path" name="nameOrID" type="String" required="true" %}
The name or ID of the help page to get.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "name": "test",
    "wiki_page": "test",
    "related": "", // separated by a comma and a space
    "title": ""
}
```
{% endswagger-response %}

{% swagger-response status="302: Found" description="Not Found" %}
```html
<html><body>You are being <a href="https://e621.net/help">redirected</a>.</body></html>
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/help.json" baseUrl="https://e621.net" summary="Create A Help Page" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>
{% endswagger-description %}

{% swagger-parameter in="body" name="help_page[name]" type="String" required="true" %}
The name of the help page.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="help_page[wiki_page]" type="String" required="true" %}
The name of the wiki page the help page will display.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="help_page[title]" type="String" %}
The title of the wiki page, Defaults to a 

[titleized](https://apidock.com/rails/String/titleize)

 version of 

`name`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="help_page[related]" type="String" %}
The related help pages, separated by a comma and a space.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "id": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "name": "test",
    "wiki_page": "test",
    "related": "", // separated by a comma and a space
    "title": ""
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

{% swagger-response status="422: Unprocessable Entity" description="Wiki Page In Use" %}
```javascript
{
    "errors": {
        "wiki_page": [
            "has already been taken"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Wiki Page Does Not Exist" %}
```javascript
{
    "errors": {
        "wiki_page": [
            "must exist"
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/help/:nameOrID.json" baseUrl="https://e621.net" summary="Edit A Help Page" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>
{% endswagger-description %}

{% swagger-parameter in="path" name="nameOrID" type="String" required="true" %}
The name or ID of the help page to edit.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="help_page[name]" type="String" %}
The name of the help page.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="help_page[wiki_page]" type="String" %}
The name of the wiki page the help page will display.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="help_page[title]" type="String" %}
The title of the wiki page, Defaults to a 

[titleized](https://apidock.com/rails/String/titleize)

 version of 

`name`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="help_page[related]" type="String" %}
The related help pages, separated by a comma and a space.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Not Found" %}
```javascript
{
    "success": false,
    "reason": "not found"
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

{% swagger-response status="422: Unprocessable Entity" description="Wiki Page In Use" %}
```javascript
{
    "errors": {
        "wiki_page": [
            "has already been taken"
        ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Wiki Page Does Not Exist" %}
```javascript
{
    "errors": {
        "wiki_page": [
            "must exist"
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/help/:nameOrID.json" baseUrl="https://e621.net" summary="Delete A Help Page" %}
{% swagger-description %}
<mark style="color:blue;">Authentication Required</mark>

<mark style="color:yellow;">Admin+ Required</mark>
{% endswagger-description %}

{% swagger-parameter in="path" name="nameOrID" type="String" required="true" %}
The name or ID of the help page to delete.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

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

