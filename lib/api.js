var request = require('request');
var normalize = require('./normalize');

module.exports = function(data) {
    var api = function(path, callback) {
        return api.request(path, {}, callback);
    };

    api.request = function(path, options, callback) {
        var uri = normalize.uri({
            'host': api.domain,
            'port': api.port,
            'path': path
        });

        callback = normalize.fn(callback);

        return request(uri, function(e, res, body) {
            if (e) {
                callback(e, null);
            }
            else if (res.statusCode !== 200) {
                callback(new Error(body), null);
            }
            else {
                callback(null, JSON.parse(body));
            }
        });
    };

    api.put = function(path, callback) {
        return api.request(path, { method: 'PUT' }, callback);
    };

    api.token = data.token;
    api.domain = data.domain || 'http://build.phonegap.com';
    api.port = data.port || 80;

    return api;
};

module.exports.prototype = {
};
