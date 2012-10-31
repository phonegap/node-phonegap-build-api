var Api = require('../lib/api');

describe('Api', function() {
    describe('token', function() {
        it('should be set with constructor', function() {
            var token = Math.random().toString();
            var api = new Api({ 'token': token });
            expect(api.token).toEqual(token);
        });

        it('should throw error when missing', function() {
            expect(function() {
                var api = new Api();
            }).toThrow();
        });
    });
});
