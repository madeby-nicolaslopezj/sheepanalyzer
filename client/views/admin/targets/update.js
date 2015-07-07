ReactiveTemplates.set('collections.targets.update', 'adminTargetsUpdate');
Template.adminTargetsUpdate.events({
  'click .save-btn': function(event, template) {
    template.$('#orionMaterializeCollectionsUpdateForm').submit();
  }
})
