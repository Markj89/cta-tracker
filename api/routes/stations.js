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

router.connect('http://localhost:3000', function(err, db) {
    if (err) throw err;
    var dbo = db.db("cta_stations");
    var query = { g: true };
    /*dbo.collection("stations").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });*/
});

module.exports = router;