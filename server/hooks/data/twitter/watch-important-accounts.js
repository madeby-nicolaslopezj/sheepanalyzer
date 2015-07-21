DataTwitterTweets.after.insert(function(userId, doc) {
  var alert = Alerts.findOne({ targetId: doc.targetId });
  if (!alert) {
    return;
  }

  _.each(alert.importantTwitterAccounts, function(importantAccount) {
    if (importantAccount.toUpperCase() == doc.user.screen_name.toUpperCase()) {
      console.log('SEND EMAIL TO LEVEL 1');
    }
  });

});
