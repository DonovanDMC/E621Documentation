# Popular Posts

{% swagger method="get" path="/popular.json" baseUrl="https://e621.net" summary="List Popular Posts" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="date" type="String" %}
The date to view popular posts for.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="scale" type="String" %}
The time scale. One of: `day`, `week`, `month`
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "posts": {
    "approver_id": null, // user id
    "change_seq": 0,
    "comment_count": 0,
    "created_at": "0000-00-00T00:00:00.000-00:00",
    "description": "",
    "duration": null,
    "fav_count": 0,
    "file": {
      "ext": "png",
      "height": 4000,
      "md5": "dc3a90deef089384f39e45fdaea96e78",
      "size": 3681606,
      "url": "https://static1.e621.net/data/dc/3a/dc3a90deef089384f39e45fdaea96e78.png",
      "width": 4000
    },
    "flags": {
      "pending": false,
      "flagged": false,
      "note_locked": false,
      "status_locked": false,
      "rating_locked": true,
      "deleted": false
    },
    "has_notes": false,
    "id": 3405794,
    "is_favorited": false,
    "locked_tags": [],
    "pools": [], // numeric pool ids
    "preview": { // width/height may not be correct
      "height": 150,
      "url": "https://static1.e621.net/data/preview/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg",
      "width": 150
    },
    "rating": "s",
    "relationships": {
      "children": [], // numeric post ids
      "has_active_children": false,
      "has_children": false,
      "parent_id": null // post id
    },
    "sample": {
      "alternates": {},
      "has": false,
      "height": 850,
      "width": 850,
      "url": "https://static1.e621.net/data/sample/dc/3a/dc3a90deef089384f39e45fdaea96e78.jpg"
    },
    "score": {
      "up": 0,
      "down": 0,
      "total": 0
    },
    "sources": "https://twitter.com/broitsCody/status/1532629699083481088",
    "tags": {
      "general": [],
      "species": [],
      "character": [],
      "artist": [],
      "invalid": [],
      "lore": [],
      "meta": []
    },
    "updated_at": "0000-00-00T00:00:00.000-00:00",
    "uploader_id": 0
  }
}
```
{% endswagger-response %}

{% endswagger %}