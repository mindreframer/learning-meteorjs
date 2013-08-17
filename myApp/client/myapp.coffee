Contacts = new Meteor.Collection("contacts")

#This will get records from the server, each time a pager link is clicked
Meteor.autosubscribe ->
  Meteor.subscribe "contacts", Session.get("page_size"), Session.get("start_record"), Session.get("last_record"), Session.get("sort_field"), Session.get("sort_direction")


$.extend Template.contacts,
contacts: ->
  Contacts.find {}


