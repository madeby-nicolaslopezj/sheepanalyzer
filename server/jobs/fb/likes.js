Jobs['fb:likes'] = function(slave) {
  var objectId = slave.data.objectId;

  console.log('Fetching page [', objectId, '] likes')

  var data = FBGraph.get(objectId, { fields: 'likes' });

  var likes = data.likes;

  DataFBLikes.insert({ targetId: slave.targetId, likes: likes });

  console.log('Has ' + likes + ' likes')

  return moment().add(1, 'day').toDate();
}