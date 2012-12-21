var request = require('./request');
var Arguments = require('./arguments');

module.exports = function(options) {
    // require options argument
    if (!options) throw new Error('missing options argument');
    if (!options.token) throw new Error('missing options.token argument');
    if (!options.protocol) throw new Error('missing options.protocol argument');
    if (!options.host) throw new Error('missing options.host argument');
    if (!options.port) throw new Error('missing options.port argument');
    if (!options.path) throw new Error('missing options.path argument');

    /**
     * API Request to PhoneGap Build.
     *
     * Sends an HTTP request to the PhoneGap Build API.
     * The `path` provided is prefixed with the fully-qualified
     * PhoneGap Build URL.
     * By default, the request method is `GET` but can be changed
     * in the `options` parameters (e.g. `{ method: 'POST' }`).
     *
     * Options:
     *
     *   - `path` {String} is a resource path (e.g. `"/apps"`).
     *   - `options` {Object} is a request options object.
     *   - `[callback]` {Function} is trigger after the request
     *     - `e` {Error} is null unless there is an error
     *     - `data` {Object} is the JSON response.
     */

    var api = function(path, options, callback) {
        var args = new Arguments(path, options, callback);
        args.options.method = args.options.method || 'GET';
        return api.request(args.path, args.options, args.callback);
    };

    api.request = function(path, options, callback) {
        // require arguments
        if (!path) throw new Error('missing path argument');
        if (!options) throw new Error('missing options argument');

        // optional arguments
        callback = callback || function() {};

        var args = new Arguments(path, callback);
        var uri = api.protocol + '//' +
                  api.host + ':' +
                  api.port +
                  api.path +
                  args.path + '?auth_token=' + api.token;

        return request.send(uri, options, function(e, res, body) {
            if (e) {
                // error in request
                args.callback(e);
            }
            else if (res.statusCode !== 200) {
                // eror in response
                args.callback(new Error(body));
            }
            else {
                body = JSON.parse(body);

                if (body.error) {
                    // api response includes an error
                    args.callback(new Error(body.error));
                }
                else {
                    // api response is successful
                    args.callback(null, body);
                }
            }
        });
    };

    api.get = function(path, options, callback) {
        var args = new Arguments(path, options, callback);
        args.options.method = 'GET';
        return api.request(args.path, args.options, args.callback);
    };

    api.post = function(path, options, callback) {
        var args = new Arguments(path, options, callback);
        args.options.method = 'POST';
        return api.request(args.path, args.options, args.callback);
    };

    api.put = function(path, options, callback) {
        var args = new Arguments(path, options, callback);
        args.options.method = 'PUT';
        return api.request(args.path, args.options, args.callback);
    };

    api.del = function(path, options, callback) {
        var args = new Arguments(path, options, callback);
        args.options.method = 'DELETE';
        return api.request(args.path, args.options, args.callback);
    };

    api.defaults = function(options, requester) {
        return request.defaults(options, requester);
    };

    api.token = options.token;
    api.protocol = options.protocol;
    api.host = options.host;
    api.port = options.port;
    api.path = options.path;
    api.defaults.version = options.version;

    return api;
};

module.exports.prototype = {
};
