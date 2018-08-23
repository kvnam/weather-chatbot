'use strict';
const express = require('express');
const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const config = require('./config/config.json');
const app = express();
const port = process.env.PORT || 3000;

const { db } = require('./config/mongoConfig');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(helmet());
var server = http.createServer(app);
const socket = require('./config/socketConfig')(server);
const staticPath = path.join(__dirname, '../dist');

app.use('/scripts', express.static(path.join(__dirname, '../node_modules')));

app.use(express.static(staticPath));
var routes = require('./routes')(app);

server.listen(port, function() {
  //console.log(`Mongo db connected `)
  console.log(`Server up on ${port}`);  
});

