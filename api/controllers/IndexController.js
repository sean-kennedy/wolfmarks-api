/**
 * IndexController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
	
		res.json({ 'message': 'Welcome to the v1 API' });
		
	}
	
};

