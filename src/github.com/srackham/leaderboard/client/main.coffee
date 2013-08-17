# Leaderboard -- client

Meteor.startup ->
  bootbox.animate false
  Toast.defaults.width = '400px'
  Toast.defaults.displayDuration = 1000

Meteor.subscribe 'players'

Template.navbar.events
  'click .sort_by_name': -> Session.set 'sort_by_name', true
  'click .sort_by_score': -> Session.set 'sort_by_name', false
  'click .reset_data': ->
    bootbox.confirm 'Are you sure you want to reset the data?', 'No', 'Yes',
    (confirmed) ->
      if confirmed
        Meteor.call 'reset_data', (error) -> Toast.error(error.reason)

Template.leaderboard.players = ->
  sort = if Session.get('sort_by_name') then name: 1 else score: -1
  Players.find {}, sort: sort

Template.leaderboard.events
  'click #add_button, keyup #player_name': (evt) ->
    return if evt.type is 'keyup' and evt.which isnt 13 # Key is not Enter.
    input = $('#player_name')
    if input.val()
      Players.insert {
        name: input.val()
        score: Math.floor(Math.random() * 10) * 5
        },
      (err) -> Toast.error(err.reason) if err
      input.val ''
    else
      Toast.warning 'Enter New Player'

Template.player.events
  'click .increment': ->
    Players.update @_id, $inc: {score: 5},
      (err) -> Toast.error(err.reason) if err
  'click .remove': ->
    Players.remove @_id,
    (err) -> Toast.error(err.reason) if err
  'click': ->
    $('.tooltip').remove()  # To prevent zombie tooltips.

Template.player.rendered = ->
  # Update tooltips after the template has rendered.
  $('[rel=tooltip]').tooltip()
