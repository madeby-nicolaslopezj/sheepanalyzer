Targets.before.insert(function(userId, doc) {
  var data = FBGraph.get(doc.facebook.objectId);

  doc.id = data.id
  doc.data = data;
});