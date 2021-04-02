const http = require('http');
const dotenv = require('dotenv');
const fs = require('fs');
let stationFile = __dirname + '/stations.json';

dotenv.config();
const host = '127.0.0.1';
const port = `${process.env.PORT}`;
console.log(`You're port is ${port}`);

fs.readFile(stationFile, (err, data) => {
    if (err) throw err;
    const stations = JSON.parse(data, null, 2);
});

const server = http.createServer((req, res) => {
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
    res.end(stationFile);
    //res.end(`${req.method} is not allowed`);
}).listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

function onError(error) {
    if (error.syscall !== 'listen') throw error;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}