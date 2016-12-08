var config = require(ROOT_DIR + "/server/config");
var mongoose = require('mongoose');

// connect mongoose to db 
mongoose.connect('mongodb://localhost/' + config.models.db);

// monitoring db events
var conn = mongoose.connection;

conn.on('error', function () {

	console.log('ERROR connectig to Mongo');

});

conn.once('open', function() {

	console.log("SUCCESS connecting to Mongo");

});

// Base class for all models
class Model {

	/**
	 * Constructing a base model
	 * @return {void} 
	 */
	constructor () {}

	/**
	 * Initialize schema and model 
	 * based on custom schema	
	 * @return {void}
	 */
	init (schema) {

		this.schema = mongoose.Schema(this.schema);

		this.model = mongoose.model(this.schema);
	}

	/**
	 * Get the underlying mongoose model
	 * @return {Object} Mongoose model
	 */
	getRealModel () {

		return this.model;

	}

	/**
	 * Delegate function calls to underlying mongoose model
	 * @param  {Model} model Model to be modified
	 * @return {Proxy}       Proxy to access the model
	 */
	static delegate (model) {

		return new Proxy(model, {

			get: function (target, property, receiver) {

				if (property in target) {

					return target[property];

				}

				return target.getRealModel[property];

			}

		});

	}

}

module.exports = Model;