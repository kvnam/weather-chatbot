'use strict';

module.exports = (app) => {

  const PatternDict = require('./controller/patterndict.controller');

  app.route('/pattern').get(PatternDict.getAllPatterns);
  app.route('/pattern').post(PatternDict.addPattern);
  app.route('/match').get(PatternDict.matcher);
};