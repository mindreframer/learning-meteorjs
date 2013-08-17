# My Workfiles while going through the Meteor Course:
  - https://tutsplus.com/course/building-single-page-web-application-with-meteor-js/

## Loading in Meteor:

  - deeper files are loaded first
  - client folder -> for client
  - server folder -> for server
  - main.js files are loaded at THE END
  - lib folder(s) are magic, is loaded before all other files



## Run after everything is loaded:
  - Meteor.startup(function...)


## CSS
  - loaded only on client
  - same rules apply


## Public assets
  - only images



## Templates

  - head tags + body tags from all html files will be concatenated and sent as one file to the client

  - has callbacks
    - rendered
    - created
    - destroyed

  - this.data -> the object, that was passed to the template


## Collections

  ... cool stuff.



## Smart Packages
  # https://tutsplus.com/lesson/smart-packages/

  $ meteor remove ...
  $ meteor add ...
  $ meteor list

## Publishing & Subscribing with Collections




## Accounts
  # https://tutsplus.com/lesson/the-meteor-account-system/
  - meteor add accounts-base
  - meteor add accounts-password
  - meteor add accounts-ui


### Controlling Database Access

  Meteor.user()
  Meteor.userId()

  # works
  Items.insert({name: "one", owner: Meteor.userId()})


### Email


### Deploying


### Backbone