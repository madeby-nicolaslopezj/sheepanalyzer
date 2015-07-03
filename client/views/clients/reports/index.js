Template.clientsReportsIndex.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('clientsReportsIndex', Router.current().params.slug);
  });
});

Template.clientsReportsIndex.helpers({
  client: function() {
    return Clients.findOne({ slug: Router.current().params.slug });
  }
})
