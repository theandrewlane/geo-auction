'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Auction = mongoose.model('Auction'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  auction;

/**
 * Auction routes tests
 */
describe('Auction CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new auction
    user.save(function () {
      auction = {
        title: 'Auction Title',
        content: 'Auction Content'
      };

      done();
    });
  });

  it('should be able to save an auction if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new auction
        agent.post('/api/auctions')
          .send(auction)
          .expect(200)
          .end(function (auctionSaveErr, auctionSaveRes) {
            // Handle auction save error
            if (auctionSaveErr) {
              return done(auctionSaveErr);
            }

            // Get a list of auctions
            agent.get('/api/auctions')
              .end(function (auctionGetErr, auctionsGetRes) {
                // Handle auction save error
                if (auctionGetErr) {
                  return done(auctionGetErr);
                }

                // Get auctions list
                var auctions = auctionsGetRes.body;

                // Set assertions
                (auctions[0].user._id).should.equal(userId);
                (auctions[0].title).should.match('Auction Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an auction if not logged in', function (done) {
    agent.post('/api/auctions')
      .send(auction)
      .expect(403)
      .end(function (auctionSaveErr, auctionSaveRes) {
        // Call the assertion callback
        done(auctionSaveErr);
      });
  });

  it('should not be able to save an auction if no title is provided', function (done) {
    // Invalidate title field
    auction.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new auction
        agent.post('/api/auctions')
          .send(auction)
          .expect(400)
          .end(function (auctionSaveErr, auctionSaveRes) {
            // Set message assertion
            (auctionSaveRes.body.message).should.match('Title cannot be blank');

            // Handle auction save error
            done(auctionSaveErr);
          });
      });
  });

  it('should be able to update an auction if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new auction
        agent.post('/api/auctions')
          .send(auction)
          .expect(200)
          .end(function (auctionSaveErr, auctionSaveRes) {
            // Handle auction save error
            if (auctionSaveErr) {
              return done(auctionSaveErr);
            }

            // Update auction title
            auction.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing auction
            agent.put('/api/auctions/' + auctionSaveRes.body._id)
              .send(auction)
              .expect(200)
              .end(function (auctionUpdateErr, auctionUpdateRes) {
                // Handle auction update error
                if (auctionUpdateErr) {
                  return done(auctionUpdateErr);
                }

                // Set assertions
                (auctionUpdateRes.body._id).should.equal(auctionSaveRes.body._id);
                (auctionUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of auctions if not signed in', function (done) {
    // Create new auction model instance
    var auctionObj = new Auction(auction);

    // Save the auction
    auctionObj.save(function () {
      // Request auctions
      request(app).get('/api/auctions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single auction if not signed in', function (done) {
    // Create new auction model instance
    var auctionObj = new Auction(auction);

    // Save the auction
    auctionObj.save(function () {
      request(app).get('/api/auctions/' + auctionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', auction.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single auction with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/auctions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Auction is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single auction which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent auction
    request(app).get('/api/auctions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No auction with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an auction if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new auction
        agent.post('/api/auctions')
          .send(auction)
          .expect(200)
          .end(function (auctionSaveErr, auctionSaveRes) {
            // Handle auction save error
            if (auctionSaveErr) {
              return done(auctionSaveErr);
            }

            // Delete an existing auction
            agent.delete('/api/auctions/' + auctionSaveRes.body._id)
              .send(auction)
              .expect(200)
              .end(function (auctionDeleteErr, auctionDeleteRes) {
                // Handle auction error error
                if (auctionDeleteErr) {
                  return done(auctionDeleteErr);
                }

                // Set assertions
                (auctionDeleteRes.body._id).should.equal(auctionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an auction if not signed in', function (done) {
    // Set auction user
    auction.user = user;

    // Create new auction model instance
    var auctionObj = new Auction(auction);

    // Save the auction
    auctionObj.save(function () {
      // Try deleting auction
      request(app).delete('/api/auctions/' + auctionObj._id)
        .expect(403)
        .end(function (auctionDeleteErr, auctionDeleteRes) {
          // Set message assertion
          (auctionDeleteRes.body.message).should.match('User is not authorized');

          // Handle auction error error
          done(auctionDeleteErr);
        });

    });
  });

  it('should be able to get a single auction that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new auction
          agent.post('/api/auctions')
            .send(auction)
            .expect(200)
            .end(function (auctionSaveErr, auctionSaveRes) {
              // Handle auction save error
              if (auctionSaveErr) {
                return done(auctionSaveErr);
              }

              // Set assertions on new auction
              (auctionSaveRes.body.title).should.equal(auction.title);
              should.exist(auctionSaveRes.body.user);
              should.equal(auctionSaveRes.body.user._id, orphanId);

              // force the auction to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the auction
                    agent.get('/api/auctions/' + auctionSaveRes.body._id)
                      .expect(200)
                      .end(function (auctionInforErr, auctionInfoRes) {
                        // Handle auction error
                        if (auctionInforErr) {
                          return done(auctionInforErr);
                        }

                        // Set assertions
                        (auctionInfoRes.body._id).should.equal(auctionSaveRes.body._id);
                        (auctionInfoRes.body.title).should.equal(auction.title);
                        should.equal(auctionInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single auction if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new auction model instance
    auction.user = user;
    var auctionObj = new Auction(auction);

    // Save the auction
    auctionObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = user.id;

          // Save a new auction
          agent.post('/api/auctions')
            .send(auction)
            .expect(200)
            .end(function (auctionSaveErr, auctionSaveRes) {
              // Handle auction save error
              if (auctionSaveErr) {
                return done(auctionSaveErr);
              }

              // Get the auction
              agent.get('/api/auctions/' + auctionSaveRes.body._id)
                .expect(200)
                .end(function (auctionInforErr, auctionInfoRes) {
                  // Handle auction error
                  if (auctionInforErr) {
                    return done(auctionInforErr);
                  }

                  // Set assertions
                  (auctionInfoRes.body._id).should.equal(auctionSaveRes.body._id);
                  (auctionInfoRes.body.title).should.equal(auction.title);

                  // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                  (auctionInfoRes.body.isCurrentUserOwner).should.equal(true);

                  // Call the assertion callback
                  done();
                });
            });
        });
    });
  });

  it('should be able to get a single auction if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new auction model instance
    var auctionObj = new Auction(auction);

    // Save the auction
    auctionObj.save(function () {
      request(app).get('/api/auctions/' + auctionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', auction.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single auction, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'temp',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create temporary user
    var _user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _user.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Auction
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = user._id;

          // Save a new auction
          agent.post('/api/auctions')
            .send(auction)
            .expect(200)
            .end(function (auctionSaveErr, auctionSaveRes) {
              // Handle auction save error
              if (auctionSaveErr) {
                return done(auctionSaveErr);
              }

              // Set assertions on new auction
              (auctionSaveRes.body.title).should.equal(auction.title);
              should.exist(auctionSaveRes.body.user);
              should.equal(auctionSaveRes.body.user._id, userId);

              // now signin with the temporary user
              agent.post('/api/auth/signin')
                .send(_creds)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the auction
                  agent.get('/api/auctions/' + auctionSaveRes.body._id)
                    .expect(200)
                    .end(function (auctionInforErr, auctionInfoRes) {
                      // Handle auction error
                      if (auctionInforErr) {
                        return done(auctionInforErr);
                      }

                      // Set assertions
                      (auctionInfoRes.body._id).should.equal(auctionSaveRes.body._id);
                      (auctionInfoRes.body.title).should.equal(auction.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (auctionInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Auction.remove().exec(done);
    });
  });
});
