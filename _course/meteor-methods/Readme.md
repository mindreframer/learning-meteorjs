## Metheor Methods:


- expose server methods to client
- Meteor.call("createItem", "second-item")

- defined by:
  Meteor.methods({
    createItem: function(text){
      Items.insert({text: text})
    }
  })
