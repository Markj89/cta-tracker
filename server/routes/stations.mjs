import express from 'express';
import conn from '../db/conn.mjs';
//import Station from './../controllers/stations.controller';
const router = express.Router();

//router.get('/', StationController.findAllStations);
router.get('/', async (req, res) => {
    const collection = await conn.collection("Stations");
    console.log(collection);
    //const stations = collection.find({}).toArray();
});
//router.get('/:id', StationController.findById);
//router.get(`/find/:color`, StationController.findByColor);

export default router;

/*router.get('/', async (req, res) => {
    Station.find().then((stations) => {
        res.json(stations);
    }).catch((error) => {
        res.status(400).json('Error: ' + error);
    });
    //const collection = await conn.collection('stations');
    //const stations = await collection.find({}).toArray();
    //res.send(stations).status(200);
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
});*/
