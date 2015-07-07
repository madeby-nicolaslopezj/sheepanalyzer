JobTypes['fb:post-likes'] = function(job) {
  var objectId = job.data.objectId;

  console.log('Fetching [', objectId, '] likes')

  var likes = FBGraph.fetchFullArray([objectId, 'likes'], {
    fields: 'id',
    limit: 250
  });

  _.each(likes, function(like){
    var doc = {
      targetId: job.targetId,
      userId: like.id,
      postId: objectId
    }
    try {
      if (DataFBPostLikes.find({ targetId: job.targetId, userId: like.id, postId: objectId }).count() == 0) {
        DataFBPostLikes.insert(doc);
      }
    } catch(e) {
      console.log(e);
      console.log(doc);
    }
  });

  console.log(likes.length + ' likes found');

  if (moment(new Date(job.createdAt)).isAfter(moment().subtract(1, 'month'))) {
    // Each day at 19:00:00
    return moment().add(1, 'day').hour(17).minute(0).second(0).toDate();
  }
}
