Meteor.startup(function () {
	if (Categories.find().count() === 0) {
  		Categories.insert({name: 'To do'});
  		Categories.insert({name: 'In progress'});
  		Categories.insert({name: 'Verify'});
  		Categories.insert({name: 'Complete'});
	}
});
