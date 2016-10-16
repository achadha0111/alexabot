'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'https://api.fieldbook.com/v1/58027b0217c5a70300d77a11/mooddata?emotion=';

function moodDataHelper() {}

moodDataHelper.prototype.requestContent = function(userEmotion) {
	console.log(userEmotion)
	var options = {
		method: 'GET',
		url: ENDPOINT + userEmotion,
		resolveWithFullResponse: true,
		json: true
	};
	
	return rp(options);

};
moodDataHelper.prototype.formatContent = function(requestContent) {
  
  console.log(requestContent);
  var answer = _.template('This should make you feel ${intendedemotion}. You owe {creator}.')({
    intendedemotion: requestContent.intendedemotion,
    creator: requestContent.creator
  });
  if (requestContent.content === 'story') {
    var template = _.template('Here is a ${content} ' + 'by ${creator} ' + '${description} ' + ' Hope you feel ${intendedemotion} now');
    return template({
      content: requestContent.content,
      intendedemotion: requestContent.intendedemotion,
      creator: requestContent.creator,
      description: requestContent.description,
      intendedemotion: requestContent.intendedemotion
    });

    } if (requestContent.content === 'image') {
    var template = _.template('Here is an ${content}. ' + 'I sent it to your phone '
      + 'Hope you ${intendedemotion} now');
    return template({
      content: requestContent.content,
      intendedemotion: requestContent.intendedemotion,
      creator: requestContent.creator,
    });
} if (requestContent.content === 'joke') {
    var template = _.template('Here is something to make you smile ' + '${description}.  '
      + 'Hope you feel ${intendedemotion} now');
    return template({
      description: requestContent.description,
      intendedemotion: requestContent.intendedemotion,
      creator: requestContent.creator,
    });
    } if (requestContent.content === 'music') {
    var template = _.template('I think listening to ${content}' + ' by ${creator} might help you. ' + 'I recommend ${description}'
      + ' Maybe after this you feel ${intendedemotion}');
    return template({
      content: requestContent.content,
      description: requestContent.description,
      creator: requestContent.creator,
      intendedemotion: requestContent.intendedemotion,
    });
  } else {
    //    no delay
    return _.template('Maybe talk to a human instead of telling me. My experience tells me they empathise better.')({})
    }
};

module.exports = moodDataHelper;