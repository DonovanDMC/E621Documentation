# Pools

{% swagger method="get" path="/pools.json" baseUrl="https://e621.met" summary="Search For Pools" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="search[id]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[name_matches]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[description_matches]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_name]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[creator_id]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[is_active]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[category]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="search[order]" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" %}
See 

[Search Parameters: limit](readme-1/search-parameters.md#limit)


{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" %}
See 

[Search Parameters: page](readme-1/search-parameters.md#page)


{% endswagger-parameter %}
{% endswagger %}
