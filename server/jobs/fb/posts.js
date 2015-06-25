Jobs['fb:posts'] = function(slave) {
  var objectId = slave.data.objectId;

  console.log('Fetching [', objectId, '] posts')

  var lastPost = DataFBPosts.findOne({ targetId: slave.targetId }, { sort: { created_time: -1 } });
  var since = ( lastPost && moment(new Date(lastPost.created_time)).unix() ) || moment().subtract(10, 'year').unix();

  var posts = FBGraph.fetchFullArray([objectId, 'posts'], {
    fields: 'from{id},message,picture,link,type,status_type,object_id,created_time,updated_time',
    limit: 250,
    since: since
  });

  _.each(posts, function(post){
    post.created_time = moment.utc(post.created_time).toDate()
    post.updated_time = moment.utc(post.updated_time).toDate()
    post.targetId = slave.targetId
    try {
      DataFBPosts.insert(post);
    } catch(e) {
      console.log(e);
      console.log(post);
    }
  });

  console.log(posts.length + ' posts found');

  return moment().add(3, 'hour').toDate();
}