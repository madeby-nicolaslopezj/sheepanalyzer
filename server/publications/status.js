Meteor.publish('runningJobs', function() {
  return Jobs.find({ isRunning: true });
});

Meteor.publish('pendingJobs', function() {
  Counts.publish(this, 'pendingJobs', Jobs.find({ nextRun: { $lt: new Date() }, isRunning: false }));
});

Meteor.publish('totalJobs', function() {
  Counts.publish(this, 'totalJobs', Jobs.find());
});

Meteor.publish('lastestTweets', function() {
  return DataTwitterTweets.find({}, { sort: { created_at: -1 }, limit: 5, fields: { 'user.screen_name': 1, text: 1, created_at: 1, id_str: 1 } });
});
