var DistanceMatrixService = require ('google-distance-matrix');

var origins = ['Via Caduti Del Lavoro 53 Ancona'];
var destinations = ['Via Russi 31 Ancona', 'Piazza Cavour Ancona'];

DistanceMatrixService.key(process.env.GOOGLE_MAPS_API_KEY);
DistanceMatrixService.mode('driving');
DistanceMatrixService.language('it');

var matrix = DistanceMatrixService.matrix(origins, destinations, function (err, distances) {
    if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
});

module.exports = matrix;