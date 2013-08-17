var connectionWarningMessage = 'Select <strong><i class="icon-resize-small"></i> Connect</strong> to receive and transmit GPS events';

var GPSEvents;
GPSEvents = new Meteor.Collection('gps_events');

Meteor.startup(function() {
    console = (!window.console) ? {} : window.console;
    console.log = (!window.console.log) ? function() {} : window.console.log;
    mapAgent.init('map-canvas', [0, 0], 1);
    var bounds = mapAgent.getBounds();
    Session.set('bounds', bounds);
    Session.set('connected', false);
    statsAgent.totalCallback = function(total) { $('.tre').text(total); };
    statsAgent.epsCallback = function(eps) { $('.eps').text(eps); };
    connectionAgent.init(Events);
    return Toast.defaults.displayDuration = 1000;
});

Meteor.autosubscribe(function() {
    Meteor.subscribe('gps_events_subscription', Session.get('connected'), Session.get('bounds'));
    var row = GPSEvents.findOne({});
    if (row != undefined) {
        statsAgent.notify();
        var latlng = {'lat': row.gps_event.lat, 'lng': row.gps_event.lng};
        mapAgent.drawEvent(latlng);
    }
});

_.extend(Template.controls, {
    events: {
        'click #btn-connection button': function(evt) {
            var button = $(evt.currentTarget);
            if(!button.hasClass('active')) {
                $('#btn-connection button').removeClass('active');
                button.addClass('active');
                switch (button.attr('id')) {
                    case 'btn-connection-connect':
                        console.log("Connecting...");
                        connectionAgent.connect();
                        break;
                    case 'btn-connection-disconnect':
                        console.log("Disconnecting...");
                        connectionAgent.disconnect();
                        break;
                }
            }
        },
        'click #btn-generation button': function(evt) {
            var button = $(evt.currentTarget);
            if(!button.hasClass('active')) {
                $('#btn-generation button').removeClass('active');
                button.addClass('active');
                switch (button.attr('id')) {
                    case 'btn-generation-start':
                        console.log("starting...");
                        gpsGeneratorAgent.start($('#interval').val());
                        if (!connectionAgent.connected()) {
                            return Toast.warning(connectionWarningMessage);
                        }
                        break;
                    case 'btn-generation-stop':
                        console.log("stopping...");
                        gpsGeneratorAgent.stop();
                        break;
                }
            }
        },
        'change #interval': function(evt) {
            var interval = $(evt.currentTarget);
            if ($('#btn-generation-start').hasClass('active')) {
                console.log('restarting with new interval: ' + interval.val());
                gpsGeneratorAgent.restart(interval.val());
                if (!connectionAgent.connected()) {
                    return Toast.warning(connectionWarningMessage);
                }
            }
        },
        'click #btn-stats': function(evt) {
            var button = $(evt.currentTarget);
            if (!button.hasClass('active')) {
                button.addClass('active');
                $('#map-stats').show();
                statsAgent.start();
            } else {
                button.removeClass('active');
                $('#map-stats').hide();
                statsAgent.stop();
            }
        }
    }
});