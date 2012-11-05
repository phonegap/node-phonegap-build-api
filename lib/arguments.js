module.exports = function() {
    var args = Array.prototype.slice.call(arguments);
    var output = {};

    // callback function is optional
    if (typeof args[args.length - 1] !== 'function') {
        args.push(function() {});
    }

    // get everything except the :placeholder variables
    output.path = args.shift();
    output.callback = args.pop();

    // path is required
    if (typeof output.path !== 'string') {
        throw new Error('Path is missing');
    }

    // replace :placeholders with variables
    while(args[0] && typeof args[0] !== 'function') {
        var value = args.shift().toString();
        output.path = output.path.replace(/:\w+/, value);
    }

    // trim whitespace and slashes
    output.path = '/' + output.path.replace(/^[\/ ]*/, '').replace(/[\/ ]*$/, '');

    return output;
};

module.exports.prototype = {
};
