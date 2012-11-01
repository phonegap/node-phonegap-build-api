var parse = require('./parse');

module.exports = function(data) {
    this.token = data.token;
};

module.exports.prototype = {
    get: function() {
        query = parse.query(arguments);
        callback = parse.callback(arguments);
    },
    post: function() {
        query = parse.query(arguments);
        callback = parse.callback(arguments);
    },
    put: function() {
        query = parse.query(arguments);
        callback = parse.callback(arguments);
    },
    del: function() {
        query = parse.query(arguments);
        callback = parse.callback(arguments);
    }
};

