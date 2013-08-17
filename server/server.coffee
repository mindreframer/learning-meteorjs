Meteor.startup ->
	console.log "domaiker server started."

	insertDefaultDomains() if Domains.find().count() == 0

Meteor.publish "domains", ->
	Domains.find()
Meteor.publish "searchedDomains", ->
	SearchedDomains.find()

SearchedDomains.allow({
	update: -> true
	insert: -> true
})

insertDefaultDomains = () ->
	console.log "Inserting default domain names."

	res = Meteor.http.get "http://data.iana.org/TLD/tlds-alpha-by-domain.txt"
	return if !res?

	data = res.content
	domains = data.split "\n"
	domains.forEach (domain) ->
		if domain.indexOf("#") != 0 and domain != ""
			console.log "Inserting '#{domain}'"
			Domains.insert {name : domain}

