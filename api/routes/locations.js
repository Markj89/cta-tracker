const express = require('express');
const router = express.Router();
const { resolve } = require('path');
const cors = require('cors');
const request = require("request");
const fs = require('fs');

const BASE_URL = 'https://lapi.transitchicago.com/api/1.0/ttpositions.aspx'; // API Endpoint
const API_KEY = ''; // API KEY
let route;

router.post('/', function(req, res) {
  route = req.body.rt;

  // Buid Request Option
  var options = {
    method: 'GET',
    url: BASE_URL,
    qs: {
      key: API_KEY,
      rt: route,
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

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    res.send(body);
  });
});

module.exports = router;
