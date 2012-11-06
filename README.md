# phonegap-build-rest-js [![Build Status][travis-ci-img]][travis-ci-url]

> Node.js REST Client for the PhoneGap Build API

## Overview

The intention is to simplfy authentication and requests to the
[PhoneGap Build REST API][build-api-docs] for node.js clients.

In many ways, this library is little more than a convenience wrapper
for [mikeal's][github-mikeal] [request][github-request] library. You can expect
that all of [request's][github-request] functionality to be available to the
`API` object returned by `client.auth();`.

## API

### Authentication

    var client = require('phonegap-build-rest');

    // Authenticate
    client.auth({ username: 'zelda', password: 'tr1f0rce' }, function(e, api) {

        // GET https://build.phonegap.com/api/v1/me
        api.get('/me', function(e, data) {
            console.log(data.username);
        });

    });

#### Authentication Options

    var client = require('phonegap-build-rest');

    var options = {
        username: 'zelda',               // Required
        password: 'tr1f0rce',            // Required
        protocol: 'https:',              // Optional
        host:     'build.phonegap.com',  // Optional
        port:     80,                    // Optional
        path:     '/api/v1'              // Optional
    };

    client.auth(options, function(e, api) {
        // ...
    });


### GET Requests


    // GET https://build.phonegap.com/api/v1/apps

    api.get('/apps', function(e, data) {
        console.log(data.apps[0].title);
    });

or use the short-hand syntax:

    // GET https://build.phonegap.com/api/v1/apps

    api('/apps', function(e, data) {
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

## Alternative Implementations

### Java

- [pgbuild-api][pgbuild-api] by [Hardeep Shoker][github-hardeep]

### Node.js

- [phonegapbuildapi][github-phonegapbuildapi] by [germallon][github-germallon]

[travis-ci-img]: https://secure.travis-ci.org/mwbrooks/phonegap-build-rest-js.png
[travis-ci-url]: http://travis-ci.org/mwbrooks/phonegap-build-rest-js
[build-api-docs]: https://build.phonegap.com/docs/api
[github-mikeal]: https://github.com/mikeal
[github-request]: https://github.com/mikeal/request
[pgbuild-api]: https://github.com/hardeep/pgbuild-api
[github-hardeep]: https://github.com/hardeep
[github-phonegapbuildapi]: https://github.com/germallon/phonegapbuildapi
[github-germallon]: https://github.com/germallon

