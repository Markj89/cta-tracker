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
    if (error) throw error;
    cb(JSON.parse(data));
  });
};

router.use(function(request, response, next) {
  let colorLine = request.body.rt;

  function transfers(args) {
    let trainStations;

    for (var color in args) {
      if (args.hasOwnProperty('colors')) {
        trainStations = args.find(obj => {
          return obj.colors === colorLine
        });
      }
    }
    console.log(trainStations);
  }

  readJson(function(cb) {
    if (!cb.error) {
      for (var i = 0; i < cb.length; i++) {
        transfers(cb[i]);
        for (var i = 0; i < cb.length; i++) {
          transfers(cb[i]);
          /*if (cb[i].colors == colorLine ) {
            filtered.push(cb[i]);
          }*/
        }
      }
    }
    response.send(JSON.stringify(request.body));
  });
});

module.exports = router;
