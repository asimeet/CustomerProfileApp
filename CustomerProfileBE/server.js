const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routers = require('./routers');
const config = require('./config');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(config['mongo-url']);
app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200'
  }));

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     next();
// });

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/customer', routers.customer);

app.use(function (err, req, res, next) {
    if (err) {
        res.statusMessage = err.message
        res.status(500);
        res.send(err.message)
    }
});

app.listen(config['app-port'], () => {
    console.log(`Server is running at localhost:${config['app-port']}`);
});