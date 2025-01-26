import express from 'express';
import conn from '../db/conn.mjs';
import { ObjectId } from "mongodb";
import rateLimtit from 'express-rate-limit';

const router = express.Router();

// Set up rate limiting for your routes (e.g., 100 requests per 15 minutes)
const limiter =  rateLimtit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.',
    headers: true, // Optionally include rate limit info in response headers
});

// Apply rate limiting to all routes (or use on specific routes)
router.use(limiter);

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
router.get(`/api/find/:color`, async (req, res) => {
    const query = `stops.${req.params.color}`;
    let collection = await conn.collection("Stations");
    //let result = await collection.find(query);
    let result = await collection.find({ [query]: { $exists: true } }).toArray(); // Adjusted query to look for a valid result

    //if (!result) res.send("Not found").status(404);
    //else res.send(result).status(200);
    if (result.length === 0) {
        res.status(404).send("Not found");
    } else {
        res.status(200).send(result);
    }
});

export default router;
