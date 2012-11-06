var API = require('../lib/api'),
    api,
    options,
    token;

describe('API', function() {
    beforeEach(function() {
        options = {
            'token': Math.random().toString(),
            'protocol': 'http:',
            'host': 'localhost',
            'port': 3000,
            'path': '/api/v1'
        };
        api = new API(options);
    });

    describe('defaults', function() {
        describe('token', function() {
            it('should throw when missing', function() {
                options.token = undefined;
                expect(function() { new API(options); }).toThrow();
            });
        });

        describe('protocol', function() {
            it('should throw when missing', function() {
                options.protocol = undefined;
                expect(function() { new API(options); }).toThrow();
            });
        });

        describe('host', function() {
            it('should throw when missing', function() {
                options.host = undefined;
                expect(function() { new API(options); }).toThrow();
            });
        });

        describe('port', function() {
            it('should throw when missing', function() {
                options.port = undefined;
                expect(function() { new API(options); }).toThrow();
            });
        });

        describe('path', function() {
            it('should throw when missing', function() {
                options.path = undefined;
                expect(function() { new API(options); }).toThrow();
            });
        });
    });

    describe('request', function() {
        describe('query', function() {
            it('should become fully-qualified', function() {
                var request = api('/apps', jasmine.createSpy());
                expect(request.uri.href).toMatch('^http://localhost:3000/api/v1/apps');
            });

            it('should be trimmed', function() {
                var request = api('  ///apps//  ', jasmine.createSpy());
                expect(request.uri.href).toMatch('^http://localhost:3000/api/v1/apps');
            });

            it('should include auth_token query string', function() {
                var request = api('  ///apps//  ', jasmine.createSpy());
                var query = 'http://localhost:3000/api/v1/apps?auth_token=' + options.token;
                expect(request.uri.href).toEqual(query);
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
            var request = api('/apps');
            expect(request.method).toEqual('GET');
        });
    });

    describe('get', function() {
        it('should be a function', function() {
            expect(api.get).toEqual(jasmine.any(Function));
        });

        it('should be passed to api.request', function() {
            spyOn(api, 'request');
            api.get('/apps');
            expect(api.request).toHaveBeenCalled();
        });

        it('should be a GET request', function() {
            var request = api.get('/apps');
            expect(request.method).toEqual('GET');
        });
    });

    describe('post', function() {
        it('should be a function', function() {
            expect(api.post).toEqual(jasmine.any(Function));
        });

        it('should be passed to api.request', function() {
            spyOn(api, 'request');
            api.post('/apps');
            expect(api.request).toHaveBeenCalled();
        });

        it('should be a POST request', function() {
            var request = api.post('/apps');
            expect(request.method).toEqual('POST');
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
            var request = api.put('/apps');
            expect(request.method).toEqual('PUT');
        });
    });

    describe('del', function() {
        it('should be a function', function() {
            expect(api.del).toEqual(jasmine.any(Function));
        });

        it('should be passed to api.request', function() {
            spyOn(api, 'request');
            api.del('/apps');
            expect(api.request).toHaveBeenCalled();
        });

        it('should be a DELETE request', function() {
            var request = api.del('/apps');
            expect(request.method).toEqual('DELETE');
        });
    });

    describe('pipe', function() {
        it('should be available', function() {
            var spy = jasmine.createSpy();
            expect(api('/apps').pipe).toEqual(jasmine.any(Function));
        });
    });

    describe('defaults', function() {
        it('should map to request.defaults', function() {
            var request = require('request');
            spyOn(request, 'defaults');
            api.defaults();
            expect(request.defaults).toHaveBeenCalled();
        });
    });
});
