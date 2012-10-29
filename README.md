# PhoneGap Build REST Client [![Build Status][travis-ci-img]][travis-ci-url]


> RESTful node.js interface to the PhoneGap Build API

## API Example

    // authenticate
    require('phonegap-build-rest-client').auth(username, password, function(e, api) {
        // RESTful access to a resource X
        api.X.[get|post|put|delete](function(e, ...) {

        });
    });

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/phonegap-build-rest-client.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/phonegap-build-rest-client

