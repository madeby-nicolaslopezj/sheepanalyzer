/**
 * Fetchs facebook data to target
 */
Targets.before.insert(function(userId, doc) {
  var data = FBGraph.get(doc.facebook.objectId);

  doc.facebook.id = data.id
  doc.facebook.data = data;
});