AnalistRole.allow('collections.reports.insert', function(userId, doc){
  var client = Clients.findOne(doc.clientId);
  return client.inCharge == userId;
});
AnalistRole.allow('collections.reports.update', function(userId, doc) {
  var client = Clients.findOne(doc.clientId);
  return client.inCharge == userId;
});
AnalistRole.allow('collections.reports.remove', function(userId, doc) {
  var client = Clients.findOne(doc.clientId);
  return client.inCharge == userId;
});
AnalistRole.allow('collections.reports.downloadData', true);
