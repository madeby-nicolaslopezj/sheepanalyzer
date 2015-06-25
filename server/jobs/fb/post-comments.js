Jobs['fb:post-comments'] = function(slave) {
  var objectId = slave.data.objectId;

  console.log('Fetching [', objectId, '] comments')

  var comments = FBGraph.fetchFullArray([objectId, 'comments'], {
    fields: 'id,from{id},message,created_time,like_count',
    limit: 250
  });

  _.each(comments, function(comment){
    comment.created_time = moment.utc(comment.created_time).toDate()
    comment.targetId = slave.targetId
    try {
      DataFBPostComments.insert(comment);
    } catch(e) {
      console.log(e);
      console.log(comment);
    }
  });

  console.log(comments.length + ' comments found');

  return moment().add(1, 'day').toDate();
}