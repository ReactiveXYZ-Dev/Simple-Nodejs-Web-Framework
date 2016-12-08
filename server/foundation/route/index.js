var fs = require('fs');
var bodyParser = require('body-parser');
var config = require(ROOT_DIR + "/server/config"); 

class Router {

	/**
	 * Constructing a router object
	 * @param  {Object} app Express app
	 * @return {void}     
	 */
	constructor (app) {

		this.app = app;

	}

	/**
	 * Register routes based on definitions
	 * @return {void} 
	 */
	registerRoutes () {

		var routeData = require(config.paths.routes);

		// register web routes
		var webRoutes = routeData.web;

		var urlParser = bodyParser.urlencoded({extended : false});

		webRoutes.forEach((route) => {

			var controller = route[2].split("@")[0];

			var method = route[2].split("@")[1];

			var controller = require(config.paths.controllers + "/" + controller)();

			this.app[route[0]](route[1], urlParser ,function (req, res) {

				controller[method](req, res);

			});

		});

		// register api routes
		var apiRoutes = routeData.api;

		var jsonParser = bodyParser.json();

		apiRoutes.forEach((route) => {

			var controller = route.split("@")[0];

			var method = route.split("@")[1];

			var controller = require(config.paths.controllers + "/" + controller)();

			this.app[route[0]](route[1], jsonParser ,function (req, res) {

				controller[method](req, res);

			});

		});


	}

	registerMiddlewares () {

		var middlewareData = require(config.paths.middlewares);

		middlewareData.forEach((middleware) => {

			var middlewareHandler = require(config.paths.middlewares + "/" + middlware[1]);

			this.app.use(middleware[0], function (req, res, next) {

				middlewareHandler.handle(req, res, next);

			});

		});

	}

}

module.exports = (app) => {

	return new Router(app);

}