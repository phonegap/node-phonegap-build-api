var request = require('request'),
    api     = require('./api');

module.exports = {
    auth:function(username, password, callback) {
        var s = username + ':' + password;
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
                callback(null, new api(json));
            }
        });
    }
}
