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
    },
    put: function() {
    },
    del: function() {
    }
};

