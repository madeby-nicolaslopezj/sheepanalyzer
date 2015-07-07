Meteor.publish('runningJobs', function() {
  return Jobs.find({ isRunning: true });
});

Meteor.publish('pendingJobs', function() {
  Counts.publish(this, 'pendingJobs', Jobs.find({ nextRun: { $lt: new Date() }, isRunning: false }));
});

Meteor.publish('totalJobs', function() {
  Counts.publish(this, 'totalJobs', Jobs.find());
});
