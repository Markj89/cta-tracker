//const Station = require('../models/station.model');
//const conn = require('./../db/conn.js');
import conn from './../db/conn.mjs';
import Station from '../models/station.model.mjs';

/**
 * Find all Stations
 * @param {*} req 
 * @param {*} res 
 * @param {Object}
 */
exports.findAllStations = async () => {
    //const collection = await conn.collection("Station");
    //const stations = collection.find({}).toArray();
    Station.find().then((stations) => {
        res.json(stations);
    }).catch((error) => {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving tutorials.'
        });
    });
}

/**
 * Find by ID 
 * @param {*} req
 * @param {*} res
 * @param {Object}
 */
exports.findById = (req, res) => {
    Station.findById(req.params.id).then((stations) => {
        res.json(stations);
    }).catch((err) => {
        res.status(400).json('Error: ' + err);
    });
}

/**
 * Find be Color
 * @param {*} req
 * @param {*} res
 * @param {Object}
 */
exports.findByColor = (req, res) => {
    const query = `stops.${req.params.color}`;
    Station.find({ [query] : true }, (err, stations) => {
        const stationsByColor = stations.map((station) => station);
        res.json(stationsByColor);
    });
}