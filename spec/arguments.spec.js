var Arguments = require('../lib/arguments');

describe('Arguments', function() {
    describe('path', function() {
        it('should parse path from arguments', function() {
            var args = new Arguments('/apps', function(){});
            expect(args.path).toEqual('/apps');
        });

        it('support placeholders and variables', function() {
            var args = new Arguments('/apps/:id/build/:platform', 10, 'android', function() {});
            expect(args.path).toEqual('/apps/10/build/android');
        });

        it('should be required and throw when missing', function() {
            expect(function() {
                var args = new Arguments();
            }).toThrow();

            expect(function() {
                var args = new Arguments(function() {});
            }).toThrow();
        });

        describe('trimming', function() {
            it('should remove extra leading slashes', function() {
                var args = new Arguments('///apps/:id', 10, function() {});
                expect(args.path).toEqual('/apps/10');
            });

            it('should remove extra trailing slashes', function() {
                var args = new Arguments('/apps/:id///', 10, function() {});
                expect(args.path).toEqual('/apps/10');
            });

            it('should remove extra leading whitespace', function() {
                var args = new Arguments('  //apps/:id', 10, function() {});
                expect(args.path).toEqual('/apps/10');
            });

            it('should remove extra trailing whitespace', function() {
                var args = new Arguments('  /apps/:id//  ', 10, function() {});
                expect(args.path).toEqual('/apps/10');
            });
        });
    });

    describe('callback', function() {
        it('should parse callback from arguments', function() {
            var callback = jasmine.createSpy();
            var args = new Arguments('/apps', callback);
            expect(args.callback).toEqual(callback);
        });

        it('should be optional', function() {
            var args = new Arguments('/apps');
            expect(args.callback).toEqual(jasmine.any(Function));
        });
    });
});
