var Categories = new Meteor.Collection('Categories');
var Items = new Meteor.Collection('items');

var Item = {
	get: function (id) {
		return Items.findOne({_id: id});
	},
	getAllForCat: function (category) {
		return Items.find({category: category});
	},
	add: function (category, name, description, assignedTo) {
		Items.insert({category: category
					 ,item: name
					 ,description: description
					 ,assignedTo: assignedTo || Meteor.user().username}); 
	},
	removeFromCat: function(category, item) {
		Items.remove({category: category
					 ,item: item});
	},
	updateItem: function(id, name, description) {
		Items.update({_id: id}
					,{$set:{item: name
					,description: description}}
					,{upsert: false});
	},
	move: function (previousCategory, targetCategory, item, description, assignedTo) {
		this.add(targetCategory, item, description, assignedTo); // insert to the new (target) category
		this.removeFromCat(previousCategory, item); // remove item from previous category	
	},
	remove: function (id) {
		Items.remove({_id: id});
	}
	
}

var Category = {
	getById: function (id) {
		return Categories.findOne({_id: id})
	},
	getByName: function (name) {
		return Categories.findOne({name: name})
	},
	getAll: function () {
		return Categories.find();
	},
	getCount: function () {
		return Categories.find().count();
	}
}
