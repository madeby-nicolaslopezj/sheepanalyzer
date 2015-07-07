var timeDep = new Tracker.Dependency();
Meteor.setInterval(function() {
  timeDep.changed();
}, 30);

Template.adminStatus.onCreated(function() {
  this.subscribe('runningSlaves');
  this.subscribe('pendingSlaves');
  this.subscribe('totalSlaves');
})

Template.adminStatus.helpers({
  runningSlaves: function() {
    return Slaves.find({ isRunning: true }).fetch();
  },
  runningCount: function() {
    return Slaves.find({ isRunning: true }).count();
  },
  timeago: function(date) {
    timeDep.depend();
    return (moment().diff(moment(date)) / 1000).toFixed(2);
  },
  format: function(json) {
    return JSON.stringify(json, null, 2);
  }
})
