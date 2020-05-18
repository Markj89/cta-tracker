'use strict';

const express = require('express');
const app = express();

const router = express.Router();
const path = require('path');
const cors = require('cors');
const request = require("request");
var fs = require('fs');
let name;
let station;

const BASE_URL = 'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx'; // API Endpoint
const API_KEY = ''; // API KEY

var readJson = function(cb) {
  fs.readFile(__dirname + '/stops.json', 'utf8', (error, data) => {
    if (error) throw error;
    cb({stations: JSON.parse(data)});
  });
};

router.use(function(request, repsonse, next) {
  let stationSent = request.body.station;
  readJson(function(cb) {
    if (!cb.error) {
      for (var stations in cb.stations) {
        for (var i = 0; i <  cb.stations[stations].length; i++) {
          station = cb.stations[stations][i];
          if (station.hasOwnProperty("name") && station["name"] === stationSent) {
            Object.assign(request.body, station);
            next();
          }
        }
      }
    }
  });
});

router.post('/', function(req, res) {

  var color = req.body.colors.values();

  var options = {
    method: 'GET',
    url: BASE_URL,
    qs: {
      key: API_KEY,
      mapid: req.body.id,
      rt: color,
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
