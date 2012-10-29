var build   = require('../lib/main'),
    api     = require('../lib/api'),
    request = require('request'),
    user = 'filmaj@apache.org',
    password = 'apache';

describe('auth', function() {
    describe('incorrect username', function() {
        it('should report an error in the callback', function() {
            var s = jasmine.createSpy();
            runs(function() {
                build.auth('raoul_duke@fearandloathing.com', 'balls', s);
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
            runs(function() {
                build.auth(user, 'balls', s);
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
            runs(function() {
                build.auth(user, password, s);
            });
            waitsFor(function() { return s.wasCalled; }, 'auth callback');
            runs(function() {
                expect(s).toHaveBeenCalledWith(null, jasmine.any(api));
                expect(s.calls[0].args[1].token).not.toBeNull();
            });
        });
    });
});
