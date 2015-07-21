DataTwitterTweets.after.insert(function(userId, doc) {
  var alert = Alerts.findOne({ targetId: doc.targetId });
  if (!alert) {
    return;
  }
  var target = Targets.findOne({ _id: alert.targetId });

  _.each(alert.importantTwitterAccounts, function(importantAccount) {
    if (importantAccount.toUpperCase() == doc.user.screen_name.toUpperCase()) {

      var message = doc.user.screen_name + ' just said\n\n';
      message += doc.text + '\n\n';

      _.each(alert.level1Emails, function(recipent) {
        Email.send({
          to: recipent,
          from: 'sheepanalyzer@me.com',
          subject: doc.user.screen_name + ' is talking about ' + target.name,
          text: message
        });
      });
    }
  });

});
