console.log("client/templates.coffee")
ifViewing = (viewName) -> Session.get("currentView") is viewName


Template.header.adminLoggedIn = ()-> adminLoggedIn()
Template.header.events
  "click button": () -> Backbone.history.navigate '/new', true


Template.newPostForm.show = ()-> ifViewing 'newPostForm'
Template.newPostForm.events

  'keyup #title': (e,t) ->
    t.find('#slug').value = t.find('#title').value.toLowerCase().split(" ").join("-")
  "click button": (e,t) ->
    slug = t.find('#slug').value

    Meteor.call "post",
      t.find('#content').value,
      t.find('#title').value
      slug
      (err, id) -> console.log(id)


Template.posts.show = ()-> ifViewing("posts") or ifViewing("post")
Template.posts.posts = ()->
  if ifViewing "post"
    Posts.find( slug: Session.get 'currentPost')
  else
    #Posts.find {}, {sort: {createdOn: -1}}
    Posts.find()