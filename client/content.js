Session.set('selectedItems', []);	
Session.set('msg', null);

Template.content.items = function () {
	return Item.getAllForCat(Session.get('categorySelected'));
}

Template.content.hasMessage = function () {
	return Session.get('msg') ? true : false;
}

Template.content.message = function () {
	return Session.get('msg');
}

Template.content.categorySelected = function () {
	return !(Session.equals('categorySelected', null));
}

Template.content.itemStyle = function () {
	var itemIndex = _.indexOf(Session.get('selectedItems'), this._id);
	if (itemIndex === -1) { // -1 if it isn't present
		return '';
	} else {
		return ' selected';
	}
		
}

Template.content.events({
	'click .itm': function () {
		var selectedItems = Session.get('selectedItems');
		$(this._id).parent().css({'background-color': '#FFEAB7'});
		var itemIndex = _.indexOf(selectedItems, this._id);
		if (itemIndex === -1) { // -1 if it isn't present
			selectedItems.push(this._id);
		} else {
			selectedItems.splice(itemIndex, 1);
		}
		Session.set('selectedItems', selectedItems); // save selected items to session
	}
}); // end content.events call

