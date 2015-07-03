/**
 * Subscribe to the data that the view needs
 */
Meteor.publishComposite('clientsReportsIndex', function(clientSlug) {
  check(clientSlug, String);
  return {
    find: function() {
      return Clients.find({ slug: clientSlug });
    },
    children: [{
      find: function(client) {
        return Targets.find({ _id: client.mainTargetId });
      }
    }, {
      find: function(client) {
        return client.competitors();
      }
    }]
  }
});
