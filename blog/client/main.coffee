console.log("client/main.coffee")
Meteor.subscribe "posts"

BlogRouter = Backbone.Router.extend
  routes: {
    "": "main",
    "new-post": "newPost"
  },
  newPost: ()->
      Session.set 'currentView', 'newPostForm'


Meteor.startup ()->
  new BlogRouter
  Backbone.history.start pushState:true