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
    console.log(`Route Main Page: ${req.protocol}://${req.get('host')}${req.originalUrl}`);

    let collection = await conn.collection("Stations");
    const results = await collection.find({}).toArray();
    if (results?.error) {
        res.send({
            message: error.message || 'Some error occurred while retrieving tutorials.'
        }).status(500);
    } else {
        res.status(200).send(results);
        res.end();
    }
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
