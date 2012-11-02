var request = require('request');
var parse = require('./parse');

module.exports = function(data) {
    var api = function(query, callback) {
        query = api.domain + ':' + api.port + query;

        return request(query, function(e, res, body) {
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

    api.token = data.token;
    api.domain = data.domain || 'http://build.phonegap.com';
    api.port = data.port || 80;

    return api;
};

module.exports.prototype = {
};
