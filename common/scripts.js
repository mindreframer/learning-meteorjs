/**
 * Controls starting/stopping/restarting the generation
 * of random GPS events.
 */
var gpsGeneratorAgent = {
    worker: null,
    'start': function(interval) {
        worker = new Worker('gpsGeneratorWorker.js');
        worker.addEventListener('message', function(e) {
            /**
             * Only display randomly generated GPS events
             * if user is connected and/or return message
             * data contains lat/lng coordinates
             */
            if (e.data.lat != undefined &&
                Session.get('connected') != undefined &&
                Session.get('connected') == true) {
                // allows us to transmit randmon GPS event to users
                Events.insert(e.data);
                statsAgent.notify();
                mapAgent.drawEvent(e.data);
            }
        }, false);
        worker.postMessage({'cmd': 'start', 'interval': interval});
    },
    'stop': function() {
        worker.postMessage({'cmd': 'stop'});
    },
    'restart': function(interval) {
        this.stop();
        this.start(interval);
    }
};

/**
 * Controls session variables used to send/receive GPS
 * events to server.
 */
var connectionAgent = {
    eventHandler: null,
    'init': function(eventHandler) {
        this.eventHandler = eventHandler;
    },
    'connect': function() {
        /**
         * Connect/Disconnect allows user to toggle off receiving events.
         */
        Session.set('connected', true);
    },
    'connected': function() {
        return Session.get('connected');
    },
    'disconnect': function() {
        /**
         * Connect/Disconnect allows user to toggle off receiving events.
         */
        Session.set('connected', false);
    },
    'update': function(bounds) {
        /**
         * Session variable is used on server-side to restrict events
         * returned to only those within user's map bounds limiting
         * bandwidth.
         */
        Session.set('bounds', bounds);
    },
    'trigger': function(latlng) {
        // transmit randmon GPS event to users
        this.eventHandler.insert(latlng);
    }
};

/**
 * Controls EPS (events/sec) and total events generated statistics.
 */
var statsAgent = {
    frequency: 1000,
    totalEvent: 0,
    numEvent: 0,
    running: false,
    timer: null,
    totalCallback: null,
    epsCallback: null,
    'process': function() {
        var eps = (this.numEvent / this.frequency) * 1000;
        this.numEvent = 0;
        if (this.epsCallback) this.epsCallback(eps);
    },
    'start': function() {
        this.stop();
        this.timer = setInterval(function() {statsAgent.process();}, this.frequency);
        this.running = true;
        this.numEvent = 0;
    },
    'stop': function() {
        clearInterval(this.timer);
        this.running = false;
    },
    'notify': function() {
        this.numEvent++;
        this.totalEvent++;
        if (this.totalCallback) this.totalCallback(this.totalEvent);
    }
};

/**
 * Controls map view drawing GPS events. Handles click and move events.
 */
var mapAgent = {
    locationPinInterval: 5000,
    map: null,
    'init': function(target, center, zoom) {
        var map = L.map(target).setView(center, zoom);
        L.Icon.Default.imagePath = 'img';
        L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
            subdomains: ['otile1','otile2','otile3','otile4'],
            maxZoom: 18
        }).addTo(map);
        this.map = map;
        // Add listeners
        map.on('click', function(event) {
            // send clicked event to server
            if (!connectionAgent.connected()) {
                return Toast.warning(connectionWarningMessage);
            } else {
                connectionAgent.trigger(event.latlng);
            }
        });
        map.on('moveend', function(event) {
            // set new bounds to be used by server,
            // server only returns events within map bounds of client
            connectionAgent.update(mapAgent.getBounds());
        });
    },
    'getBounds': function() {
        var bounds = this.map.getBounds();
        return {
            'southLat': bounds.getSouthWest().lat,
            'northLat': bounds.getNorthEast().lat,
            'westLng': bounds.getSouthWest().lng,
            'eastLng': bounds.getNorthEast().lng
        };
    },
    'drawEvent': function(json) {
        var marker;
        marker = L.marker([json.lat, json.lng]).addTo(mapAgent.map);
        setTimeout(function() {
            mapAgent.map.removeLayer(marker);
        }, this.locationPinInterval);
    }
};