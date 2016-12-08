// init express server with options
// register models
// register routes and hand over to controllers
var config = require('./config');
var app = require('express')();
var bootstrapper = require('./foundation/bootstrap')(app);
var router = require('./foundation/route')(app);

module.exports = {

	bootOn (port) {

		// init server with configs
		bootstrapper.setPort(port)
					.setStaticAssetsPath(config.paths.static)
					.setView(config.view.engine, config.paths.views ,config.view.options)
					.startServer();

		// register routes and hand over to controllers
		router.registerRoutes();

		// register middlewares and hand over to middlewares
		router.registerMiddlewares();

	}

};

