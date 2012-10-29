var request = require('request');

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
            if (response.statusCode != 200) {
                callback(JSON.parse(body), null);
            } else {
                callback(null, {});
            }
        });
    }
}
