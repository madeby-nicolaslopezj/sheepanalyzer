Meteor.publish('clientsFacebookKeysLink', function (facebookKeyId) {
  check(facebookKeyId, String);
  return FacebookKeys.find({ _id: facebookKeyId });
});
