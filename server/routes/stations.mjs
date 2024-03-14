import express from 'express';
import conn from '../db/conn.mjs';
import { ObjectId } from "mongodb";
import request from 'request';
const router = express.Router();

/**
 * Find all Stations
 * @param {*} res 
 * @param {Object}
 */
router.get('/', async (req, res) => {
    //console.log(`Route Main Page: ${req.protocol}://${req.get('host')}${req.originalUrl}`);

    let collection = await conn.collection("Stations");
    const results = await collection.find({}).toArray();
    console.log(results);
    /*if (results?.error) {
        res.send({
            message: error.message || 'Some error occurred while retrieving tutorials.'
        }).status(500);
    } else {
        res.status(200).send(results);
    }*/
});

/**
 * Get a single stations
 * @param {*} req
 * @param {*} res
 * @param {Object}
 */
router.get("/:_id", async (requests, response) => {
    console.log(`Route Single Stop: ${requests.protocol}://${requests.get('host')}${requests.originalUrl}`);
    let collection = await conn.collection("Stations");
    //db.theColl.find( { "_id": ObjectId("4ecbe7f9e8c1c9092c000027") } )

    const results = await collection.find({ _id: ObjectId("64ebbdc11222861efa37c5f8") }).toArray();
    console.log(results);
    const stationColor = (object, value) => {
        return Object.keys(object).find(key => object[key] === value && key !== 'ada');
    };

    let options = {
        method: 'GET',
        url: process.env.TRAIN_ARRIVALS, // API Endpoint
        qs: {
            key: process.env.CTA_TRAIN_API_KEY, // API KEY
            mapid: requests?.params?._id, // Stop ID
            rt: stationColor(requests.params, true),
            outputType: 'json'
        },
        headers: {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Accept-Encoding': 'gzip, deflate',
            Host: 'lapi.transitchicago.com',
            'Cache-Control': 'no-cache',
            Accept: '*/*'
        }
    };

    request(options, ((error, res, body) => {
        //console.log(res)
        if (error) throw new Error(error);
        response.send(body);
    }));
});

/**
 * Find be Color
 * @param {*} req
 * @param {*} res
 * @param {Object}
 */
router.get(`/find/:color`, async (req, res) => {
    const query = `stops.${req.params.color}`;
    let collection = await conn.collection("Stations");
    let result = await collection.find(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


export default router;
