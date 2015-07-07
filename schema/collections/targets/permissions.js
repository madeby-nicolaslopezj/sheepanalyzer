AnalistRole.allow('collections.targets.index', true);
AnalistRole.allow('collections.targets.insert', true);
AnalistRole.allow('collections.targets.update', function(userId, doc) {
  return doc.inCharge == userId
});
AnalistRole.allow('collections.targets.showCreate', true);
AnalistRole.allow('collections.targets.showUpdate', true);
AnalistRole.helper('collections.targets.indexFilter', function() {
  return { inCharge: this.userId };
});
