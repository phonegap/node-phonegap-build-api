var request = require('request');
var parse = require('./parse');

module.exports = function(data) {
    var api = function(query, callback) {
        return request(query, function(e, res, body) {
            callback();
        });
    };

    api.token = data.token;

    return api;
};

module.exports.prototype = {
};

