var express = require('express');

class Bootstrap {

	/**
	 * Inject express app
	 * @param  {Object} app Express app object
	 */
	constructor (app) {

		this.app = app;

	}

	/**
	 * Set the port this the server will listen on
	 * @param {Number} port Port numer
	 * @return this
	 */
	setPort (port) {

		this.port = port;

		return this;

	}

	/**
	 * Set the path where all static assets 
	 * will be loaded from
	 * @param {String} path Path of assets
	 * @return this
	 */
	setStaticAssetsPath (path) {

		this.staticPath = path;

		return this;

	}

	/**
	 * Set view properties to be used by express
	 * @param {String} engine   Name of view engine
	 * @param {String} viewDir  Director of view to be loaded
	 * @param {Object} viewOpts Additional view options
	 * @return this
	 */
	setView (engine, viewDir, viewOpts) {

		this.view = {
			engine,
			viewDir,
			viewOpts
		};

		return this;

	}

	/**
	 * Start the express server
	 * @return {void} 
	 */
	startServer () {

		// set static path
		this.app.use(express.static(this.staticPath));

		// set view props
		this.app.set('views', this.view.viewDir);
		this.app.set('view engine', this.view.engine, this.view.viewOpts);

		// boot server on selected port
		this.app.listen(this.port, () => {

			console.log("Start listening on port " + this.port)

		});

	}
}


module.exports = (app) => {

	return new Bootstrap (app);

};