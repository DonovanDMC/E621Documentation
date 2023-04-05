# Random Notes

We show `application/x-www-form-urlencoded` as this is what the site itself uses, but most POST endpoints will accept a JSON body. To use the json body, simply remove the property wrapper (e.g. in [Create A Comment](../comments/#create-a-comment), `comment[body]` -> `body` when using JSON)
