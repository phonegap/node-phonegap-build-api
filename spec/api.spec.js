var Api = require('../lib/api'),
    api,
    token;

describe('Api', function() {
    beforeEach(function() {
        token = Math.random().toString();
        api = new Api({ 'token': token });
    });

    describe('token', function() {
        it('should be set with constructor', function() {
            expect(api.token).toEqual(token);
        });

        it('should throw error when missing', function() {
            expect(function() {
                var api = new Api();
            }).toThrow();
        });
    });

    describe('function', function() {
        it('should exist', function() {
            expect(api).toEqual(jasmine.any(Function));
        });
    });
});
