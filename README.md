# PhoneGap Build REST Client [![Build Status][travis-ci-img]][travis-ci-url]

> Node.js REST interface for the PhoneGap Build API

## API

### Overview

The PhoneGap Build REST Client intends to simplfy authentication and requests
to the [PhoneGap Build REST API][build-api-docs].

The library is a wrapper for [mikeal's][github-mikeal] [request][github-request]
library. The intention is that the PhoneGap Build REST Client should support
all of [requests's][github-request] useful functionality, such as pipes.

### Authentication

    var client = require('phonegap-build-rest-client');

    // Authenticate
    client.auth(username, password, function(e, api) {

        // GET https://build.phonegap.com/api/v1/me
        api.get('/me', function(e, data) {
            console.log(data.username);
        });

    });

### GET Requests

    // GET https://build.phonegap.com/api/v1/apps
    // api(...) defaults to GET

    api('/apps', function(e, data) {
        console.log(data.apps[0].title);
    });

    // GET https://build.phonegap.com/api/v1/apps
    // api.get(...) is a convience function

    api.get('/apps', function(e, data) {
        console.log(data.apps[0].title);
    });

### POST Requests

    // POST https://build.phonegap.com/api/v1/apps

    var options = {
        'data': { 'title': 'My App', 'create_method': 'file' },
        'form': { 'file': '/Users/alunny/app.zip' }
    };

    api.post('POST /apps', options, function(e, data) {
        console.log(data.id);
    });

### PUT Requests

    // PUT https://build.phonegap.com/api/v1/apps/:id

    var options = {
        'form': { 'file': '/Users/alunny/app.zip' }
    };

    api.put('apps/10', options, function(e, data) {
        // app 10 is now rebuilding
    });

### DELETE Requests

    // DELETE https://build.phonegap.com/api/v1/apps/:id

    api.delete('/apps/10', function(e, data) {
        // app 10 is deleted
    });

### Options

    // Set Options

    api.defaults({
        domain: 'http://build.phonegap.com',
        port: 80,
        version: 'v1'
    });

    // Get Options

    api.defaults('domain');
    api.defaults('port');
    api.defaults('version');
    api.defaults('token');

## Other Languages

### Java

- [pgbuild-api][pgbuild-api] by [Hardeep Shoker][github-hardeep]

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/phonegap-build-rest-client.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/phonegap-build-rest-client
[build-api-docs]: https://build.phonegap.com/docs/api
[github-mikeal]: https://github.com/mikeal
[github-request]: https://github.com/mikeal/request
[pgbuild-api]: https://github.com/hardeep/pgbuild-api
[github-hardeep]: https://github.com/hardeep

