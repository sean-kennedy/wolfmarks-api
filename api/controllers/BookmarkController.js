/**
 * BookmarkController
 *
 * @description :: Server-side logic for managing bookmarks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	find: function(req, res) {
		
		Bookmark.find({ user: req.user.id }).exec(function(err, bookmarks) {
			
			if (err) return res.json(401, {err: err});
			
			res.json(bookmarks);
			
		});
		
	},

	create: function(req, res) {
		
		var title = req.param('title'),
			url = req.param('url'),
			user = req.user.id;
			
		if (!title || !url || !user) return res.json(401, {err: 'Insufficient data supplied'});
		
		Bookmark.create({ 
			title: title,
			url: url,
			user: user
		}).exec(function(err, bookmark) {
		
			if (err) return res.json(401, {err: err});
			
			delete bookmark.user;
			res.json(bookmark);
			
		});
		
	}
	
};