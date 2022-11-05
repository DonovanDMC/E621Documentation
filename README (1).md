# Common Errors

<mark style="color:red;">Note the typical</mark> <mark style="color:red;">`errors`</mark> <mark style="color:red;">key can vary wildly between routes. Some return an array, some return an object with keys referencing what the error is for, others don't return at all. Assume all routes are inconsistent with each other. Errors can also be combined. For instance,</mark> <mark style="color:red;">`no content`</mark> <mark style="color:red;">errors are typically paired with</mark> <mark style="color:red;">`too short`</mark> <mark style="color:red;">errors.</mark>

```javascript
// 403 Forbidden - Access Denied
// Typically shows on this you cannot do, like deleting posts.
{
    "success": false,
    "reason": "Access Denied"
}
```

```javascript
// 403 Forbidden - Unpermitted Parameter
// This will show for any parameters you cannot use, including those that do not exist.
// Not all routes validate parameters, some ignore unpermitted parameters.
{
    "success": false,
    "reason": "found unpermitted parameter: :name"
}
```

```javascript
// 410 Gone - Page Beyond 750
// use a & b pagination
{
    "success": false,
    "message": "You cannot go beyond page 750. Please narrow your search terms.",
    "code": null
}
```

```javascript
// 422 Unprocessible Entity - Account Too New
// Account must be older than 1 week.
{
    "errors": {
        "base": [
            "User can not yet perform this action. Account is too new."
        ]
    }
}
```

```javascript
// 422 Unprocessible Entity - RateLimited
{
    "errors": {
        "creator": [
            "have reached the hourly limit for this action"
        ]
    }
}
```

```
// 401 Unauthorized
// returned on routes blocked users cannot use
{
    "success": false,
    "message": "Account is banned: forever",
    "code": null
}
```
