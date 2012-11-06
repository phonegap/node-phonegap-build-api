var request = require('request');
var Arguments = require('./arguments');

module.exports = function(options) {
    var api = function(path, callback) {
        return api.request(path, { method: 'GET' }, callback);
    };

    api.request = function(path, options, callback) {
        var args = new Arguments(path, callback);
        var uri = api.domain + ':' + api.port + args.path;

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
    api.domain = options.domain || 'http://build.phonegap.com';
    api.port = options.port || 80;
    api.defaults.version = options.version;

    return api;
};

module.exports.prototype = {
};
