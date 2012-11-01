var parse = require('../lib/parse');

describe('parse', function() {
    describe('query', function() {
        it('should return query string', function() {
            var args = [ '/apps/10/icon', function() {} ];
            expect(parse.query(args)).toEqual('/apps/10/icon');
        });

        describe('variables', function() {
            it('should add a variable to query string', function() {
                var args = [ '/apps/:id/icon', 10, function() {} ];
                expect(parse.query(args)).toEqual('/apps/10/icon');
            });

            it('should add multiple variables to query string', function() {
                var args = [ '/apps/:id/build/:platform', 10, 'android', function() {} ];
                expect(parse.query(args)).toEqual('/apps/10/build/android');
            });
        });
    });

    describe('callback', function() {
    });
});
