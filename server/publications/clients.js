/**
 * Subscribes to a client by its slug with it target
 */
Meteor.publishComposite('clientBySlug', function(clientSlug) {
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
