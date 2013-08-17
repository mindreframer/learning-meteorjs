Meteor.startup ->
	Meteor.methods
    #This will return the total number of all contacts in the database
    #It is needed for the pager to work correctly
		ContactsCount: ->
  		Contacts.find().count()
			console.log("Server method is called. Totalrecords: " + Contacts.find().count())


  #If you want a smaller set of records to work with
  #change the value of nr_or_records_to_create
  #like: nr_or_records_to_create = 100
  nr_or_records_to_create = data.length
  i = 0
  if Contacts.find().count() is 0
    while i < nr_or_records_to_create
      info = data[i]
      Contacts.insert info
      i++

