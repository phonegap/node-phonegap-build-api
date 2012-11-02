# PhoneGap Build REST Client [![Build Status][travis-ci-img]][travis-ci-url]


> RESTful node.js interface to the PhoneGap Build API

## API Example

    // Authenticate
    require('phonegap-build-rest-client').auth(username, password, function(e, api) {

        // Default is GET request

        api('/apps/10/icon', function(e, data) {
            console.log(data.location);
        });

        // GET request

        api.get('/apps/10/icon', function(e, data) {
            console.log(data.location);
        });

    });

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/phonegap-build-rest-client.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/phonegap-build-rest-client

