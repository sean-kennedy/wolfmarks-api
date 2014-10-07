/**
 * BookmarkController
 *
 * @description :: Server-side logic for managing bookmarks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	find: function(req, res) {
		
		Bookmark.find({ user: req.user.id }).populate('user').exec(function(err, bookmarks) {
			
			if (err) return res.json(err.status, {err: err});
			
			return res.json(bookmarks);
			
		});
		
	},
	
	findOne: function(req, res) {
	
		var id = req.params.id;
				
		Bookmark.findOneById(id).populate('user').exec(function(err, bookmark) {
			
			if (err) return res.json(err.status, {err: err});
			
			if (!bookmark) return res.json({err: 'User not found'});
			
			return res.json(bookmark);
			
		});
		
	},

	create: function(req, res) {
	
		var newBookmark = {};
		
		newBookmark.title = req.query.title;
		newBookmark.description = req.query.description;
		newBookmark.url = req.query.url;
		newBookmark.user = req.user.id;
		
		Bookmark.create(newBookmark).exec(function(err, bookmark) {
		
			if (err) {
			
			    if (err.ValidationError) {
			    
			        errors = handleValidation.transformValidation(Bookmark, err.ValidationError);
			        return res.json({
			            success:false,
			            errors: errors
			        });
			        
			    } else {
				    return res.json(err.status, {err: err});
			    }
			    
			}
			
			delete bookmark.user;
			
			res.json(bookmark);
			
		});
		
	},
	
	update: function(req, res) {
		
		var id = req.params.id,
			updates = req.allParams();
		
		updates = Bookmark.removeNotEditable(updates);
		
		Bookmark.update({id: id}).set(updates).exec(function(err, bookmarks) {
		
			if (err) {
			
			    if (err.ValidationError) {
			    
			        errors = handleValidation.transformValidation(Bookmark, err.ValidationError);
			        return res.json({
			            success:false,
			            errors: errors
			        });
			        
			    } else {
				    return res.json(err.status, {err: err});
			    }
			    
			}
			
			if (!bookmarks.length == 0) {
				return res.json({ status: 200, message: 'Bookmark updated', attributes: bookmarks }, 200);
			} else {
				return res.json({ status: 400, message: 'No record found for that ID' }, 400);
			}
		
		});
		
	},
	
	destroy: function(req, res) {
	
		// Needs to be updated to destroy all instances of the user's data
		
		var id = req.params.id;
				
		Bookmark.destroy({id: id}).exec(function(err, bookmarks) {
		
			if (err) return res.json(err.status, {err: err});
			
			if (!bookmarks.length == 0) {
				return res.json({ status: 200, message: 'Bookmark deleted' }, 200);
			} else {
				return res.json({ status: 400, message: 'No record found for that ID' }, 400);
			}
		
		});
				
	}
	
};