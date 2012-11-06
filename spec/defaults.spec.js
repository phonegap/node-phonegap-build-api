var defaults = require('../lib/defaults');

describe('defaults', function() {
    describe('username', function() {
        it('should be undefined', function() {
            expect(defaults.username).toBeUndefined();
        });
    });

    describe('password', function() {
        it('should be undefined', function() {
            expect(defaults.password).toBeUndefined();
        });
    });

    describe('version', function() {
        it('should be "v1"', function() {
            expect(defaults.version).toEqual('v1');
        });
    });

    describe('protocol', function() {
        it('should be "https:"', function() {
            expect(defaults.protocol).toEqual('https:');
        });
    });

    describe('host', function() {
        it('should be "build.phonegap.com"', function() {
            expect(defaults.host).toEqual('build.phonegap.com');
        });
    });

    describe('port', function() {
        it('should be "80"', function() {
            expect(defaults.port).toEqual('80');
        });
    });

    describe('path', function() {
        it('should be ""', function() {
            expect(defaults.path).toEqual('');
        });
    });
});
