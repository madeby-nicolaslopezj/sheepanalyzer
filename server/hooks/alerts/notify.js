Alerts.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (!_.contains(fieldNames, 'status')) return;
  var up = this.previous.status < doc.status;
  var target = Targets.findOne(doc.targetId);
  var recipents = [];
  var message = '';

  if (up) {
    if (doc.status == 3) {
      recipents = _.union(doc.level1Emails, doc.level2Emails, doc.level3Emails);
    } else if (doc.status == 2) {
      recipents = _.union(doc.level1Emails, doc.level2Emails);
    } else if (doc.status == 1) {
      recipents = doc.level1Emails;
    }
    message = 'A level ' + doc.status + ' alert was activated for ' + target.name;
    message += ' with ' + doc.rate + ' tweets in the last 5 minutes.';
  } else {
    if (doc.status == 2) {
      // went down to level 2
    } else if (doc.status == 1) {
      // went down to level 1
    } else if (doc.status == 0) {
      // went down to level 0
    }
  }

  _.each(recipents, function(recipent) {
    Email.send({
      to: recipent,
      from: 'sheepanalyzer@me.com',
      subject: target.name + 'Alert',
      text: message
    });
  });

});
