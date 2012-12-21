var request = require('./request');
var Arguments = require('./arguments');

module.exports = function(options) {
    var api = function(path, callback) {
        return api.request(path, { method: 'GET' }, callback);
    };

    api.request = function(path, options, callback) {
        // require arguments
        if (!path) throw new Error('missing path argument');
        if (!callback) throw new Error('missing callback argument');

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

    api.get = function(path, callback) {
        return api.request(path, { method: 'GET' }, callback);
    };

    api.post= function(path, callback) {
        return api.request(path, { method: 'POST' }, callback);
    };

    api.put = function(path, callback) {
        return api.request(path, { method: 'PUT' }, callback);
    };

    api.del = function(path, callback) {
        return api.request(path, { method: 'DELETE' }, callback);
    };

    api.defaults = function(options, requester) {
        return request.defaults(options, requester);
    };

    // require options argument
    if (!options) throw new Error('missing options argument');
    if (!options.token) throw new Error('missing options.token argument');
    if (!options.protocol) throw new Error('missing options.protocol argument');
    if (!options.host) throw new Error('missing options.host argument');
    if (!options.port) throw new Error('missing options.port argument');
    if (!options.path) throw new Error('missing options.path argument');

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
