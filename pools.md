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
The maximum number of pools to return. Between 20 and 320
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" %}
The page of results to get. Numbered pages are limited to 750. Use a & b prefixes with a pool id for after and before respectively.
{% endswagger-parameter %}
{% endswagger %}
