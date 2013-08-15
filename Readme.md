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