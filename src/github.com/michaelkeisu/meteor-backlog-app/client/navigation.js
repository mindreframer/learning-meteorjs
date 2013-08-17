Session.set('categorySelected', null);

Template.navigation.categories = function () {
	return Category.getAll();
}

Template.navigation.itemsSelected = function () { 
	if (Session.get('selectedItems').length > 0) {
		return '';
	} else {
		return 'disabled';
	}
}

Template.navigation.categorySelected = function () {
	return !(Session.equals('categorySelected', null));
}


Template.navigation.buttonStatus = function () {
	var catSelected = Session.get('categorySelected');
	if (!(catSelected === null) && Session.equals('categorySelected', this._id) && Meteor.user() !== null) {
		return ' btn-inverse';
	}
}


Template.navigation.events({
	'click .category-item': function (evt) {
		if (Meteor.user() === null) alert('You must be authenticated to view backlog items');
		Session.set('msg', null); // clear msg
		var previousCategory = Session.get('categorySelected'); // needed in case user moves items to a new category
		Session.set('categorySelected', evt.target.id);
		var selectedItems = Session.get('selectedItems');
		var sItemsLen = selectedItems.length;
		if (sItemsLen > 0 && !Session.equals('categorySelected', previousCategory)) {
			_.each(selectedItems, function (id) {
				var i = Item.get(id);
				Item.move(previousCategory, evt.target.id, i.item, i.description, i.assignedTo);
			});
			Session.set('msg', 'Moved item(s)');
		}
		Session.set('selectedItems', []); // clear
	},
	'click #add-button': function () {
		Session.set('itemAdding', true); 
		Session.set('msg', 'Added item');
		Meteor.flush();
		focusField($('#tf-add-name'));
	},
	'click #edit-button': function () {
		if (Session.get('selectedItems').length === 1) {
			Session.set('itemEditing', true); 
			var i =  Item.get(Session.get('selectedItems').shift()); // since only one item is selected, it's safe to shift it.
			Meteor.flush();		
			// set up existing backlog item data:
			$('#tf-edit-name').val(i.item);
			$('#ta-edit-description').val(i.description);
			focusField($('#tf-edit-name'));
		} else if (Session.get('selectedItems').length > 1) {
			Session.set('msg', 'you may only select 1 item to edit');
		} 
	},
	'click #delete-selected': function () {
		_.each(Session.get('selectedItems'), function (id) {
			Item.remove(id);
		});
		if(Session.get('selectedItems').length > 0) Session.set('msg', 'Deleted item(s)');
		Session.set('selectedItems', []); // clear
	}
});

function focusField (t) {
	t.focus();
	t.select();
}

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

