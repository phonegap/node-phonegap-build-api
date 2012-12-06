var request = require('request'),
    defaults = require('./defaults'),
    API = require('./api');

module.exports = function(options, callback) {
    options = extend(defaults, options);

    if (!options.username || !options.password) {
        return callback(new Error('Missing username or password.'), null);
    }

    // URL for token authorization
    var uri = options.protocol + '//' + options.host + ':' + options.port + '/token';

    // Post header
    var opts = {
        headers: {
            'Authorization': headers.auth(options.username, options.password)
        }
    };

    request.post(uri, opts, function(err, response, body) {
        if (response.statusCode != 200) {
            callback(new Error(body), null);
        } else {
            var json = JSON.parse(body);
            options.token = json.token;
            options.username = undefined;
            options.password = undefined;
            callback(null, new API(options));
        }
    });
};

var headers = {
    // Header for basic authorization
    auth: function(username, password) {
        var string = username + ':' + password;
        var buffer = new Buffer(string).toString('base64');
        return 'Basic ' + buffer;
    }
};

var extend = function(defaults, overrides) {
    var result = {},
        key;

    for (key in defaults) {
        result[key] = defaults[key];
    }

    for (key in overrides) {
        result[key] = overrides[key];
    }
    return result;
};
