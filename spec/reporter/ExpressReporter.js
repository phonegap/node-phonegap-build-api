var express = require('express');
var http = require('http');

var ExpressReporter = function(config) {
    this.app = express();

    this.app.all('*', function(req, res) {
        res.send('{}');
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
