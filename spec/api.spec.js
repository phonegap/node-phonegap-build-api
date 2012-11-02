var API = require('../lib/api'),
    api,
    token;

describe('API', function() {
    beforeEach(function() {
        token = Math.random().toString();
        api = new API({ 'token': token });
    });

    describe('property', function() {
        describe('token', function() {
            it('should be set by constructor', function() {
                expect(api.token).toEqual(token);
            });

            it('should throw error when missing', function() {
                expect(function() { api = new API(); }).toThrow();
            });
        });
    });

    describe('interface', function() {
        it('should be a function', function() {
            expect(api).toEqual(jasmine.any(Function));
        });

        describe('callback', function() {
            describe('successful request', function() {
                it('should not return an error', function(done) {
                    api('/apps', function(e, data) {
                        expect(e).toBeNull();
                        done();
                    });
                });
            });
        });
    });

    describe('streaming', function() {
        it('should support pipe', function(done) {
            var spy = jasmine.createSpy();
            spy.andCallFake(done);
            expect(api('/apps', spy).pipe).toEqual(jasmine.any(Function));
        });
    });
});
