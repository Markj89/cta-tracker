import axios from 'axios';
import express from 'express';
const router = express.Router();

/**
 * GET station by Name
 * @param {*} request
 * @param {*} response
 * @param {Object}
 */
router.use('/:_id', async (req) => {
    console.log(`Arrivals`, Date.now());
    return req.next();
});

router.get("/:_id", async (requests, response) => {
    let options = {
        method: 'GET',
        url: `${process.env.TRAIN_ARRIVALS}?mapid=${requests?.params?._id}&key=${process.env.CTA_TRAIN_API_KEY}&outputType=JSON`, // API Endpoint
        headers: {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Accept-Encoding': 'gzip, deflate',
            Host: 'lapi.transitchicago.com',
            'Cache-Control': 'no-cache',
            Accept: '*/*'
        }
    };
    axios.request(options)
    .then((res) => {
        response.status(200).send(res.data);
    }).catch((error) => {
        if (error) {
            res.send("Not found").status(404);
            console.log(error);
        }
    });
});

export default router;