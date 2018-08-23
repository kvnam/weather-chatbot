const mongoose = require('mongoose');

const dbVal = process.env.MONGODB_URI || "mongodb://localhost:27017/WeatherBot_Dev";

mongoose.connect(dbVal, {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', function() {
  console.log('Connected to the DB');
});

module.exports = {db};