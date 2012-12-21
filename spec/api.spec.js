var API = require('../lib/api'),
    request = require('../lib/request'),
    options,
    api;

describe('new API', function() {
    beforeEach(function() {
        options = {
            'token': Math.random().toString(),
            'protocol': 'https:',
            'host': 'build.phonegap.com',
            'port': 443,
            'path': '/api/v1'
        };
    });

    it('should require options argument', function() {
        expect(function() {
            options = undefined;
            api = new API(options);
        }).toThrow();
    });

    it('should require options.token argument', function() {
        expect(function() {
            options.token = undefined;
            api = new API(options);
        }).toThrow();
    });

    it('should require options.protocol argument', function() {
        expect(function() {
            options.protocol = undefined;
            api = new API(options);
        }).toThrow();
    });

    it('should require options.host argument', function() {
        expect(function() {
            options.host = undefined;
            api = new API(options);
        }).toThrow();
    });

    it('should require options.port argument', function() {
        expect(function() {
            options.port = undefined;
            api = new API(options);
        }).toThrow();
    });

    it('should require options.path argument', function() {
        expect(function() {
            options.path = undefined;
            api = new API(options);
        }).toThrow();
    });

    it('should create a function', function() {
        api = new API(options);
        expect(api).toEqual(jasmine.any(Function));
    });

    describe('api(path, callback)', function() {
        beforeEach(function() {
            api = new API(options);
        });

        it('should require path argument', function() {
            expect(function() {
                api(null, function(e, data) {});
            }).toThrow();
        });

        it('should not require callback argument', function() {
            expect(function() {
                api('/apps');
            }).not.toThrow();
        });

        it('should try to send a request', function() {
            spyOn(request, 'send');
            api('/apps', function(e, data) {});
            expect(request.send).toHaveBeenCalledWith(
                'https://build.phonegap.com:443/api/v1/apps?auth_token='+options.token,
                jasmine.any(Object),
                jasmine.any(Function)
            );
        });

        describe('successful request', function() {
            beforeEach(function() {
                spyOn(request, 'send').andCallFake(function(url, opts, callback) {
                    callback(null, {statusCode:200}, '{"say":"winter is coming"}');
                });
            });

            it('should be a GET request', function() {
                api('/apps', function(e, data) {});
                expect(request.send.mostRecentCall.args[1].method).toEqual('GET');
            });

            it('should be a fully-qualified url', function() {
                var url = 'https://build.phonegap.com:443/api/v1/apps?auth_token='+options.token;
                api('/apps', function(e, data) {});
                expect(request.send.mostRecentCall.args[0]).toEqual(url);
            });

            it('should be a trimmed url', function() {
                var url = 'https://build.phonegap.com:443/api/v1/apps?auth_token='+options.token;
                api('  ///apps//  ', function(e, data) {});
                expect(request.send.mostRecentCall.args[0]).toEqual(url);
            });

            it('should trigger callback without an error', function(done) {
                api('/apps', function(e, data) {
                    expect(e).toBeNull();
                    done();
                });
            });

            it('should trigger callback with data object', function(done) {
                api('/apps', function(e, data) {
                    expect(data).toEqual({ say: 'winter is coming' });
                    done();
                });
            });
        });

        describe('failed api request', function() {
            beforeEach(function() {
                spyOn(request, 'send').andCallFake(function(url, opts, callback) {
                    callback(new Error('timeout'), null, null);
                });
            });

            it('should trigger callback with an error', function(done) {
                api('/apps', function(e, data) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });

            it('should trigger callback without data object', function(done) {
                api('/apps', function(e, data) {
                    expect(data).not.toBeDefined();
                    done();
                });
            });
        });

        describe('failed api response', function() {
            beforeEach(function() {
                spyOn(request, 'send').andCallFake(function(url, opts, callback) {
                    callback(null, { statusCode: 404 }, 'Page not found');
                });
            });

            it('should trigger callback with an error', function(done) {
                api('/apps', function(e, data) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });

            it('should trigger callback without data object', function(done) {
                api('/apps', function(e, data) {
                    expect(data).not.toBeDefined();
                    done();
                });
            });
        });

        describe('failed api data', function() {
            beforeEach(function() {
                spyOn(request, 'send').andCallFake(function(url, opts, callback) {
                    callback(null, { statusCode: 200 }, '{"error":"invalid password"}');
                });
            });

            it('should trigger callback with an error', function(done) {
                api('/apps', function(e, data) {
                    expect(e).toEqual(jasmine.any(Error));
                    done();
                });
            });

            it('should trigger callback without data object', function(done) {
                api('/apps', function(e, data) {
                    expect(data).not.toBeDefined();
                    done();
                });
            });
        });
    });

    describe('get(path, callback)', function() {
        beforeEach(function() {
            api = new API(options);
            spyOn(api, 'request');
        });

        it('should trigger api(path, callback)', function() {
            api.get('/apps', function(e, data) {});
            expect(api.request).toHaveBeenCalledWith(
                '/apps',
                jasmine.any(Object),
                jasmine.any(Function)
            );
        });

        it('should be a GET request', function() {
            api.get('/apps', function(e, data) {});
            expect(api.request.mostRecentCall.args[1].method).toEqual('GET');
        });
    });

    describe('post(path, callback)', function() {
        beforeEach(function() {
            api = new API(options);
            spyOn(api, 'request');
        });

        it('should trigger api(path, callback)', function() {
            api.post('/apps', function(e, data) {});
            expect(api.request).toHaveBeenCalledWith(
                '/apps',
                jasmine.any(Object),
                jasmine.any(Function)
            );
        });

        it('should be a POST request', function() {
            api.post('/apps', function(e, data) {});
            expect(api.request.mostRecentCall.args[1].method).toEqual('POST');
        });
    });

    describe('put(path, callback)', function() {
        beforeEach(function() {
            api = new API(options);
            spyOn(api, 'request');
        });

        it('should trigger api(path, callback)', function() {
            api.put('/apps', function(e, data) {});
            expect(api.request).toHaveBeenCalledWith(
                '/apps',
                jasmine.any(Object),
                jasmine.any(Function)
            );
        });

        it('should be a PUT request', function() {
            api.put('/apps', function(e, data) {});
            expect(api.request.mostRecentCall.args[1].method).toEqual('PUT');
        });
    });

    describe('del(path, callback)', function() {
        beforeEach(function() {
            api = new API(options);
            spyOn(api, 'request');
        });

        it('should trigger api(path, callback)', function() {
            api.del('/apps', function(e, data) {});
            expect(api.request).toHaveBeenCalledWith(
                '/apps',
                jasmine.any(Object),
                jasmine.any(Function)
            );
        });

        it('should be a DELETE request', function() {
            api.del('/apps', function(e, data) {});
            expect(api.request.mostRecentCall.args[1].method).toEqual('DELETE');
        });
    });

    describe('pipe', function() {
        it('should be available', function() {
            var spy = jasmine.createSpy();
            expect(api('/apps', function(e, data) {}).pipe).toEqual(jasmine.any(Function));
        });
    });

    describe('defaults', function() {
        it('should be request.defaults', function() {
            spyOn(request, 'defaults');
            api.defaults();
            expect(request.defaults).toHaveBeenCalled();
        });
    });
});
