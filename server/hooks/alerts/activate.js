Alerts.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (!_.contains(fieldNames, 'rate')) return;
  var isGrowing = this.previous.rate <= doc.rate;
  var newStatus = 0;

  if (isGrowing) {
    if (doc.rate >= doc.level3Rate) {
      newStatus = 3;
    } else if (doc.rate >= doc.level2Rate) {
      newStatus = 2;
    } else if (doc.rate >= doc.level1Rate) {
      newStatus = 1;
    } else {
      newStatus = 0;
    }
  } else {
    if (doc.rate < Math.round(doc.level1Rate * 0.9)) {
      newStatus = 0;
    } else if (doc.rate < Math.round(doc.level2Rate * 0.9)) {
      newStatus = 1;
    } else if (doc.rate < Math.round(doc.level3Rate * 0.9)) {
      newStatus = 2;
    } else {
      newStatus = 3;
    }
  }

  if (newStatus != doc.status) {
    Alerts.update(doc._id, { $set: { status: newStatus } });
  }
});
