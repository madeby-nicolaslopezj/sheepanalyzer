JobTypes['fb:post-comments'] = function(job) {
  var objectId = job.data.objectId;

  console.log('Fetching [', objectId, '] comments')

  var comments = FBGraph.fetchFullArray([objectId, 'comments'], {
    fields: 'id,from{id},message,created_time,like_count',
    limit: 250
  });

  _.each(comments, function(comment){
    comment.created_time = moment.utc(comment.created_time).toDate()
    comment.targetId = job.targetId
    try {
      if (DataFBPostComments.find({ id: comment.id }).count() == 0) {
        DataFBPostComments.insert(comment);
      }
    } catch(e) {
      console.log(e);
      console.log(comment);
    }
  });

  console.log(comments.length + ' comments found');

  if (moment(new Date(job.createdAt)).isAfter(moment().subtract(1, 'month'))) {
    // Each day at 15:00:00
    return moment().add(1, 'day').hour(15).minute(0).second(0).toDate();
  }
}
