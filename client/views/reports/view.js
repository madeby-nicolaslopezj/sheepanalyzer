Template.reportsView.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('reportsView', Router.current().params._id);
  });
});
