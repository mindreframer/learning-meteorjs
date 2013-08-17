PowerPinkPlay
==========
A sample app to demonstrate how a real-time collaborative music player would be implemented using Meteor (http://meteor.com). Try it out on http://powerpinkplay.com, add tracks, scrub, play, pause, reorder and remove tracks, and make sure you try it with the same playlist open in two browers at the same time. It's soooooo cooool!!! It does, unfortunately, not play any actual music yet.


How to get it running on your machine
==============================
1. Install meteor
$ curl install.meteor.com | /bin/sh

2. Check out the project
git clone git://github.com/mpj/powerpinkplay.git

3. Run it!
cd powerpinkplay && meteor


Structure
-------------
This little app is also an experiment on how to implemented the Model-View-ViewModel (MVVM) pattern (http://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/) in Meteor, since I felt that it's very suited for it. The views each have their own subdirectory with the following structure:

create_playlist <- The name of the view
	
	template.html
	The template and child templates/partials. This could be referred to as the view, if you will.

	style.css
	The CSS specific to this view.

	presenter.js
	The presenter (which could also have been named ViewModel) contains all the logic, and is meant to be an abstract representation of the state of the view. The idea is that the only things the view does are listening to the presenter and mimicing it, and forwarding any user interaction events to the presenter.  The presenter is blissfully unaware of how the view actually looks, and doesn't know about the DOM. This is really good for keeping your application loosely coupled, letting out create multiple views without re-writing logic. It's also awesome for testability, because the the interface logic is decoupled from hard-to-test stuff like the DOM and input. I've not written any tests for this experiment, though, because I'm lazy.

	template.js
	Basically glue between template.html and presenter.js. There is some annoying duplication going on in this part of the application, and I'd like to experiment with getting rid of some glue (with some fancy metaprogramming, perhaps, or using derby.js instead of Meteor). It's very annoying, since one of the reasons for using MVVM is to reduce glue code.

Mixins
-----------------------
MVVM is kind of my go-to-tool when developing advanced client apps, and while I find it extremely versatile and nice to work with, it does have the drawback that a lot of existing plugins just doesn't mesh well with the pattern. It turns messy, and breaks the nice decoupling that MVVM offers. So, when developing this, I wrote two generalized mixins - one for handling drag-n-drop sorting (for the playlists) and one for handling typeahead from presenters. Methinks they will come in handy some day. If we continued developing this very app, the typeahead could be re-used by mixing it in with create_playlist to have the playlist creation field double as a playlist search, perhaps. 

Reactive programming in Meteor
-----------------------
I really, really like reactive programming (http://en.wikipedia.org/wiki/Reactive_programming). I have worked a lot in Adobe Flex, and as much as a I loathe it in many ways, it's reactive bidnings are very powerful, and almost offers a completely new way of programming if you do it right. The Meteor framework excites me tremedously, because it makes the client reactive to server events in a very transparent way that is TOTALLY SUPER AWESOME. It does look very magic, but it's actually not all that complicated - the gist of it is explained here: http://docs.meteor.com/#reactivity

Authentication in Meteor
-----------------------
Authentication is not yet implemented in Meteor, and I have not bothered to implement it myself either. Any further work would probably involve making some rudimentary authenticaton and doing some more selective publishing, instead of using the crazy default autopublish of Meteor.


Dependencies in Meteor
-----------------------
Meteor lacks requires on the client, and falls back on simply loading scripts depth-first and then alphabetically, with the expection of the lib directory, which is loaded first. I've worked with this and simply gave files and directories underscore naming to give it the loading order I wanted, but I definitely feed the need to create something more elegant here.

