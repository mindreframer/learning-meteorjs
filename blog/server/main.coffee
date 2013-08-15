console.log("server/main.coffee")
Meteor.publish "posts", ()-> Posts.find()

Meteor.methods
  post: (content, title, slug)->
    if adminLoggedIn()
      Posts.insert
        content: content
        title: title
        slug: slug
        createdOn: new Date

