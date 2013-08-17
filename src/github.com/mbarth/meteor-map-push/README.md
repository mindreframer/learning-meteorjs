# Meteor MapPush

### A [Meteor](http://meteor.com) port of the [Atmosphere](https://github.com/Atmosphere/atmosphere) [MapPush](https://github.com/ncolomer/MapPush) example.

This application highlights how changes made by users are automatically transmitted to every connected
client in real-time. Test it out yourself by opening several browsers and clicking on the map to
generate GPS events. The events instantly appear on every connected client browser. This application
will work on modern browsers, tablets, and mobile devices.

### Why was it created?

In an effort to learn about building real-time applications, I chose to re-create the [MapPush](https://github.com/ncolomer/MapPush)
example (which was built using [Atmosphere](https://github.com/Atmosphere/atmosphere)) using the [Meteor](http://meteor.com)
framework. This allowed both the client and server code to be written using Javascript, which I found reduced complexity, code size,
and any configuration wiring.

### Installation

To install this project you must first create it using the `meteor create` command. Next, to clone this
code into your newly created meteor project, you must first temporarily move the `.meteor` directory out.

```
# first create the project
meteor create meteor-map-push
rm meteor-map-push/*

# temporarily move out the .meteor directory
mv meteor-map-push/.meteor/ /tmp

# clone project
git clone git@github.com:mbarth/meteor-map-push.git

# move .meteor directory back
mv /tmp/.meteor/ meteor-map-push/
cd meteor-map-push/
meteor remove autopublish

# run it on whatever port you want
meteror run --port 3000
```
