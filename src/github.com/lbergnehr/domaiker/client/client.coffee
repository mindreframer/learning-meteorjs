
Template.domain.results = ->
	Session.get "results"

Template.domain.hasNoResults = ->
	value = Session.get "value"
	results = Session.get "results"
	value? and value != "" and not results.length

Meteor.subscribe "domains", ->
	console.log "done loading domains"
Meteor.subscribe "searchedDomains", ->
	console.log "done loading searchedDomains"

updateSearchedDomains = (matches) -> 
	matches.forEach (m) ->
		console.log "updating searches for #{m}"
		domain = SearchedDomains.findOne {name: m}
		if domain?
			console.log "domain #{m} was searched #{domain.count} times before"
			SearchedDomains.update {_id: domain._id}, {$inc: {count: 1}}
		else
			console.log "inserting #{m} for the first time"
			SearchedDomains.insert {name: m, count: 1}
		

delayedUpdateSearchedDomains = _.debounce updateSearchedDomains, 1500
Template.domain.events
	"input #domain-name-input" : (event) ->
		value = event.target.value
		Session.set "value", value

		domains = Domains.find().fetch().map (x) -> x.name

		matches = domains.filter ((d) -> value.length >= (d.length + 2) and value.toLowerCase().endsWith(d.toLowerCase()))
		matches = matches.map (m) -> (value.slice(0, value.length - m.length) + ".#{m}").toLowerCase()
		Session.set "results", matches

		if matches? and matches.length > 0
			delayedUpdateSearchedDomains matches
		

	"focus #domain-name-input" : (event) ->
		@placeholder = event.target.placeholder
		event.target.placeholder = ""
	"blur #domain-name-input" : (event) ->
		event.target.placeholder = @placeholder

Template.popularSearches.searches = ->
	SearchedDomains.find {count: {$gt: 0}}, {sort: {count: -1}, limit: 5}