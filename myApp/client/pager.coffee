# Variables for pageing
Session.set "page_size", 10
Session.set "start_record", 0
Session.set "last_record", false
Session.set "total_pages", 0
Session.set "total_records", 0
Session.set "current_page", 1

#Variables for enableing/disableing pager links
Session.set "firstEnabled", ""
Session.set "previousEnabled", ""
Session.set "nextEnabled", ""
Session.set "lastEnabled", ""


#Get the total record count for use in the pager
if Meteor.is_client
	Meteor.startup ->
		Meteor.call("ContactsCount", myFunc)

###	This is the call back function when the server
		function 'Meteor.call("ContactsCount", myFunc)' is called
		When the result from the server call is returned, this will be executed ###
myFunc = (error, result) ->
	if !error
		pages = result / Session.get("page_size")
		Session.set "total_pages", Number(pages.toFixed(0) + 1)
		Session.set "total_records", result
  if error
  	alert error

### This function will set the css classes
		for enabling or disabling the pager buttons
		in the Pager Template in myapp.html ###
SetPagerButtons = ->
	Meteor.call("ContactsCount", myFunc)
	if Session.get("current_page") <= 1
		Session.set "nextEnabled", ""
		Session.set "lastEnabled", ""
		Session.set "firstEnabled", "disabled"
		Session.set "previousEnabled", "disabled"
		Session.set "last_record", false
	else if Session.get("last_record") or Session.equals("current_page", Session.get("total_pages"))
		Session.set "nextEnabled", "disabled"
		Session.set "lastEnabled", "disabled"
		Session.set "firstEnabled", ""
		Session.set "previousEnabled", ""
	else
		Session.set "nextEnabled", ""
		Session.set "lastEnabled", ""
		Session.set "firstEnabled", ""
		Session.set "previousEnabled", ""
		Session.set "last_record", false

$.extend Template.pager,
CurrentPage: ->
	Session.get("current_page")
TotalPages: ->
	Session.get("total_pages")
firstEnabled: ->
	Session.get("firstEnabled")
previousEnabled: ->
	Session.get("previousEnabled")
nextEnabled: ->
	Session.get("nextEnabled")
lastEnabled: ->
	Session.get("lastEnabled")


events:
	'click .next_record': ->
		StartRecord = Session.get("start_record") + Session.get("page_size")
		currentpage = Session.get("current_page") + 1
		if Session.get("current_page") < Session.get("total_pages")
			Session.set "current_page", currentpage
			Session.set "last_record", false
			Session.set "start_record", StartRecord
		SetPagerButtons()
	'click .previous_record': ->
		if Session.get("current_page") > 1
			Session.set "last_record", false
			Session.set "start_record", Session.get("start_record") - Session.get("page_size")
			Session.set "current_page", Session.get("current_page") - 1
		SetPagerButtons()
	'click .first_record': ->
		Session.set "last_record", false
		Session.set "start_record", 0
		Session.set "current_page", 1
		SetPagerButtons()
	'click .last_record': ->
		Session.set "start_record", Session.get("total_records") - Session.get("page_size")
		Session.set "last_record", true
		Session.set "current_page", Session.get("total_pages")
		SetPagerButtons()

