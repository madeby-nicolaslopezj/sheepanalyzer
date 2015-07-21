Meteor.publish('alertByTarget', function(targetId) {
  check(targetId, String);
  return Alerts.find({ targetId: targetId });
})

Meteor.publish('twitterFeedForTarget', function(targetId) {
  check(targetId, String);
  return DataTwitterTweets.find({ targetId: targetId }, { sort: { created_at: -1 }, limit: 10, fields: { 'user.screen_name': 1, text: 1, created_at: 1, id_str: 1 } });
})
