const router = require('express').Router();
const cors = require('cors');
const request = require("request");

router.use('/api', (req, res) => {
    const stationColor = (object, value) => {
        return Object.keys(object).find(key => object[key] === value && key !== 'ada');
    };

    var options = {
        method: 'GET',
        url: process.env.TRAIN_ARRIVALS, // API Endpoint
        qs: {
            key: process.env.CTA_TRAIN_API_KEY, // API KEY
            mapid: req.body.map_id,
            rt: stationColor(req.body, true),
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

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });
});

module.exports = router;
