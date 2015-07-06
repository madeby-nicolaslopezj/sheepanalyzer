Meteor.publish('runningSlaves', function() {
  return Slaves.find({ isRunning: true });
});

Meteor.publish('pendingSlaves', function() {
  Counts.publish(this, 'pendingSlaves', Slaves.find({ nextRun: { $lt: new Date() }, isRunning: false }));
});

Meteor.publish('totalSlaves', function() {
  Counts.publish(this, 'totalSlaves', Slaves.find());
});
