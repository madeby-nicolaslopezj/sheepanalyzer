ReactiveTemplates.set('collections.targets.create', 'adminTargetsCreate');
Template.adminTargetsCreate.events({
  'click .create-btn': function(event, template) {
    template.$('#orionMaterializeCollectionsCreateForm').submit();
  }
})
