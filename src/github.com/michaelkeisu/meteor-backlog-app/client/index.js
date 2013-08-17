Meteor.subscribe('categories');
Meteor.autosubscribe(function () {
	Meteor.subscribe('items');
});
	
Template.middle.isAddingItemOrEditing = function () {
	return (Session.equals('itemAdding', true) || Session.equals('itemEditing', true));
}

