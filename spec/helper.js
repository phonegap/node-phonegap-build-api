var ExpressReporter = require('./reporter/ExpressReporter');

jasmine.getEnv().addReporter(new ExpressReporter());
