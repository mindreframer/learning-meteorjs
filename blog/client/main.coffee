console.log("client/main.coffee")
Meteor.subscribe "posts"

BlogRouter = Backbone.Router.extend
  routes: {
    "": "main",
    "new": "newPost"
    ":slug": "post"
  },
  main: ()->
    Session.set "currentView", "posts"
  newPost: ()->
    Session.set 'currentView', 'newPostForm'
  post: (slug)->
    Session.set "currentView", "post"
    Session.set "currentPost", slug



Meteor.startup ()->
  new BlogRouter
  Backbone.history.start pushState:true