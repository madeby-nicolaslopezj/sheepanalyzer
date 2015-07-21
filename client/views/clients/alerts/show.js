Template.clientsAlertsShow.onCreated(function() {
  var self = this;
  self.autorun(function () {
    var dataContext = Template.currentData();
    self.subscribe('alertByTarget', dataContext.mainTargetId);
    self.subscribe('twitterFeedForTarget', dataContext.mainTargetId);
  });
});

Template.clientsAlertsShow.helpers({
  alert: function() {
    return Alerts.findOne({ targetId: this.mainTargetId });
  },
  tweets: function() {
    return DataTwitterTweets.find({}, { sort: { id_str: -1 }, limit: 10 });
  }
})
