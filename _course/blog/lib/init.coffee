console.log("lib/init.coffee")
Posts = new Meteor.Collection 'posts'
adminLoggedIn = ()-> Meteor.user()?.emails?[0].address is "joe@blog.com"


# so we can play in console with it

root = null
if Meteor.isClient
  root = window
if Meteor.isServer
  root = global

root.Posts         = Posts
root.adminLoggedIn = adminLoggedIn
