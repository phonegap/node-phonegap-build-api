module.exports = {
    query: function(array) {
        var query = array.shift();

        // replace :placeholders with variables
        while(array[0] && typeof array[0] !== 'function') {
            var value = array.shift().toString();
            query = query.replace(/:\w+/, value);
        }

        // normalize query with leading slash
        if (query[0] !== '/') {
            query = '/' + query;
        }

        // normalize query by removing trailing slash
        if (query[query.length-1] === '/') {
            query = query.substring(0, query.length-1);
        }

        return query;
    },

    callback: function(array) {
        var callback = array.pop();

        // create a callback if it is missing
        if (typeof callback !== 'function') {
            array.push(callback);
            callback = function() {};
        }

        return callback;
    }
};
