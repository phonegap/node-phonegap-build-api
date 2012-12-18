var request = require('request'),
    api = require('../lib/client');

describe('client', function() {
    beforeEach(function() {
        spyOn(request, 'post').andCallFake(function(uri, options, callback) {
            callback({}, { 'statusCode': 200 }, '{"token":"Y9nGxwX7QenyuNXSaEnp"}');
        });
    });

    describe('auth', function() {
        it('should exist', function() {
            expect(api.auth).toEqual(jasmine.any(Function));
        });

        it('should return an API object', function(done) {
            api.auth({ username:'link', password:'triforce' }, function(e, api) {
                expect(e).toBeNull();
                expect(api).toEqual(jasmine.any(Function));
                done();
            });
        });
    });

    describe('API', function() {
        it('should exist', function() {
            expect(api.API).toEqual(jasmine.any(Function));
        });
    });
});
