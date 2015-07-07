Template.clientsReportsIndex.onCreated(function() {
  var self = this;
  self.autorun(function () {
    var dataContext = Template.currentData();
    self.subscribe('reportsByClient', dataContext._id);
  });
});

Template.clientsReportsIndex.onRendered(function() {
})

Template.clientsReportsIndex.helpers({
  hasPermission: function() {
    var client = Clients.findOne({ slug: Router.current().params.slug });
    return Roles.userHasPermission(Meteor.userId(), 'collections.reports.insert', Meteor.userId(), { clientId: client._id });
  }
});
