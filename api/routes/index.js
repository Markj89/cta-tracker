var express = require('express');
var router = express.Router();
const fs = require('fs');
let stationFile = __dirname + '/stations.json';

/* GET home page. */
router.get('/', function(req, res, next) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Max-Age": 2592000
    };

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (["GET", "POST"].indexOf(req.method) > -1) {
        res.writeHead(200, headers);
        fs.createReadStream(stationFile, 'utf8').pipe(res);
        return;
    }

    res.writeHead(405, headers);
    res.send(stationFile);
});

module.exports = router;
