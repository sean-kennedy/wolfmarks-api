/**
* Bookmark.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var shortId = require('shortid');

module.exports = {

	schema: true,
	
	attributes: {
	
		// Attributes
		
		title: {
			type: 'string'
		},
		
		description: {
			type: 'string'
		},
		
		url: {
			type: 'string',
			required: true
		},
		
		// Associations
		
		user: {
			model: 'user',
			required: true
		},
		
		tags: {
			model: 'tag'
		}
		
	},
	
	// Validation Messages
	
    validationMessages: {
    
        url: {
            required: 'Url required',
        },
        
        user: {
        	required: 'User required'
        }
        
    },
	
	// Methods
	
	removeNotEditable: function(updates) {
	
		delete updates.createdAt;
		delete updates.updatedAt;
		delete updates.id;
		
		return updates;
		
	},
	
	// Lifecycle Callbacks
	
	beforeCreate: function(values, cb) {
	
		values.id = shortId.generate();
		cb();
	
	}
	
};