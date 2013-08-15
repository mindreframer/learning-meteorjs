People = new Meteor.Collection("People")

if (Meteor.isClient){
  Template.personList.people = function(){
    return People.find();
  }
  var addPerson = function(e, t){
    var el = t.find("#name");
    People.insert({name: el.value});
    el.value = "";
  }

  Template.personForm.events({
    'click button': addPerson,
    'keypress': function(e, t){
      if (e.keyCode === 13){
        addPerson(e,t)
      }
    }
  });


  Template.person.editing = function(){
    return Session.get("edit-" + this._id);
  }

  Template.person.rendered = function () {
    var input = this.find('input')
    if (input){
      input.focus();
    }
  };


  Template.person.events({
    'click': function(e, t){
      Session.set("edit-"+t.data._id, true)
    },
    'keypress': function(e, t){
      if (e.keyCode === 13){
        People.update(t.data._id, {$set: {name: e.currentTarget.value}});
        Session.set("edit-"+t.data._id, false)
      }
    },
    'click .del': function(e, t){
      People.remove(t.data._id)
    }
  });
}