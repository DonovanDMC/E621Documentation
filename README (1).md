# Common Errors

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

