# Comment Votes

{% swagger method="post" path="/comment_votes/lock.json" baseUrl="https://e621.net" summary="Lock Comment Votes" %}
{% swagger-description %}
<mark style="color:blue;">Requires Authentication</mark>

<mark style="color:red;">Requires Moderator+</mark>

Does not return an error even if an invalid comment vote id is provided.

Votes cannot be unlocked, they must be deleted.

This operation is idempotent.
{% endswagger-description %}

{% swagger-parameter in="body" name="ids" type="String" required="true" %}
Comma separated list of comments to lock votes.
{% endswagger-parameter %}

{% swagger-response status="204: No Content" description="Success" %}

{% endswagger-response %}
{% endswagger %}
