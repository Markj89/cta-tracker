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

module.exports = router;