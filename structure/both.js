if (Meteor.isClient){
  console.log("both.js (client)")
}

if (Meteor.isServer){
  console.log("both.js (server)");
}


Meteor.startup(function(){
  if (Meteor.isClient){
    console.log("both.js startup (client)")
  }

  if (Meteor.isServer){
    console.log("both.js startup (server)");
  }
})