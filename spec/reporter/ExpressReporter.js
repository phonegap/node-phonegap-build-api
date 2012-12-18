var express = require('express');
var http = require('http');

var ExpressReporter = function(config) {
    this.app = express();

    this.app.all('*', function(req, res) {
        var body = (req.url.match(/error/)) ? '{"error":"some error"}' : '{}';
        res.send(body);
    });
};

ExpressReporter.prototype = {
    reportRunnerStarting: function(runner) {
        this.server = http.createServer(this.app).listen(3000);
    },

    reportRunnerResults: function(runner) {
        this.server.close();
    },

    reportSuiteResults: function(suite) {
    },

    reportSpecResults: function(spec) {
    }
};

module.exports = ExpressReporter;
