import express from 'express';
import request from 'request';
const router = express.Router();

/**
 * GET station by Name
 * @param {*} request
 * @param {*} response
 * @param {Object}
 */
router.use('/arrivals/:_id', async (req) => {
    console.log(`Arrivals`, Date.now());
    return req.next();
});

router.get("/arrivals/:_id", async (requests, response) => {
    let options = {
        method: 'GET',
        url: process.env.TRAIN_ARRIVALS, // API Endpoint
        qs: {
            key: process.env.CTA_TRAIN_API_KEY, // API KEY
            mapid: requests?.params?._id, // Stop ID
            //rt: stationColor(requests.params, true),
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
        if (error) throw new Error(error);
        response.send(body);
        response.end();
    }));
});

export default router;