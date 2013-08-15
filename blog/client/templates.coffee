console.log("client/templates.coffee")
ifViewing = (viewName) -> Session.get("currentView") is viewName


Template.header.adminLoggedIn = ()-> adminLoggedIn()
Template.header.events
  "click button": () -> Backbone.history.navigate '/new-post', true


Template.newPostForm.show = ()-> ifViewing 'newPostForm'