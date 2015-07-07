AnalistRole.allow('collections.clients.index', true);
AnalistRole.allow('collections.clients.insert', true);
AnalistRole.allow('collections.clients.update', function(userId, doc) {
  return doc.inCharge == userId
});
AnalistRole.allow('collections.clients.remove', function(userId, doc) {
  return doc.inCharge == userId
});
AnalistRole.allow('collections.clients.showCreate', true);
AnalistRole.allow('collections.clients.showUpdate', true);
AnalistRole.allow('collections.clients.showRemove', true);
AnalistRole.helper('collections.clients.indexFilter', function() {
  return { inCharge: this.userId };
});
AnalistRole.helper('collections.clients.availableTargets', function() {
  return { inCharge: this.userId };
});
