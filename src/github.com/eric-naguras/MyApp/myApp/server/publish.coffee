Contacts = new Meteor.Collection("contacts")

Meteor.publish "contacts", (page_size, start_record, last_record, sort_field, sort_direction) ->
  if !last_record
    Contacts.find {},
      skip: start_record
      limit: page_size
      sort: sort(sort_field, sort_direction)

  else
    start_record = Contacts.find().count() - page_size
    Contacts.find {},
      skip: start_record
      limit: page_size
      sort: sort(sort_field, sort_direction)


sort = (sort_field, sort_direction) ->
  if sort_direction
    if sort_field is "FirstName"
      return FirstName: 1
    if sort_field is "LastName"
      return LastName: 1
    if sort_field is "City"
      return City: 1
    if sort_field is "Email"
      return Email: 1
  else
    if sort_field is "FirstName"
      return FirstName: -1
    if sort_field is "LastName"
      return LastName: -1
    if sort_field is "City"
      return City: -1
    if sort_field is "Email"
      return Email: -1

