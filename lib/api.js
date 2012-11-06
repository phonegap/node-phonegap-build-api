var request = require('request');
var Arguments = require('./arguments');

module.exports = function(options) {
    var api = function(path, callback) {
        return api.request(path, { method: 'GET' }, callback);
    };

    api.request = function(path, options, callback) {
        var args = new Arguments(path, callback);
        var uri = api.protocol + '//' + api.host + ':' + api.port + api.path + args.path + '?auth_token=' + api.token;

        return request(uri, options, function(e, res, body) {
            if (e) {
                args.callback(e, null);
            }
            else if (res.statusCode !== 200) {
                args.callback(new Error(body), null);
            }
            else {
                args.callback(null, JSON.parse(body));
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

    api.token = options.token;
    api.protocol = options.protocol;
    api.host = options.host;
    api.port = options.port;
    api.path = options.path;
    api.defaults.version = options.version;

    if (!api.token) throw new Error('Missing the required option: token');
    if (!api.protocol) throw new Error('Missing the required option: protocol');
    if (!api.host) throw new Error('Missing the required option: host');
    if (!api.port) throw new Error('Missing the required option: port');
    if (!api.path) throw new Error('Missing the required option: path');

    return api;
};

module.exports.prototype = {
};
