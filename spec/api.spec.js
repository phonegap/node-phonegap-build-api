var Helper = require('./helper'),
    helper;

describe('API', function() {
    beforeEach(function() {
        helper = new Helper();
    });

    describe('property', function() {
        describe('token', function() {
            it('should be set by constructor', function() {
                expect(helper.api.token).toEqual(helper.token);
            });

            it('should throw error when missing', function() {
                expect(function() {
                    var API = require('../lib/api');
                    var api = new API();
                }).toThrow();
            });
        });
    });

    describe('interface', function() {
        it('should be a function', function() {
            expect(helper.api).toEqual(jasmine.any(Function));
        });

        it('should pass calls to request', function() {
            helper.api('/apps', helper.spy);
            expect(helper.spy).toHaveBeenCalled();
        });
    });

    describe('streaming', function() {
        it('should support pipe', function() {
            expect(helper.api('/apps', helper.spy).pipe)
                .toEqual(jasmine.any(Function));
        });
    });
});
