
root = exports ? this
root.Domains = new Meteor.Collection "domains"
root.SearchedDomains = new Meteor.Collection "searchedDomains"

String::endsWith = (str) -> if @match(new RegExp "#{str}$") then true else false