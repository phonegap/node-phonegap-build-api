var request = require('request'),
    Api     = require('./api');

module.exports = function(options, callback) {
    if (!options.username) {
        callback(new Error('Username was not provided.'), null);
        return;
    }

    if (!options.password) {
        callback(new Error('Password was not provided.'));
        return;
    }

    var s = options.username + ':' + options.password;
    var b = new Buffer(s).toString('base64');
    var header = 'Basic ' + b;
    request.post({
        uri:'https://build.phonegap.com/token',
        headers:{
            'Authorization':header
        }
    }, function(err, response, body) {
        if (response.statusCode != 200) {
            callback(new Error(body), null);
        } else {
            var json = JSON.parse(body);
            callback(null, new Api(json));
        }
    });
};
