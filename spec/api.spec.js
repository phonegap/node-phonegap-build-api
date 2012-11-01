var API = require('../lib/api'),
    api,
    token;

describe('API', function() {
    beforeEach(function() {
        token = Math.random().toString();
        api = new API({ 'token': token });
    });

    describe('token', function() {
        it('should be set in constructor', function() {
            expect(api.token).toEqual(token);
        });

        it('should throw error when missing', function() {
            expect(function() { var api = new Api(); }).toThrow();
        });
    });

    describe('get', function() {
        it('should exist', function() {
            expect(api.get).toEqual(jasmine.any(Function));
        });
    });

    describe('post', function() {
        it('should exist', function() {
            expect(api.post).toEqual(jasmine.any(Function));
        });
    });

    describe('put', function() {
        it('should exist', function() {
            expect(api.put).toEqual(jasmine.any(Function));
        });
    });

    describe('del', function() {
        it('should exist', function() {
            expect(api.del).toEqual(jasmine.any(Function));
        });
    });
});
