describe('phonegap-build-rest-client', function() {
    var api;

    beforeEach(function() {
        api = require('../lib/main');
    });

    it('should be defined', function() {
        expect(api).toBeDefined();
    });
});
