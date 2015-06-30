Reports.after.insert(function(userId, doc) {
  _.each(doc.selectedReports, function(item) {
    Meteor.call('collectReportData', doc._id, item);
  });
})
