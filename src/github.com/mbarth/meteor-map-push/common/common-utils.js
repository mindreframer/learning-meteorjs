var commonUtils = {
    logJSON: function(object) {
        if (typeof object != 'undefined') {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    console.log('\t' + key + " -> " + object[key]);
                }
            }
        }
    }
};