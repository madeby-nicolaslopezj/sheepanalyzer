Jobs['fb:posts'] = function(job) {
  var objectId = job.data.objectId;

  console.log('Fetching [', objectId, '] posts')

  var lastPost = DataFBPosts.findOne({ targetId: job.targetId }, { sort: { created_time: -1 } });
  var since = ( lastPost && moment(new Date(lastPost.created_time)).unix() ) || moment().subtract(10, 'year').unix();

  var posts = FBGraph.fetchFullArray([objectId, 'posts'], {
    fields: 'from{id},message,picture,link,type,status_type,object_id,created_time,updated_time,shares,likes.limit(1).summary(true){id},comments.limit(1).summary(true){id}',
    limit: 250,
    since: since
  });

  _.each(posts, function(post){
    post.created_time = moment.utc(post.created_time).toDate();
    post.updated_time = moment.utc(post.updated_time).toDate();
    post.targetId = job.targetId;
    post.commentsCount = post.comments.summary.total_count;
    post.likesCount = post.likes.summary.total_count;
    post.sharesCount = post.shares && post.shares.count;
    try {
      DataFBPosts.insert(post);
    } catch(e) {
      console.log(e);
      console.log(post);
    }
  });

  console.log(posts.length + ' posts found');

  // Each 3 hours
  return moment().add(3, 'hour').toDate();
}
