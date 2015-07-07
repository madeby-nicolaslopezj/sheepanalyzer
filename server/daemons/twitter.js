var twitterConnection;
Meteor.methods({
  startTwitterDaemon: function(tracks) {
    console.log('Loading twitter stream...');

    var serverCount = process.env.CLUSTER_SERVER_COUNT || 1;
    var serverIndex = process.env.CLUSTER_SERVER_INDEX || 0;
    var totalTargets = tracks.length;
    var limit = Math.ceil(totalTargets / serverCount);
    var skip = limit * serverIndex;

    var streamingTracks = _.pluck(_.first(_.rest(tracks, skip), limit), 'track');

    console.log('Streaming ' + (streamingTracks.length) + ' keys. From ' + skip + ' to ' + (skip + streamingTracks.length) + ' from a total of ' + (tracks.length) + ' keys (max: 400 per server)');

    twitterConnection && twitterConnection.stream.destroy();
    TwitterClient.stream('statuses/filter', { track: streamingTracks.join(',') }, function(connection) {
      twitterConnection = connection;

      twitterConnection.on('data', function(tweet) {
        var text = (tweet.retweeted_status && tweet.retweeted_status.text) || tweet.text;
        _.each(tracks, function(track) {
          if (text.match(track.regex)) {
            tweet.targetId = track.targetId;
          }
        });

        if (!tweet.targetId) {
          return;
        }

        if (tweet.lang && !_.contains(['en', 'es', 'und'], tweet.lang)) {
          return;
        }

        DataTwitterTweets.insert(tweet);
      });

      twitterConnection.on('error', function(error) {
        console.log('Twitter stream error:', error);
        console.log('Trying again in 5 seconds...');
        Meteor._sleepForMs(5000);
        Meteor.call('startTwitterDaemon', tracks);
      });

    });
  }
})

Meteor.startup(function() {

  if (!process.env.FETCH_TWITTER) {
    return;
  }

  var run = function(tracks) {
    try {
      Meteor.call('startTwitterDaemon', tracks);
    } catch (e) {
      console.log('Error starting twitter daemon', e);
      Meteor._sleepForMs(2000);
      run();
    }
  }
  var tracks;
  var tracksDidChange = function() {
    var newTracks = Meteor.call('getTwitterTracks');
    if (!_.isEqual(tracks, newTracks)) {
      console.log('Starting twitter daemon...');
      tracks = newTracks;
      run(tracks);
    }
  }
  var query = Targets.find({}, { fields: { twitter: 1 } });
  var handle = query.observeChanges({ added: tracksDidChange, removed: tracksDidChange, changed: tracksDidChange });
})
