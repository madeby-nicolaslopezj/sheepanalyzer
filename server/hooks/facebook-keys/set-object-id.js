FacebookKeys.before.insert(function(userId, doc) {
  var facebookData = FBGraph.get(doc.objectId);

  doc.facebookId = facebookData.id;
  doc.data = facebookData;
});