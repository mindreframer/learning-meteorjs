Items = new Meteor.Collection("items")


if (Meteor.isClient){
  Meteor.subscribe("items");
  Template.items.items = function(){
    return Items.find();
  }
}

if (Meteor.isServer){
  Meteor.publish("items", function(){
    return Items.find()
  })
}