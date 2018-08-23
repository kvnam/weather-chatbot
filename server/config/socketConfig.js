'use strict';
const socket = require('socket.io');
const { sendMessage } = require('../utils/messages');
const http = require('http');
const PatternDictModel = require('./../models/PatternDict.model');
const xregexp = require('xregexp');
var patternArray = require('./../utils/patterns.json');

module.exports = (server) => {
  var io = socket(server);

  io.on('connect', (socket) => {
    console.log('New User connected to chat!');

    // PatternDictModel.remove().then(() => {
    //   var nP = new PatternDictModel(patternArray.pattern);
    //   nP.save().then((pattern) => {
    //     console.log('Hello pattern saved to db');
    //     console.log(pattern);
    //   });
    // }).catch((err) => {
    //   console.log(`Error setting up db ${err}`);
    // });

    socket.emit('newMessage', sendMessage('Bot', 'Hello, welcome to the weather chat!'));

    socket.on('querySent', (message) => {
      console.log('Query received ');
      console.log(message);
      //Read from the Pattern Dict Collection to find the matching intent
      PatternDictModel.find().then((patterns) => {
        //TODO: CONVERT THIS TO MONGO QUERY RETURNING MATCHED PATTERN
        console.log('Patterns retrieved');
        let pRes = patterns.find(item => {
          if(xregexp.test(message, xregexp(item.regExp, "i"))){
            return true;
          }
        });
        if(pRes){
          let pMatch = pRes._doc.intent;
          console.log(`Pattern match found ${pMatch}`);
          switch(pMatch){
            case 'Hello': socket.emit('newMessage', sendMessage('Bot', 'Hello!'));
                          break;
            case 'Location': socket.emit('newMessage', sendMessage('Bot', `Checking weather for ${pRes._doc.entities.city}`));
                            //api.openweathermap.org/data/2.5/weather?q={city name}&APPID=13411b8270307a06e14c504f69f87d38
                            break;
            default: console.log('No intent matched');
                    socket.emit('newMessage', sendMessage('Bot', 'Sorry, I can\'t understand you.'));
                    break;
          }
        }else{
          console.log('No match found');          
        }
      }).catch((err) => {
        console.log(`Error retrieving patterns ${err}`);
        //ADD ERROR HANDLER RESPONSE
      });

    });

  });
};