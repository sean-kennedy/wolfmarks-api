/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	find: function(req, res) {
		
		User.find().exec(function(err, users) {
			
			if (err) return res.json(err.status, {err: err});
			
			return res.json(users);
			
		});
		
	},

	findOne: function(req, res) {
	
		var slug = req.param('id');
		
		User.findOneBySlug(slug, function(err, user) {
		
			if (err) return res.json(err.status, {err: err});
			
			if (user) {
				return res.json(user);
			}
				
			User.findOneById(slug, function(err, user) {
				
				if (err) return res.json(err.status, {err: err});
				
				if (!user) return res.json({err: 'User not found'});
				
				return res.json(user);
				
			});
			
		});
		
	},
	
	update: function(req, res) {
		
		var updates = {},
			slug = req.param('slug'),
			id = req.param('id');
		
		if (slug) {
		
			User.validSlug(slug, function(err, valid) {
			
				if (err) return res.json(err.status, {err: err});
		
				if (!valid) return res.json({err: 'Slug already in use'});
				
				updates.slug = slug;
				
				runUpdate();
				
			});
			
		} else {
			runUpdate();
		}
		
		function runUpdate() {
		
			User.update({id: req.param('id')}, updates).exec(function(err, users) {
			
				if (err) return res.json(err.status, {err: err});
				
				if (!users.length == 0) {
					return res.json({ status: 200, message: 'User updated', attributes: users }, 200);
				} else {
					return res.json({ status: 400, message: 'No record found for that ID' }, 400);
				}
			
			});
		
		}
		
	}
		
};