Template.clientsLayout.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('clientBySlug', Router.current().params.slug);
  });
});

Template.clientsLayout.onRendered(function() {
  var self = this;
  self.autorun(function() {
    if (self.subscriptionsReady()) {
      Tracker.afterFlush(function() {
        $('.parallax').parallax();
      })
    }
  })
})

Template.clientsLayout.helpers({
  client: function() {
    return Clients.findOne({ slug: Router.current().params.slug });
  }
});
