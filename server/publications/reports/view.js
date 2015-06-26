Meteor.publish('reportsView', function(reportId) {
  check(reportId, String);
  return Reports.find(reportId)
});
