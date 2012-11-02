var API = require('../lib/api'),
    api,
    token;

describe('API', function() {
    beforeEach(function() {
        token = Math.random().toString();
        api = new API({
            'token': token,
            'domain': 'http://localhost',
            'port': 3000
        });
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

        describe('domain', function() {
            it('should default to http://build.phoengap.com', function() {
                api = new API({ 'token': '123' });
                expect(api.domain).toEqual('http://build.phonegap.com');
            });

            it('should be configurable in constructor', function() {
                api = new API({ 'token': '123', 'domain': 'http://example.com' });
                expect(api.domain).toEqual('http://example.com');
            });
        });

        describe('port', function() {
            it('should default to 80', function() {
                api = new API({ 'token': '123' });
                expect(api.port).toEqual(80);
            });

            it('should be configurable in constructor', function() {
                api = new API({ 'token': '123', 'port': 3000 });
                expect(api.port).toEqual(3000);
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

                it('should return JSON data', function(done) {
                    api('/apps', function(e, data) {
                        expect(data).toEqual(jasmine.any(Object));
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
