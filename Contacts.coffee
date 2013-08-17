Contacts = new Meteor.Collection 'contacts'

reset_data = ->
	Contacts.remove {}
	names = [ 	'Ada Lovelace',
	            'Grace Hopper',
	            'Marie Curie',
	            'Carl Friedrich Gauss',
	            'Nikola Tesla',
	            'Claude Shannon',
	            'Issac Newton',
			]
	for name in names
    Contacts.insert
      name: name
      inout: "out"

if Meteor.is_client

	$.extend Template.contacts,
    contacts: ->
    	sort = if Session.get('sort_by_name') then name: 1  else inout: 1, name: 1
    	Contacts.find {}, sort: sort
    inoutHeader: -> if Session.get('sort_by_name') then "In/Out"  else "In/Out \u25BC"
    nameHeader: -> if Session.get('sort_by_name') then "Name \u25BC"  else "Name"
    events:
    	'click .inoutHeader': ->  Session.set 'sort_by_name', false
    	'click .nameHeader': ->  Session.set 'sort_by_name', true

  $.extend Template.contact,
    in: -> if @inout == "in" then "btn-success" else ""
    out: -> if @inout == "out" then "btn-inverse" else ""
    events:
      'click .inBtn': -> 
      	Contacts.update @_id, $set: {inout: "in"}
      'click .outBtn': -> Contacts.update @_id, $set: {inout: "out"}

  $.extend Template.navbar,
    events:
      'click .sort_by_name': -> 
      	Session.set 'sort_by_name', true
      'click .sort_by_inout': -> 
      	Session.set 'sort_by_name', false
      'click .reset_data': -> reset_data()

# On server startup, create some players if the database is empty.
if Meteor.is_server
  Meteor.startup ->
    reset_data() if Contacts.find().count() is 0