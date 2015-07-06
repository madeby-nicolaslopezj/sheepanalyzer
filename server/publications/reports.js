Meteor.publish('reportsByClient', function(clientId) {
  check(clientId, String);
  return Reports.find({ clientId: clientId });
})
