# PhoneGap Build REST Client

> RESTful node.js interface to the PhoneGap Build API

## API Example

    // authenticate
    require('phonegap-build-rest-client').auth(username, password, function(e, api) {
        // RESTful access to a resource X
        api.X.[get|post|put|delete](function(e, ...) {

        });
    });

