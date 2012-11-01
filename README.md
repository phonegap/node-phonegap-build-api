# PhoneGap Build REST Client [![Build Status][travis-ci-img]][travis-ci-url]


> RESTful node.js interface to the PhoneGap Build API

## API Example

    // Authenticate
    require('phonegap-build-rest-client').auth(username, password, function(e, api) {

        // RESTful access to a resource

        api('GET /apps/10/icon', function(e, data) {
            console.log(data.location);
        });

        // Easier variables that remain readable

        api('GET /apps/:id/icon', 10, function(e, data) {
            console.log(data.location);
        });

    });

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/phonegap-build-rest-client.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/phonegap-build-rest-client

