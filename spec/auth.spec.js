var request = require('request'),
    auth    = require('../lib/auth'),
    defaults = require('../lib/defaults'),
    options;

describe('auth', function() {
    beforeEach(function() {
        options = {
            username: 'zelda',
            password: 'tr1f0rce'
        };
    });

    describe('invalid', function() {
        beforeEach(function() {
            spyOn(request, 'post').andCallFake(function(uri, options, callback) {
                // Invalid username or password response.
                callback({}, { 'statusCode': 401 }, '{"error":"Invalid email or password."}');
            });
        });

        describe('user', function() {
            it('should return an error in the callback', function(done) {
                auth(options, function(e, api) {
                    expect(e).toEqual(jasmine.any(Error));
                    expect(api).toBeNull();
                    done();
                });
            });
        });

        describe('password', function() {
            it('should report an error in the callback', function(done) {
                auth(options, function(e, api) {
                    expect(e).toEqual(jasmine.any(Error));
                    expect(api).toBeNull();
                    done();
                });
            });
        });
    });

    describe('valid', function() {
        beforeEach(function() {
            spyOn(request, 'post').andCallFake(function(uri, options, callback) {
                // Valid auth response.
                callback({}, { 'statusCode': 200 }, '{"token":"Y9nGxwX7QenyuNXSaEnp"}');
            });
        });

        describe('username and password', function() {
            it('should return an API object', function(done) {
                auth(options, function(e, api) {
                    expect(e).toBeNull();
                    expect(api).toEqual(jasmine.any(Function));
                    done();
                });
            });
        });
    });

    describe('options', function() {
        beforeEach(function() {
            spyOn(request, 'post').andCallFake(function(uri, options, callback) {
                // Valid auth response.
                callback({}, { 'statusCode': 200 }, '{"token":"Y9nGxwX7QenyuNXSaEnp"}');
            });
        });

        describe('username', function() {
            it('should be required', function(done) {
                options.username = undefined;
                auth(options, function(e, api) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });

        describe('password', function() {
            it('should be required', function(done) {
                options.password = undefined;
                auth(options, function(e, api) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });
        });
    });
});
