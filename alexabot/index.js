'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('alexabot');
var mood_Data_Helper = require('./moodDataHelper');

app.launch(function(req, res) {
  var prompt = 'How are you feeling today?';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('moods', {
 'slots': {
    'EMOTIONS': 'emotions'
  },
  'utterances': ['{|I am feeling| I feel| I want something| Make me} {-|EMOTIONS}']
},
  function(req, res) {
  	var userEmotion = req.slot('EMOTIONS');
  	var reprompt = 'Tell me how you feel today, so I can help change it, within reason.';
  	if (_.isEmpty(userEmotion)) {
  		var prompt = 'You don\'t want to share how you are feeling?';
  		res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      	return true;
  	} else {
  		var moodDataHelper = new mood_Data_Helper();

  		moodDataHelper.requestContent(userEmotion).then(function(response){
  			var possibleContent = response.body;
  			//console.log(possibleContent);
  			var suggestedContent = possibleContent[Math.floor(Math.random()*possibleContent.length)];
  			console.log(suggestedContent);
  			var formatted = moodDataHelper.formatContent(suggestedContent);
  			//console.log(formatted);
  			res.say(formatted).send();	
  		}).catch(function(err){
  			console.log(err);
  			var prompt = "Really sorry, I am helpless if you are feeling " + userEmotion;
  			res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
  		});
  		return false;
  	}
  }
);

module.exports = app;