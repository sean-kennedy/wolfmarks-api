/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	login: function(req, res) {
	
	  	var email = req.param('email'),
	  		password = req.param('password');
	
		if (!email || !password) return res.json(401, {err: 'email and password required'});
		
		User.findOneByEmail(email).exec(function(err, user) {
		
			if (!user) return res.json(401, {err: 'invalid email or password'});
		
			User.validPassword(password, user, function(err, valid) {
			
				if (err) return res.json(err.status, {err: err});
		
				if (!valid) return res.json({err: 'invalid email or password'});
				
				return res.json({user: user, token: tokenService.issueToken({sid: user.id})});
				
			});
			
		});
		
	}
	
};