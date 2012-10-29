var api;

describe('PhoneGap Build REST Client', function() {
    beforeEach(function() {
        api = require('../lib/main');
    });

    it('should support authentication', function() {
        expect(api.auth).toEqual(jasmine.any(Function));
    });
});
