'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var mood_Data_Helper = require('../moodDataHelper');
chai.config.includeStack = true;

describe('mood_Data_Helper', function() {
  var subject = new mood_Data_Helper();
  var userEmotion;
  describe('#getUserEmotion', function() {
  	describe('#contentType', function() {
    var status = {
      'data': 'The Happy Song',
      'type': 'music',
    };
    context('with relevant content', function() {
      it('suggests/starts speaking', function() {
        status.delay = 'false';
        expect(subject.formatAirportStatus(status)).to.eq('There is currently no delay at Hartsfield-Jackson Atlanta International. The current weather conditions are Light Snow, 36.0 F (2.2 C) and wind Northeast at 9.2mph.');
      });
    });
    context('with a status containing a delay', function() {
      it('formats the status as expected', function() {
        status.delay = 'true';
        expect(subject.formatAirportStatus(status)).to.eq(
          'There is currently a delay for Hartsfield-Jackson Atlanta International. The average delay time is 57 minutes. Delay is because of the following: AIRLINE REQUESTED DUE TO DE-ICING AT AIRPORT / DAL AND DAL SUBS ONLY. The current weather conditions are Light Snow, 36.0 F (2.2 C) and wind Northeast at 9.2mph.'
        );
      });
    });
  });
    context('with a valid emotion', function() {
      it('returns matching content', function() {
        userEmotion = 'sadness';
        var value = subject.requestContent(userEmotion).then(function(obj) {
          console.log(obj);
          return obj;
        });
        return expect(value).to.eventually.eq(userEmotion);
      });
    });
  });
});