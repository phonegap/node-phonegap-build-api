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
        it('should be "443"', function() {
            expect(defaults.port).toEqual('443');
        });
    });

    describe('path', function() {
        it('should be "/api/v1"', function() {
            expect(defaults.path).toEqual('/api/v1');
        });
    });
});
