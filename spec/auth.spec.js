var build   = require('../lib/phonegap-build-rest-client'),
    request = require('request'),
    user = 'filmaj@apache.org',
    password = 'apache';

describe('auth', function() {
    describe('failure', function() {
        it('should report an error in the callback if an incorrect username is used', function() {
            var s = jasmine.createSpy();
            runs(function() {
                build.auth('raoul_duke@fearandloathing.com', 'balls', s);
            });
            waitsFor(function() { return s.wasCalled; }, 'auth callback');
            runs(function() {
                expect(s).toHaveBeenCalledWith(jasmine.any(Object), null);
            });
        });
        it('should report an error in the callback if an incorrect password is used', function() {
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

    describe('success', function() {
        it('should return an api object with a token if a correct username and password is used', function() {
            var s = jasmine.createSpy();
            runs(function() {
                build.auth(user, password, s);
            });
            waitsFor(function() { return s.wasCalled; }, 'auth callback');
            runs(function() {
                expect(s).toHaveBeenCalledWith(null, jasmine.any(Object));
            });
        });
    });
});
