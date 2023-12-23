# Note Previews

{% swagger method="get" path="/note_previews.json" baseUrl="https://e621.net" summary="Preview Note" %}
{% swagger-description %}
{% endswagger-description %}

{% swagger-parameter in="query" name="body" type="String" required="true" %}
The note body to preview.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
  "body": ""
}
```
{% endswagger-response %}

{% endswagger %}