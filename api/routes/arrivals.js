const express = require('express');
const router = express.Router();
const cors = require('cors');
const request = require("request");

router.post('/', (req, res) => {
    const stationColor = (object, value) => {
        return Object.keys(object).find(key => object[key] === value && key !== 'ada');
    };

    var options = {
        method: 'GET',
        url: process.env.ARRIVALS, // API Endpoint
        qs: {
            key: process.env.CTA_KEY, // API KEY
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
