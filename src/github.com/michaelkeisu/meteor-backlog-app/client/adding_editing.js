Session.set('itemAdding', false);
Session.set('itemEditing', false)


Template.addingEditing.addOrEdit = function () {
	return Session.equals('itemAdding', true) ? 'add' : 'edit';
}

Template.addingEditing.insertOrUpdate = function() {
	return Session.equals('itemAdding', true) ? 'insert' : 'update';// whether or not to use insert or update from UI
} 

Template.addingEditing.addOrUpdate = function () {
	return Session.equals('itemAdding', true) ? 'Add' : 'Update';
}

Template.addingEditing.events({
	'click #insert-item': function (evt, tmplt) { 
		var taDescription = tmplt.find('#ta-add-description').value;
		var tfName = tmplt.find('#tf-add-name').value;
		if (taDescription.length === 0 || tfName.length === 0) {
			alert('text area must have content');
		} else {
			Item.add(Session.get('categorySelected'), tfName, taDescription);
			Session.set('itemAdding', false);
		}
	},
	'click #update-item': function (evt, tmplt) { 
		var taDescription = tmplt.find('#ta-edit-description').value
		var tfName = tmplt.find('#tf-edit-name').value
		if (taDescription.length === 0 || tfName.length === 0) {
			alert('text area must have content');
		} else {
			var itemToEdit =  Item.get(Session.get('selectedItems').shift());
			Item.updateItem(itemToEdit._id, tfName, taDescription);
			Session.set('itemEditing', false);
			Session.set('message', 'Edited item.');
		}
	},
	'keyup #ta-add-description, keyup #tf-add-name': function (evt) {
		if (evt.which === 27) {
			Session.set('itemAdding', false);
		}
	},
	'keyup #ta-edit-description, keyup #tf-edit-name': function (evt) {
		if (evt.which === 27) {
			Session.set('itemEditing', false);
		}
	},
	'click #cancel': function () {
		Session.set('item' + addingItemOrEditing(), false); 
		Session.set('message', null);
	}
});

function addingItemOrEditing() {
	return Session.equals('itemAdding', true) ? 'Adding': 'Editing';
}
