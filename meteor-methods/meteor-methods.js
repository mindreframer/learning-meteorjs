Items = new Meteor.Collection('items')


if (Meteor.isClient) {
  Template.list.items = function(){
    return Items.find()
  }
}

Meteor.methods({
  createItem: function(text){
    if(this.isSimulation){
      console.log("sending ", text, " to the server")
    } else{
      return Items.insert({text: text})
    }
  }
})