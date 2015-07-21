var timeDep = new Tracker.Dependency();
Meteor.setInterval(function() {
  timeDep.changed();
}, 30);

Template.adminStatus.onCreated(function() {
  this.subscribe('runningJobs');
  this.subscribe('pendingJobs');
  this.subscribe('totalJobs');
  this.subscribe('lastestTweets');
})

Template.adminStatus.helpers({
  runningJobs: function() {
    return Jobs.find({ isRunning: true }).fetch();
  },
  runningCount: function() {
    return Jobs.find({ isRunning: true }).count();
  },
  timeago: function(date) {
    timeDep.depend();
    return (moment().diff(moment(date)) / 1000).toFixed(2);
  },
  format: function(json) {
    return JSON.stringify(json, null, 2);
  },
  tweets: function() {
    return DataTwitterTweets.find({}, { sort: { id_str: -1 }, limit: 5 });
  }
})
