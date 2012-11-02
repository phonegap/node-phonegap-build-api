var request = require('request');
var parse = require('./parse');

module.exports = function(data) {
    var api = function(query, callback) {
        query = 'http://localhost:3000' + query;
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

    return api;
};

module.exports.prototype = {
};
