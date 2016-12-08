module.exports = {

	paths : {

		static : ROOT_DIR + "/resources/build",

		views : ROOT_DIR + "/resource/views",

		models : ROOT_DIR + "/server/models",

		routes : ROOT_DIR + "/server/routes",

		middlewares : ROOT_DIR + "/server/middlewares",

		controllers : ROOT_DIR + "/server/controllers"

	},

	view : {

		engine : "vue", // require express-vue package

		options : {

			componentsDir : ROOT_DIR + "/resources/vue/components",

			defaultLayout : 'layout'

		}

	},

	models : {

		db: "models"

	}

};