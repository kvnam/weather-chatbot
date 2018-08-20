const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config/config.json');
const app = express();
const port = process.env.PORT || 3000;

var server = http.createServer(app);
const socket = require('./config/socketConfig')(server);
const staticPath = path.join(__dirname, '../public');

app.use('/scripts', express.static(path.join(__dirname, '../node_modules')));

app.use(express.static(staticPath));

server.listen(port, function() {
  console.log(`Server up on ${port}`);  
})

