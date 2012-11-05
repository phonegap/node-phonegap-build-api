var request = require('request'),
    Api     = require('./api');

module.exports = function(options, callback) {
    var s = options.username + ':' + options.password;
    var b = new Buffer(s).toString('base64');
    var header = 'Basic ' + b;
    request.post({
        uri:'https://build.phonegap.com/token',
        headers:{
            'Authorization':header
        }
    }, function(err, response, body) {
        var json = JSON.parse(body);
        if (response.statusCode != 200) {
            callback(json, null);
        } else {
            callback(null, new Api(json));
        }
    });
};
