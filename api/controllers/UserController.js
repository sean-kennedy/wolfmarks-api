/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findAll: function(req, res) {
	
		res.json({all: 'all users'});
		
	},

	find: function(req, res) {
	
		var slug = req.param('slug');
		
		User.findOneBySlug(slug, function(err, user) {
		
			if (err) return res.json(err.status, {err: err});
			
			if (!user) return res.json({err: 'User not found'});
			
			return res.json(user);
			
		});
		
	}
		
};