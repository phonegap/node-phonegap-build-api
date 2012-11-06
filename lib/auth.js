var request = require('request'),
    Api     = require('./api');

module.exports = function(defaults) {
    var self = this;

    return function(options, callback) {
        options = self.extend(defaults, options);

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
                options.token = json.token;
                options.username = undefined;
                options.password = undefined;
                callback(null, new Api(options));
            }
        });
    };
};

module.exports.prototype = {
    extend: function(defaults, overrides) {
        var result = {},
            key;

        for (key in defaults) {
            result[key] = defaults[key];
        }

        for (key in overrides) {
            result[key] = overrides[key];
        }
        return result;
    }
};
