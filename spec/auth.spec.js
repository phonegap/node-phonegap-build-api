var api      = require('../lib/client'),
    Api      = require('../lib/api'),
    request  = require('request'),
    username = 'filmaj@apache.org', // real username for PhoneGap Build
    password = 'apache';            // real password for PhoneGap Build

describe('auth', function() {
    describe('incorrect username', function() {
        it('should report an error in the callback', function() {
            var s = jasmine.createSpy();
            spyOn(request, 'post').andCallFake(function(options, callback) {
                callback({}, { 'statusCode': 404 }, '{}');
            });

            runs(function() {
                api.auth('raoul_duke@fearandloathing.com', 'balls', s);
            });
            waitsFor(function() { return s.wasCalled; }, 'auth callback');
            runs(function() {
                expect(s).toHaveBeenCalledWith(jasmine.any(Object), null);
            });
        });
    });

    describe('incorrect password', function() {
        it('should report an error in the callback', function() {
            var s = jasmine.createSpy();
            spyOn(request, 'post').andCallFake(function(options, callback) {
                callback({}, { 'statusCode': 404 }, '{}');
            });

            runs(function() {
                api.auth(username, 'balls', s);
            });
            waitsFor(function() { return s.wasCalled; }, 'auth callback');
            runs(function() {
                expect(s).toHaveBeenCalledWith(jasmine.any(Object), null);
            });
        });
    });

    describe('correct username and password', function() {
        it('should return an API object with a token', function() {
            var s = jasmine.createSpy();
            spyOn(request, 'post').andCallFake(function(options, callback) {
                callback({}, { 'statusCode': 200 }, '{}');
            });

            runs(function() {
                api.auth(username, password, s);
            });
            waitsFor(function() { return s.wasCalled; }, 'auth callback');
            runs(function() {
                expect(s).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(s.calls[0].args[1].token).not.toBeNull();
            });
        });
    });
});
