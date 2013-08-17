/**
 * An observer is added to GPS events received (inserted into the mongo
 * 'events' collection). If the client is connected and the GPS event
 * is within their map bounds, the event is added to the client side
 * 'gps_events' collection. The GPS event is then removed from the mongo
 * 'events' collection.
 */
Meteor.publish('gps_events_subscription', function(connected, bounds) {
    var self = this;
    var uuid = Meteor.uuid();
    var handle = Events.find({}).observe({
        added: function(doc, idx) {
            if (connected != undefined && connected == true) {
                var lat = doc.lat;
                var lng = doc.lng;
                if (lat > bounds.southLat && lat <= bounds.northLat &&
                    lng > bounds.westLng && lng <= bounds.eastLng) {
                    self.set('gps_events', uuid, {gps_event: doc});
                    self.flush();
                }
                return Events.remove({_id: doc._id}, function(err) {
                    return [];
                });
            }
        }
    });
    self.complete();
    self.flush();
    self.onStop(function() {
        handle.stop();
        self.flush();
    });
});

Meteor.startup(function () {
});