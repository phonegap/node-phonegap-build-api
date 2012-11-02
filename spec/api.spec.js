var request = require('request'),
    API = require('../lib/api'),
    api,
    token,
    spy;

describe('API', function() {
    beforeEach(function() {
        token = Math.random().toString();
        api = new API({ 'token': token });
        spy = jasmine.createSpy();

        spyOn(request, 'get').andCallFake(function(options, callback) {
            callback(null, { 'statusCode': 200 }, '{}');
        });
    });

    describe('property', function() {
        describe('token', function() {
            it('should be set by constructor', function() {
                expect(api.token).toEqual(token);
            });

            it('should throw error when missing', function() {
                expect(function() { var api = new Api(); }).toThrow();
            });
        });
    });

    describe('interface', function() {
        it('should be a function', function() {
            expect(api).toEqual(jasmine.any(Function));
        });

        it('should pass calls to request', function() {
            api('/apps', spy);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('streaming', function() {
        it('should support pipe', function() {
            expect(api('/apps', spy).pipe).toEqual(jasmine.any(Function));
        });
    });
});
