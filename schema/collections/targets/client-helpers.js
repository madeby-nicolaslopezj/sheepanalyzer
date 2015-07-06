if (Meteor.isClient) {

  Template.registerHelper('targetWithId', function(targetId) {
    return Targets.findOne(targetId);
  })

}
