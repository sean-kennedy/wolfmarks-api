/**
* User.js
*
* @description :: User model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var shortId = require('shortid'),
	bcrypt = require('bcrypt');
	//Q = require('q');

module.exports = {

	schema: true,
	
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
			unique: true,
			required: true
		},
		
		password: {
			type: 'string',
			required: true
		},
		
		// Associations
		
		bookmarks: {
			collection: 'bookmark',
			via: 'user'	
		},
		
		// Attribute Methods
		
	    getFullName: function() {
	    	return this.firstName + ' ' + this.lastName;
	    },
	    
	   	toJSON: function() {
			var obj = this.toObject();
			//delete obj.password;
			return obj;
	    }
		
	},
	
	// Validation Messages
	
    validationMessages: {
    
        email: {
            required: 'Email required',
            unique: 'Email is already in use',
            email: 'Email format incorrect'
        },
        
        password: {
        	required: 'Password required'
        }
        
    },
	
	// Methods
	
	removeNotEditable: function(updates) {
	
		delete updates.createdAt;
		delete updates.updatedAt;
		delete updates.id;
		
		return updates;
		
	},
	
	encryptPassword: function(password, cb) {
	
		bcrypt.hash(password, 10, function(err, hash) {
		
			if (err) cb(err);
			
			cb(null, hash);
			
		});
		
	},
    
	validatePassword: function(password, user, cb) {
	
		bcrypt.compare(password, user.password, function(err, match) {
		
			if (err) cb(err);
			
			if (match) {
				cb(null, true);
			} else {
				cb(err);
			}
			
		});

	},
	
	/*validateUnique: function(prop, value, cb) {
	
		var obj = {};
		obj[prop] = value;
	
		User.findOne(obj).exec(function(err, model) {
		
			if (err) cb(err);
			
			if (!model) {
				cb(null, true);
			} else {
				cb(err);
			}
			
		});
		
	},*/
	
	// Lifecycle Callbacks
	
	beforeCreate: function(values, cb) {
	
		User.encryptPassword(values.password, function(err, hash) {
			
			if (err) return cb(err);
			
			var newId = shortId.generate();
		
			values.password = hash;
			values.id = newId;
			
			cb();
			
		});
	
	},
	
	beforeUpdate: function(values, cb) {
	
		if (values.password) {
		
			User.encryptPassword(values.password, function(err, hash) {
				
				if (err) return cb(err);
				
				values.password = hash;
				
				cb();
				
			});
			
		} else {
			cb();
		}
	
	}
	
	/*beforeUpdate: function(values, cb) {
	
		function checkPassword() {
			
			var deferred = Q.defer();
			
			if (values.password) {
			
				User.encryptPassword(values.password, function(err, hash) {
					
					if (err) deferred.reject(new Error(err));
					
					values.password = hash;
					
					deferred.resolve(true);
					
				});
				
			} else {
				deferred.resolve(true);
			}
			
			return deferred.promise;
			
		}
		
		function checkEmail() {
			
			var deferred = Q.defer();
			
			if (values.email) {
			
				User.validateUnique('email', values.email, function(err, valid) {
					
					if (err) deferred.reject(new Error(err));
					
					if (!valid) deferred.reject('Email already used');
					
					deferred.resolve(true);
					
				});
				
			} else {
				deferred.resolve(true);
			}
			
			return deferred.promise;
			
		}
		
		function checkSlug() {
			
			var deferred = Q.defer();
			
			if (values.slug) {
			
				User.validateUnique('slug', values.slug, function(err, valid) {
				
					if (err) deferred.reject(new Error(err));
			
					if (!valid) deferred.reject('Slug already used');
					
					deferred.resolve(true);
					
				});
				
			} else {
				deferred.resolve(true);
			}
			
			return deferred.promise;
			
		}
	
		Q.all([
		    checkPassword(),
		    checkEmail(),
		    checkSlug()
		]).spread(function() {
			cb();
		}).fail(function(err) {
			cb(err);
		});
		
	}*/
	
};