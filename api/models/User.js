/**
* User.js
*
* @description :: User model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var shortId = require('shortid'),
	bcrypt = require('bcrypt'),
	Q = require('q');

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
			unique: true
		},
		
		password: {
			type: 'string'
		},
		
		slug: {
			type: 'string',
			unique: true
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
	
	// Methods
	
	removeNotEditable: function(updates) {
	
		delete updates.createdAt;
		delete updates.updatedAt;
		delete updates.id;
		
		return updates;
		
	},
    
	validPassword: function(password, user, cb) {
	
		bcrypt.compare(password, user.password, function(err, match) {
		
			if (err) cb(err);
			
			if (match) {
				cb(null, true);
			} else {
				cb(err);
			}
			
		});

	},
	
	validSlug: function(slug, cb) {
	
		User.findOneBySlug(slug, function(err, user) {
		
			if (err) cb(err);
			
			if (!user) {
				cb(null, true);
			} else {
				cb(err);
			}
			
		});

	},
	
	// Lifecycle Callbacks
	
	beforeCreate: function(values, cb) {
		
		bcrypt.hash(values.password, 10, function(err, hash) {
		
			if (err) return cb(err);
			
			newId = shortId.generate();
			
			values.password = hash;
			values.id = newId;
			values.slug = newId;
			
			cb();
			
		});
	
	},
	
	beforeUpdate: function(values, cb) {
	
		if (values.password) {
		
			bcrypt.hash(values.password, 10, function(err, hash) {
			
				if (err) return cb(err);
				
				values.password = hash;
				
				cb();
			
			});
		
		} else {
			cb();
		}
		
	}
	
};