'use strict';
const PatternDictModel = require('./../models/PatternDict.model');
const xregexp = require('xregexp');

module.exports.getAllPatterns = (req, res) => {
  console.log('Inside get all the patterns');
  PatternDictModel.find().then((patterns) => {
    console.log('All patterns returned length is ' + patterns.length);
    res.status(200).send(patterns);
  }).catch((err) => {
  console.log(`Error retrieving patterns ${err}`);
  //ADD ERROR HANDLER RESPONSE
  });

};

module.exports.addPattern = (req, res) => {
  var pattern = req.body;
  console.log('Inside add pattern to db');
  console.log(pattern);
  var newPattern = new PatternDictModel(pattern);
  newPattern.save().then((pattern) => {
    console.log('Pattern saved to DB');
    res.status(200).send(pattern);
  }).catch((err) => {
    console.log(`Error retrieving patterns ${err}`);
    //ADD ERROR HANDLER RESPONSE
  });
};

module.exports.matcher = (req, res) => {
  let str = req.params.str;
  console.log(`Inside matcher for ${str}`);
  PatternDictModel.find().then((patterns) => {
    //TODO: CONVERT THIS TO MONGO QUERY RETURNING MATCHED PATTERN
    let pRes = patterns.find(item => {
      if(xregexp.test(str, xregexp(item.pattern.regExp, "i"))){
        return true;
      }
    });
    if(pRes){
      let pMatch = pRes.pattern;
      res.send(200, pMatch);
    }else{
      res.status(200).send({});
    }
  }).catch((err) => {
    console.log(`Error retrieving patterns ${err}`);
    //ADD ERROR HANDLER RESPONSE
  });
};