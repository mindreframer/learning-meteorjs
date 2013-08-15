Items = new Meteor.Collection('items')


if (Meteor.isClient) {
  Template.list.items = function(){
    return Items.find()
  }
}

if (Meteor.isServer){
  Meteor.methods({
    createItem: function(text){
      Items.insert({text: text})
    }
  })
}