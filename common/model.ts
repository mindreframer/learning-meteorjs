// Leaderboard -- data model
// Loaded on both the client and the server.

declare var Meteor: any;

module Model {

  export var Players = new Meteor.Collection('players');

}
this.Model = Model; // Fix Meteor 0.6.0 var scope incompatibility.
