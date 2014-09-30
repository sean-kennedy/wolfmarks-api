/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	attributes: {
	
		// Attributes
		
		firstName: {
			type: 'string'
		},
		
		lastName: {
			type: 'string'
		},
		
		email: {
			type: 'email',
			unique: true
		},
		
		password: {
			type: 'string'
		},
		
		// Associations
		
		bookmarks: {
			collection: 'bookmark',
			via: 'user'	
		},
		
		// Attribute Methods
		
	    getFullName: function() {
	    	return this.firstName + ' ' + this.lastName;
	    }
		
	},
	
	// Methods
    
	validPassword: function(password, user, cb) {
		/*bcrypt.compare(password, user.encryptedPassword, function(err, match) {
			if (err) cb(err);
			if (match) {
				cb(null, true);
			} else {
				cb(err);
			}
		});*/
		cb(null, true);
	}
	
};