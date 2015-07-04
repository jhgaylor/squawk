var request = require('supertest');
var SquawkServer = require('../src/index');
var mongoose = SquawkServer.mongoose;
var Models = SquawkServer.Models;
var SquawkServerApp = request.agent(SquawkServer.app);

describe('Squawk Api Server', function() {
  beforeAll(function(done) {
    Models.User.create({
      'profile.firstName': 'TEST',
      'twilio.number': '+16626940191'
    }, function(err, res) {
      done();
    });
  });

  afterAll(function(done) {
    Models.User.remove({
      'profile.firstName': 'TEST',
      'twilio.number': '+16626940191'
    }, function(err, res) {
      done();
    });
  });

  it('allows looking up a single user', function(done) {
    Models.User.findOne({'profile.firstName': 'TEST'}, function(err, user) {
      expect(user && user.twilio && user.twilio.number).toBeDefined();
      var userNumber = user.twilio.number;
      SquawkServerApp
        .get('/users/' + userNumber)
        .end(function(err, res) {
          expect(err).toBe(null);
          expect(res.body.data).toBeDefined;
          expect(res.body.data.twilio.number).toEqual(userNumber)
          done();
        });
    });
  });
});
