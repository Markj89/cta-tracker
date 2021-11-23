const router = require('express').Router();
let Station = require('../models/station.model');

router.route('/').get((req, res) => {
    Station.find().then((stations) => {
        res.json(stations);
    }).catch((error) => {
        res.status(400).json('Error: ' + error);
    });
});

router.route('/:id').get((req, res) => {
    Station.findById(req.params.id).then((stations) => {
        res.json(stations);
    }).catch((err) => {
        res.status(400).json('Error: ' + err);
    });
});

// Find stations by color
router.route(`/find/:color`).get((req, res) => {
    var query = `stops.${req.params.color}`;
    Station.find({ [query] : true }, function(err, stations) {
        var stationsByColor = stations.map(function(station) { 
            return station; 
        });
        res.json(stationsByColor);
    });
});

module.exports = router;