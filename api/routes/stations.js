'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const request = require("request");
const path = require('path');
var fs = require('fs');
let filtered = [];
let stations_w_tranfsers = {};

var readJson = function(cb) {
  fs.readFile(__dirname + '/stops.json', 'utf8', (error, data) => {
    //if (error) throw error;
    cb(JSON.parse(data));
  });
};

router.use(function(request, response) {
  let colorLine = request.body.rt;

  function transferStations(transfers) {
    transfers.filter((transfer) => {
      stations_w_tranfsers[transfers] = transfer;
      return stations_w_tranfsers[transfers] == colorLine
    });
  }

  readJson(function(cb) {
    if (!cb.error) {
      for (var i = 0; i < cb.length; i++) {
        if (cb[i].colors == colorLine ) {
          filtered.push(cb[i]);
        }
      }
      console.log(filtered);
    }
  });
});

module.exports = router;
