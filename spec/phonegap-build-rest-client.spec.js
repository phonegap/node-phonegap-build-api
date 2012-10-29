describe('phonegap-build-rest-client', function() {
    var api;

    beforeEach(function() {
        api = require('../lib/phonegap-build-rest-client');
    });

    it('should be defined', function() {
        expect(api).toBeDefined();
    });
});
