
Meteor.publish('categories',function () {
	return Items.find();
});

Meteor.publish('items', function () {
	return Categories.find();
});	


Meteor.publish('usernames', function () {
	//... todo
});

function isAdmin(userId) {
	var adminUser = Meteor.users.findOne({username: "admin"});
	return (userId && adminUser && userId === adminUser._id);
}


function isUser(userId) {
	var user = Meteor.users.findOne({_id: userId});
	return (userId && user && userId === user._id);
}


Items.allow({
	remove: function(userId, doc) {
		return isAdmin(userId) || isUser(userId);
	},
	insert: function(userId, doc) {
		return isAdmin(userId) || isUser(userId);
	},
	update: function(userId, docs, fields, modifier) {
		return isAdmin(userId) || isUser(userId);
	}
});
Categories.allow({
	remove: function(userId, doc) {
		return isAdmin(userId);
	},
	insert: function(userId, doc) {
		return isAdmin(userId);
	},
	update: function(userId, docs, fields, modifier) {
		return isAdmin(userId);
	}
});
