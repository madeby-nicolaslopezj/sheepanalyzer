var runTwitterDaemon = function() {
  console.log('Loading twitter stream');

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESSTOKEN,
    access_token_secret: process.env.TWITTER_ACCESSTOKEN_SECRET,
  });

  var tracks = [];

  Targets.find({}, { fields: { twitter: 1 } }).forEach(function(target) {
    _.each(target.twitter.directMentions, function(username) {
      tracks.push({ targetId: target._id, track: ('@' + username), regex: new RegExp('(' + '@' + username + ')', 'gi') });
    })

    var indirects = target.twitter.indirectMentions;
    if (indirects) {
      _.each(indirects, function(item) {
        if (item.containingAlso) {
          _.each(item.containingAlso, function(also) {
            tracks.push({ targetId: target._id, track: (item.mention + ' ' + also), regex: new RegExp('(' + item.mention + ').*(' + also + ')|(' + also + ').*(' + item.mention + ')', 'gi') });
          })
        } else {
          tracks.push({ targetId: target._id, track: item.mention, regex: new RegExp('(' + item.mention + ')', 'gi') });
        }
      });
    }
  });

  if (!tracks) return;

  var serverCount = process.env.CLUSTER_SERVER_COUNT || 1;
  var serverIndex = process.env.CLUSTER_SERVER_INDEX || 0;
  var totalTargets = tracks.length;
  var limit = Math.ceil(totalTargets / serverCount);
  var skip = limit * serverIndex;

  var streamingTracks = _.pluck(_.first(_.rest(tracks, skip), limit), 'track');

  console.log('Streaming ' + (streamingTracks.length) + ' keys. From ' + skip + ' to ' + (skip + streamingTracks.length) + ' from a total of ' + (tracks.length) + ' keys (max: 400 per server)');

  client.stream('statuses/filter', { track: streamingTracks.join(','), /*language: 'es'*/ }, function(connection) {

    connection.on('data', function(tweet) {
      //console.log('Server:', (Number(process.env.CLUSTER_SERVER_INDEX) + 1), '/', process.env.CLUSTER_SERVER_COUNT);
      var text = (tweet.retweeted_status && tweet.retweeted_status.text) || tweet.text;
      _.each(tracks, function(track) {
        if (text.match(track.regex)) {
          tweet.targetId = track.targetId;
        }
      })

      if (!tweet.targetId) {
        //console.log('Tweet without target found:', text);
        return;
      }

      if (tweet.lang && !_.contains(['en', 'es', 'und'], tweet.lang)) {
        //console.log('Tweet in other lang:', text, tweet.lang);
        return;
      }

      //console.log('Tweet passes:', text, tweet.lang);

      DataTwitterTweets.insert(tweet);
    });

    connection.on('error', function(error) {
      console.log('Twitter stream error:', error);
      console.log('Destroying connection...');
      connection.stream.destroy();
      console.log('Trying again in 5 seconds...');
      Meteor._sleepForMs(5000);
      runTwitterDaemon();
    });

  });
}

Meteor.startup(function() {

  if (!process.env.FETCH_TWITTER) {
    return;
  }

  runTwitterDaemon();
})
