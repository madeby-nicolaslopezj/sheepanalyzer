Meteor.startup(function() {
  Meteor.defer(function() {
    while (process.env.WATCH_ALERTS == 'true') {
      try {
        Alerts.find().forEach(function(alert) {
          var newRate = DataTwitterTweets.find({ targetId: alert.targetId, created_at: { $gte: moment().subtract(5, 'minutes').toDate() } }).count();
          if (newRate != alert.rate) {
            Alerts.update(alert._id, { $set: { rate: newRate } });
          }
        });
      } catch (e) {
        console.log('Error updating alerts rate', e);
      }
      Meteor._sleepForMs(5000);
    }
  });
});
