# Home

This is documentation for https://e621.net's api, as theirs is pretty bad.\
Their [api documentation](https://e621.net/wiki\_pages/2425) has gotten better, but it's typically hard to read, lacks a lot of endpoints, lacks many parameters which could be useful, and is sometimes even outdated.

This is an effort to make as accurate as possible documentation. If you would like to contribute, you can do so [here](https://github.com/DonovanDMC/E621Documentation).

If you're wondering "How did you get all of this information", I've familiarized myself with e621's code base on a surface level. Not enough to truly dive into it, but enough to be able to read and understand what's happening. I combine that with running my own instance to test various methods to ensure this documentation is as complete as possible.

If you would like to also dive into the hell that is ruby on rails, e621's code is publicly available. [https://github.com/e621ng/e621ng](https://github.com/e621ng/e621ng)

Note: If for some reason you are unable to use HTTP Verbs like PATCH, PUT, DELETE, etc, you can use `_method=METHOD` in a POST body, ex `_method=PATCH`

