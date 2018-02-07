const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const csv = path.join(__dirname, 'log.csv');
const userData = [];

app.use((req, res, next) => {
    // write your logging code here
    const agent = req.headers['user-agent'];
    const time = new Date();
    const stringTime = time.toISOString();
    const method = req.method;
    const resource = req.path;
    const version = 'HTTP/' + req.httpVersion;
    const status = res.statusCode;
    const comma = ','
    const data = agent + comma + stringTime + comma + method + comma + resource + comma + version + comma + status;

    var log = {
        'Agent': agent,
        'Time': stringTime,
        'Method': method,
        'Resource': resource,
        'Version': version,
        'Status': status
        }
    userData.push(log);
    console.log(data);

    fs.appendFile('log.cvs', data, (err) => {
        if (err) throw err;
        //Agent,Time,Method,Resource,Version,Status
        next();
    })
});

app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.status(200).send('okayyy');
});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
    // fs.readFile('log.csv', "utf-8", (err, data) => {
    //     if (err) {
    //         res.status(500).send('not working');
    //     }
    // })
    res.status(200).json(userData);
    
    console.log(userData);

});

module.exports = app;
