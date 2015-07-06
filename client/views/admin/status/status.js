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
  timeago: function(date) {
    timeDep.depend();
    return moment().diff(moment(date)) / 1000;
  }
})
