Jobs['fb:post-likes'] = function(slave) {
  var objectId = slave.data.objectId;

  console.log('Fetching [', objectId, '] likes')

  var likes = FBGraph.fetchFullArray([objectId, 'likes'], {
    fields: 'id',
    limit: 250
  });

  _.each(likes, function(like){
    var doc = {
      targetId: slave.targetId,
      userId: like.id,
      postId: objectId
    }
    try {
      if (DataFBPostLikes.find({ targetId: slave.targetId, userId: like.id, postId: objectId }).count() == 0) {
        DataFBPostLikes.insert(doc);
      }
    } catch(e) {
      console.log(e);
      console.log(doc);
    }
  });

  console.log(likes.length + ' likes found');

  return moment().add(1, 'day').toDate();
}