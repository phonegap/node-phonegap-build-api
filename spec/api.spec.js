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

    describe('request', function() {
        describe('query', function() {
            it('should become fully-qualified', function() {
                var request = api('/apps', jasmine.createSpy());
                expect(request.uri.href).toEqual('http://localhost:3000/apps');
            });

            it('should trim leading slashes', function() {
                var request = api('//apps', jasmine.createSpy());
                expect(request.uri.href).toEqual('http://localhost:3000/apps');
            });

            it('should trim leading whitespace', function() {
                var request = api('  /apps', jasmine.createSpy());
                expect(request.uri.href).toEqual('http://localhost:3000/apps');
            });

            it('should trim trailing slashes', function() {
                var request = api('/apps//', jasmine.createSpy());
                expect(request.uri.href).toEqual('http://localhost:3000/apps');
            });

            it('should trim trailing whitespace', function() {
                var request = api('/apps//', jasmine.createSpy());
                expect(request.uri.href).toEqual('http://localhost:3000/apps');
            });

            it('should do full trim', function() {
                var request = api('  ///apps//  ', jasmine.createSpy());
                expect(request.uri.href).toEqual('http://localhost:3000/apps');
            });

            it('should add leading slash when missing', function() {
                var request = api('apps', jasmine.createSpy());
                expect(request.uri.href).toEqual('http://localhost:3000/apps');
            });
        });

        describe('callback', function() {
            it('should not be required', function() {
                expect(function() { api('/apps'); }).not.toThrow();
            });

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

            describe('failed request', function() {
                it('should return an error', function(done) {
                    api.port = '1983' + Math.floor(Math.random() * 10);
                    api('/apps', function(e, data) {
                        expect(e).toEqual(jasmine.any(Error));
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

    describe('()', function() {
        it('should be a function', function() {
            expect(api).toEqual(jasmine.any(Function));
        });

        it('should be passed to api.request', function() {
            spyOn(api, 'request');
            api('/apps');
            expect(api.request).toHaveBeenCalled();
        });

        it('should be a GET request', function() {
            spyOn(api, 'request');
            api('/apps');
            expect(api.request.mostRecentCall.args[1].method).toEqual('GET');
        });
    });

    describe('put', function() {
        it('should be a function', function() {
            expect(api.put).toEqual(jasmine.any(Function));
        });

        it('should be passed to api.request', function() {
            spyOn(api, 'request');
            api.put('/apps');
            expect(api.request).toHaveBeenCalled();
        });

        it('should be a PUT request', function() {
            spyOn(api, 'request');
            api.put('/apps');
            expect(api.request.mostRecentCall.args[1].method).toEqual('PUT');
        });
    });

});
