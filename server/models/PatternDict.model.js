const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PatternDictModel = new Schema({
    regExp : {
      type: String,
      require: true
    },
    intent: {
      type: String,
      require: true
    }
});

module.exports = mongoose.model('PatternDict', PatternDictModel);