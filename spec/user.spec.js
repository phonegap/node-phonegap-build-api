var user;

describe('user', function() {
    beforeEach(function() {
        user = require('../lib/user.js')();
    });

    describe('get', function() {
        it('should exist', function() {
            expect(user.get).toBeDefined();
        });
    });
});
