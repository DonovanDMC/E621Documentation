# Forum Topics

{% swagger method="get" path="/forum_topics.json" baseUrl="https://e621.net" summary="Search Forum Topics" %}
{% swagger-description %}
Some topics may be in specific categories that require certain user levels.

E621 does not provide a form to search topics, so the information here may be inaccurate or incomplete.
{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" type="Number" %}
The ID of the topic to search for.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[title_matches]" type="String" %}
The title of the topic (fuzzy matching).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[title]" type="String" %}
The title of the topic (exact matching).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_locked]" type="Boolean" %}
If the topic is locked.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_sticky]" type="Boolean" %}
If the topic is stickied.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_hidden]" type="Boolean" %}
If the topic is hidden.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[category_id]" type="Number" %}
The ID of the category the topic is in.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" type="String" %}
The order of the returned results. One of: 

`sticky`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" %}
The maximum number of comments to return. Between 20 and 320
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="Number" %}
The page of results to get. Numbered pages are limited to 750. Use a & b prefixes with a comment id for after and before respectively.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success (Results)" %}
```javascript
[
    {
        "id": 0,
        "creator_id": 0,
        "updater_id": 0,
        "title": "content",
        "response_count": 0,
        "is_sticky": false,
        "is_locked": false,
        "is_hidden": false,
        "created_at": "0000-00-00T00:00:00.000-00:00",
        "updated_at": "0000-00-00T00:00:00.000-00:00",
        "category_id": 0
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

{% swagger method="get" path="/forum_topics/:id.json" baseUrl="https://e621.net" summary="Get A Forum Topic" %}
{% swagger-description %}
Some topics may be in specific categories that require certain user levels.
{% endswagger-description %}

{% swagger-response status="200: OK" description="Success" %}
```javascript

{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
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

{% swagger method="post" path="/forum_topics.json" baseUrl="https://e621.net" summary="Create A Forum Topic" %}
{% swagger-description %}
<mark style="color:blue;">Authorization Required</mark>

Some categories may have specific level requirements to create topics.
{% endswagger-description %}

{% swagger-parameter in="body" name="forum_topic[title]" type="String" required="true" %}
The title of the topic.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[category_id]" type="Number" required="true" %}
The ID of the category to put the topic in.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][body]" type="String" %}
The body of the first post in the topic. Mutually exclusive with 

`forum_topic[original_post_attributes][id]`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[original_post_attributes][id]" type="Number" %}
The ID of the post to use as the first post of this topic. Mutually exclusive with 

`forum_topic[original_post_attributes][body]`

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_sticky]" type="Boolean" %}
If the topic is sticky.

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-parameter in="body" name="forum_topic[is_locked]" type="Boolean" %}
If the topic is locked.

<mark style="color:green;">Moderator+ Required</mark>
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Success" %}
```javascript

{
    "id": 0,
    "creator_id": 0,
    "updater_id": 0,
    "title": "content",
    "response_count": 0,
    "is_sticky": false,
    "is_locked": false,
    "is_hidden": false,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "category_id": 0
}
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Account Too New" %}
```javascript
{
        "errors": {
            "original_post.creator": [
                "can not yet perform this action. Account is too new"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Invalid Original Post" %}
```javascript
{
        "errors": {
            "original_post": [
                "is invalid"
            ]
        }
    }
```
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="Restricted Category" %}
```javascript
{
        "errors": {
            "original_post.topic": [
                "is restricted"
            ]
        }
    }
```
{% endswagger-response %}
{% endswagger %}
