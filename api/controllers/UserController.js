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
	
		var id = req.params.id;
				
		User.findOneById(id).exec(function(err, user) {
			
			if (err) return res.json(err.status, {err: err});
			
			if (!user) return res.json({err: 'User not found'});
			
			return res.json(user);
			
		});
		
	},
	
	create: function(req, res) {
	
		var newUser = {};
		
		newUser.firstName = req.query.firstName;
		newUser.lastName = req.query.lastName;
		newUser.email = req.query.email;
		newUser.password = req.query.password;
		
		/*if (!email || !password) {
			return res.json(401, {err: 'Required fields missing'});
		}*/
		
		User.create(newUser).exec(function(err, user) {
		
			if (err) {
			
			    if (err.ValidationError) {
			    
			        errors = handleValidation.transformValidation(User, err.ValidationError);
			        return res.json({
			            success:false,
			            errors: errors
			        });
			        
			    } else {
				    return res.json(err.status, {err: err});
			    }
			    
			}
			
			return res.json({user: user, token: tokenService.issueToken({sid: user.id})});
			
		});
		
		/*User.validateUnique('email', email, function(err, valid) {
		
			if (err) return res.json(err.status, {err: err});
		
			if (!valid) return res.json(401, {err: 'A user with that email already exists'});
			
			User.create({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			}).exec(function(err, user) {
			
				if (err) return res.json(err.status, {err: err});
				
				if (user) return res.json({user: user, token: tokenService.issueToken({sid: user.id})});
			
			});
			
		});*/
	  
	},
	
	update: function(req, res) {
		
		var id = req.params.id,
			updates = req.allParams();
		
		updates = User.removeNotEditable(updates);
		
		User.update({id: id}).set(updates).exec(function(err, users) {
		
			if (err) {
			
			    if (err.ValidationError) {
			    
			        errors = handleValidation.transformValidation(User, err.ValidationError);
			        return res.json({
			            success:false,
			            errors: errors
			        });
			        
			    } else {
				    return res.json(err.status, {err: err});
			    }
			    
			}
			
			if (!users.length == 0) {
				return res.json({ status: 200, message: 'User updated', attributes: users }, 200);
			} else {
				return res.json({ status: 400, message: 'No record found for that ID' }, 400);
			}
		
		});
		
	},
	
	destroy: function(req, res) {
	
		// Needs to be updated to destroy all instances of the user's data
		
		var id = req.params.id;
				
		User.destroy({id: id}).exec(function(err, users) {
		
			if (err) return res.json(err.status, {err: err});
			
			if (!users.length == 0) {
				return res.json({ status: 200, message: 'User deleted' }, 200);
			} else {
				return res.json({ status: 400, message: 'No record found for that ID' }, 400);
			}
		
		});
				
	}
		
};