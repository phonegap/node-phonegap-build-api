var Authenticate = require('./auth');
var defaults = require('./defaults');

module.exports = {
    auth: new Authenticate(defaults)
};
