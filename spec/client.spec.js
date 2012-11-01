var request = require('request'),
    api = require('../lib/client'),
    spy;

describe('client', function() {
    beforeEach(function() {
        spy = jasmine.createSpy();

        spyOn(request, 'post').andCallFake(function(options, callback) {
            callback({}, { 'statusCode': 200 }, '{}');
        });
    });

    describe('auth', function() {
        it('should exist', function() {
            expect(api.auth).toEqual(jasmine.any(Function));
        });

        it('should return an API object', function() {
            runs(function() {
                api.auth('link', 'triforce', spy);
            });

            waitsFor(function() {
                return spy.wasCalled;
            }, 'auth callback should be called');

            runs(function() {
                expect(spy).toHaveBeenCalledWith(
                    null,
                    jasmine.any(Object)
                );
            });
        });
    });
});
