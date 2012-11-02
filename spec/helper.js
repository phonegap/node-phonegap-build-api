var request = require('request'),
    API = require('../lib/api');

module.exports = function() {
    this.token = Math.random().toString();
    this.api = new API({ 'token': this.token });
    this.spy = jasmine.createSpy();

    spyOn(request, 'get').andCallFake(function(options, callback) {
        callback(null, { 'statusCode': 200 }, '{}');
    });
};
