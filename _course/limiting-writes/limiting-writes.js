Items = new Meteor.Collection("items")

Items.allow({
  insert: function(userId, doc){
    return (userId && doc.owner === userId)
  },
  update: function(userId, doc, fields, modifier){
    return doc.owner === userId;
  },
  remove: function(userId, doc){
    return doc.owner === userId;
  }
})




Items.deny({
  insert: function(userId, doc){
    return (fields.indexOf("owner") > -1 )
  },
  update: function(userId, doc, fields, modifier){
    return doc.owner === userId;
  },
  remove: function(userId, doc){
    return doc.owner === userId;
  }
})