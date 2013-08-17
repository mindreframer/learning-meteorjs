Handlebars.registerHelper('isAdmin', function(showError) {

  if(usersLib.isAdmin(Meteor.user())){
    return true;
  }else{
    if((typeof showError === "string") && (showError === "true"))
      throwError('Sorry, you do not have access to this page');
    return false;
  }
});
Handlebars.registerHelper('online', function(showError) {
	console.log(Meteor.status());
	 return true;
	});
Handlebars.registerHelper('routeTo', function(page) {
	
	return (Meteor.Router[page+'Path']());

	
	});

