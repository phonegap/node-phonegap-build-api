var parse = require('../lib/parse');

describe('parse', function() {
    describe('query', function() {
        it('should return query string', function() {
            var args = [ '/apps/10/icon', function() {} ];
            expect(parse.query(args)).toEqual('/apps/10/icon');
        });

        it('should not require a callback', function() {
            var args = [ '/apps/10/icon' ];
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

        describe('normalization', function() {
            it('should add leading slash when missing', function() {
                var args = [ 'apps/10/icon', function() {} ];
                expect(parse.query(args)).toEqual('/apps/10/icon');
            });

            it('should not add leading slash when present', function() {
                var args = [ '/apps/10/icon', function() {} ];
                expect(parse.query(args)).toEqual('/apps/10/icon');
            });

            it('should remove trailing slash when present', function() {
                var args = [ '/apps/10/icon/', function() {} ];
                expect(parse.query(args)).toEqual('/apps/10/icon');
            });
        });
    });

    describe('callback', function() {
    });
});
