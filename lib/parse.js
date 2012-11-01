module.exports = {
    query: function(array) {
        var query = array.shift();

        while(typeof array[0] !== 'function') {
            var value = array.shift().toString();
            query = query.replace(/:\w+/, value);
        }

        return query;
    }
};
