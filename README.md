# phonegap-build-rest-js [![Build Status][travis-ci-img]][travis-ci-url]

> Node.js REST Client for the PhoneGap Build API

## Overview

This library simplfies authentication and requests to the
[PhoneGap Build REST API][build-api-docs] for node.js clients.

In many ways, this library is little more than a convenience wrapper
for [mikeal's][github-mikeal] [request][github-request] library. You can expect
that all of [request's][github-request] functionality to be available to the
`API` object returned by `client.auth();`.

If something is inaccurate or missing, please send a pull request!

## Usage

### Authentication

    var client = require('phonegap-build-rest');

    client.auth({ username: 'zelda', password: 'tr1f0rce' }, function(e, api) {
        // time to make requests
    });

### GET https://build.phonegap.com/api/v1/me

    api.get('/me', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### GET https://build.phonegap.com/api/v1/apps

    api.get('/apps', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### GET https://build.phonegap.com/api/v1/apps/:id

    api.get('/apps/199692', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### GET https://build.phonegap.com/api/v1/apps/:id/icon

    api.get('/apps/199692/icon').pipe(fs.createWriteStream('icon.png'));

### GET https://build.phonegap.com/api/v1/apps/:id/:platform

    api.get('/apps/199692/android').pipe(fs.createWriteStream('app.apk'));

### GET https://build.phonegap.com/api/v1/keys

    api.get('/keys', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### GET https://build.phonegap.com/api/v1/keys/:platform

    api.get('/keys/ios', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### GET https://build.phonegap.com/api/v1/keys/:platform/:id

    api.get('/keys/ios/917', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### POST https://build.phonegap.com/api/v1/apps

    var options = {
        form: {
            data: {
                title: 'My App',
                create_method: 'file'
            },
            file: '/path/to/app.zip'
        }
    };

    api.post('/apps', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### PUT https://build.phonegap.com/api/v1/apps/:id

    var options = {
        form: {
            data: {
                debug: false
            },
            file: '/path/to/app.zip'
        }
    };

    api.put('/apps/197196', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### POST https://build.phonegap.com/api/v1/apps/:id/icon

    var options = {
        form: {
            icon: 'my-icon.png'
        }
    };

    api.post('/apps/232741/icon', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### POST https://build.phonegap.com/api/v1/apps/:id/build

Build all platforms:

    api.post('/apps/232741/build', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });
 
Build specific platforms:

    var options = {
        form: {
            data: {
                platforms: [ 'android', 'blackberry', 'ios', 'winphone', 'webos' ]
            }
        }
    };

    api.post('/apps/232741/build', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### POST https://build.phonegap.com/api/v1/apps/:id/build/:platform

    api.post('/apps/232741/build/android', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### POST https://build.phonegap.com/api/v1/apps/:id/collaborators

    var options = {
        form: {
            data: {
                email: 'michael@michaelbrooks.ca',
                role: 'dev'
            }
        }
    };

    api.post('/apps/232741/collaborators', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### PUT https://build.phonegap.com/api/v1/apps/:id/collaborators/:id

    var options = {
        form: {
            data: {
                role: 'tester'
            }
        }
    };

    api.put('/apps/232741/collaborators/263955', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### POST https://build.phonegap.com/api/v1/keys/:platform

    var options = {
        form: {
            data: {
                title: 'My BlackBerry Signing Key',
                password: 'my-password'
            },
            db: '/path/to/sigtool.db',
            csk: '/path/to/sigtool.csk'
        }
    };

    api.post('/keys/blackberry', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### PUT https://build.phonegap.com/api/v1/keys/:platform/:id

    var options = {
        form: {
            data: {
                password: 'my-updated-password'
            }
        }
    };

    api.put('/keys/blackberry/1505', options, function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### DELETE https://build.phonegap.com/api/v1/apps/:id

    api.del('/apps/14450', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### DELETE https://build.phonegap.com/api/v1/apps/:id/collaborators/:id

    api.del('/apps/232741/collaborators/263955', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

### DELETE https://build.phonegap.com/api/v1/keys/:platform/:id

    api.del('/keys/ios/2729', function(e, data) {
        console.log('error:', e);
        console.log('data:', data);
    });

## Alternative Libraries

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

