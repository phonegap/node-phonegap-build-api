var client   = require('../lib/client'),
    API      = require('../lib/api'),
    request  = require('request'),
    options;

describe('auth', function() {
    beforeEach(function() {
        options = {
            username: 'zelda',
            password: 'tr1f0rce'
        };
    });

    describe('incorrect username', function() {
        it('should return an error in the callback', function(done) {
            // Mock invalid username response
            spyOn(request, 'post').andCallFake(function(options, callback) {
                callback({}, { 'statusCode': 401 }, '{"error":"Invalid email or password."}');
            });

            client.auth(options, function(e, data) {
                expect(e).toEqual(jasmine.any(Object));
                expect(data).toBeNull();
                done();
            });
        });
    });

    describe('incorrect password', function() {
        it('should report an error in the callback', function(done) {
            // Mock invalid password response
            spyOn(request, 'post').andCallFake(function(options, callback) {
                callback({}, { 'statusCode': 401 }, '{"error":"Invalid email or password."}');
            });

            client.auth(options, function(e, data) {
                expect(e).toEqual(jasmine.any(Object));
                expect(data).toBeNull();
                done();
            });
        });
    });

    describe('correct username and password', function() {
        it('should return an API object with a token', function() {
            // Mock valid auth response
            spyOn(request, 'post').andCallFake(function(options, callback) {
                callback({}, { 'statusCode': 200 }, '{"token":"Y9nGxwX7QenyuNXSaEnp"}');
            });

            client.auth(options, function(e, data) {
                expect(e).toBeNull();
                expect(data).toEqual(jasmine.any(Function));
            });
        });
    });
});
