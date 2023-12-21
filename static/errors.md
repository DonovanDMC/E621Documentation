# Common Errors

<mark style="color:red;">Note the typical</mark> <mark style="color:red;">`errors`</mark> <mark style="color:red;">key can vary wildly between routes. Some return an array, some return an object with keys referencing what the error is for, others don't return it at all. Assume all routes are inconsistent with each other. Errors can also be combined. For instance,</mark> <mark style="color:red;">`no content`</mark> <mark style="color:red;">errors are typically paired with</mark> <mark style="color:red;">`too short`</mark> <mark style="color:red;">errors.</mark>

<details>

<summary>Access Denied</summary>

Typically shows on this you cannot do, like deleting posts.

{% code title="403 Forbidden" %}
```javascript
{
    "success": false,
    "reason": "Access Denied"
}
```
{% endcode %}

</details>

<details>

<summary>Unpermitted Parameter</summary>

This will show for any parameters you cannot use, including those that do not exist.

Not all routes validate parameters, some ignore them.

{% code title="403 Forbidden" %}
```javascript
{
    "success": false,
    "reason": "found unpermitted parameter: :name"
}
```
{% endcode %}

</details>

<details>

<summary>Numbered Pagination Too High</summary>

Numbered pagination cannot go beyond 750\*, use a/b pagination instead.

\* `/post_versions` has a completely different limit. You can only traverse through the 10,000 most recent entries via numbers (501 when limit=20, 133 when limit=75, 31 when limit=320).&#x20;

{% code title="410 Gone" %}
```javascript
{
    "success": false,
    "message": "You cannot go beyond page 750. Please narrow your search terms.",
    "code": null
}
```
{% endcode %}

</details>

<details>

<summary>Account Too New</summary>

Account must be older than 1 week.

{% code title="422 Unprocessable Entity" %}
```javascript
{
    "errors": {
        // the specific key and wording may vary
        "base": [
            "User can not yet perform this action. Account is too new."
        ]
    }
}
```
{% endcode %}

</details>

<details>

<summary>RateLimited</summary>

{% code title="422 Unprocessable Entity" %}
```javascript
{
    "errors": {
        // specific wording and keys may vary
        "creator": [
            "have reached the hourly limit for this action"
        ]
    }
}
```
{% endcode %}

</details>

<details>

<summary>Banned</summary>

Returned on routes blocked users cannot use.

{% code title="401 Unauthorized" %}
```javascript
{
    "success": false,
    "message": "Account is banned: forever",
    "code": null
}
```
{% endcode %}

</details>
