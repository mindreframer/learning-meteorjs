/**
 * HTML5 Web Worker responsible for generating random
 * GPS lat/lng coordinates.
 */
var gpsGeneratorWorker = {
    interval: 2000,
    'generateGPSEvent': function() {
        var self = this;
        setTimeout(function() {
            self.getMapPoints(self.postMessageCallback)
        }, self.interval);
    },
    'postMessageCallback': function(value) {
        postMessage(value);
    },
    'getMapPoints': function(callback) {
        callback(this.getRandomMapPoints());
        this.generateGPSEvent();
    },
    'getRandomMapPoints': function() {
        // LATITUDE -90 to +90
        var lat = this.getRandomInRange(-90, 90, 3);
        // LONGITUDE -180 to + 180
        var lng = this.getRandomInRange(-180, 180, 3);
        return {lat: lat, lng: lng};
    },
    'getRandomInRange' : function(from, to, fixed) {
        // .toFixed() returns string, so ' * 1' converts result to number
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }
};

onmessage = function(e) {
    var data = e.data;
    if (e.data.interval != undefined) {
        gpsGeneratorWorker.interval = parseInt(e.data.interval);
    }
    switch (data.cmd) {
        case 'start':
            // send out initial GPS event, so user is not waiting for interval
            postMessage(gpsGeneratorWorker.getRandomMapPoints());
            // start generating gps events using timeout interval
            gpsGeneratorWorker.generateGPSEvent();
            break;
        case 'stop':
            close(); // Terminates the worker.
            break;
        default:
            postMessage('Unknown command');
    };
};
