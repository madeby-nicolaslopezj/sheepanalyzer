/**
 * Subscribe to the data that the view needs
 */
Meteor.publish('clientsReportsIndex', function(clientSlug) {
  check(clientSlug, String);
  console.log(clientSlug);
  return Clients.find({ slug: clientSlug });
})
