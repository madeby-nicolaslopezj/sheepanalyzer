Meteor.startup(function() {

  if (!process.env.FETCH_TWITTER) {
    return;
  }
  console.log('Loading twitter stream');

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESSTOKEN,
    access_token_secret: process.env.TWITTER_ACCESSTOKEN_SECRET,
  });

  var tracks = [];

  var serverCount = process.env.CLUSTER_SERVER_COUNT || 1;
  var serverIndex = process.env.CLUSTER_SERVER_INDEX || 0;
  var totalTargets = Targets.find().count();
  var limit = Math.ceil(totalTargets / serverCount);
  var skip = limit * serverIndex;

  Targets.find({}, { limit: limit, skip: skip, fields: { twitter: 1 } }).forEach(function(target) {
    _.each(target.twitter.directMentions, function(username) {
      tracks.push('@' + username);
    })

    var indirects = target.twitter.indirectMentions;
    if (indirects) {
      _.each(indirects, function(item) {
        if (item.containingAlso) {
          _.each(item.containingAlso, function(also) {
            tracks.push(item.mention + ' ' + also);
          })
        } else {
          tracks.push(item.mention);
        }
      });
    }
  });

  if (!tracks) return;

  console.log('Streaming ' + (tracks.length) + ' keys (max: 400)');

  client.stream('statuses/filter', { track: tracks.join(','), language: 'es' }, function(stream) {
    stream.on('data', function(tweet) {
      console.log('Server:', process.env.CLUSTER_SERVER_INDEX, '/', process.env.CLUSTER_SERVER_COUNT);
      console.log(tweet.text);
    });
    stream.on('error', function(error) {
      console.log('Twitter stream error:', error);
    })
  });

})
