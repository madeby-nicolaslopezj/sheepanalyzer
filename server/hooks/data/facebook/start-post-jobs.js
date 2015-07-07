/**
 * Starts the fb:posts job
 */
DataFBPosts.after.insert(function(userId, doc) {

  if (moment(new Date(doc.created_time)).isBefore(moment().subtract(1, 'month'))) {
    return;
  }

  console.log('Creating fb:post-likes job for [', doc.id, ']');
  var job = {
    targetId: doc.targetId,
    type: 'fb:post-likes',
    data: {
      objectId: doc.id
    }
  };

  Jobs.insert(job);
});

/**
 * Starts the fb:posts job
 */
DataFBPosts.after.insert(function(userId, doc) {

  if (moment(new Date(doc.created_time)).isBefore(moment().subtract(1, 'month'))) {
    return;
  }

  console.log('Creating fb:post-comments job for [', doc.id, ']');
  var job = {
    targetId: doc.targetId,
    type: 'fb:post-comments',
    data: {
      objectId: doc.id
    }
  };

  Jobs.insert(job);
});
