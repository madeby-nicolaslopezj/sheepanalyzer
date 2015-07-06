Template.clientsReportsIndex.onCreated(function() {
  var self = this;
  self.autorun(function () {
    var dataContext = Template.currentData();
    self.subscribe('reportsByClient', dataContext._id);
  });
});

Template.clientsReportsIndex.onRendered(function() {
})
