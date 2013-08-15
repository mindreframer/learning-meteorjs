if (Meteor.isClient) {
  Template.login.creatingAccount = function(){
    return Session.get("creatingAccount")
  }


  Template.login.events({

    'click #loginform': function(e, t){
      Session.set("creatingAccount", false)
    },

    'click #accountform': function(){
      Session.set("creatingAccount", true)
    },

    'click #createaccount': function(e, t){
      Session.set("creatingAccount", false)
      Accounts.createUser({
        username: t.find('#username').value,
        password: t.find('#password').value,
        email   : t.find('#email').value,
        profile: {
          name: t.find('#name').value
        }
      })
    },

    'click #logout': function(e,t){
      Meteor.logout();
    },

    'click #login': function(e,t){
      Meteor.loginWithPassword(t.find('#username').value, t.find('#password').value)
    }

  });

}

if (Meteor.isServer) {

}
