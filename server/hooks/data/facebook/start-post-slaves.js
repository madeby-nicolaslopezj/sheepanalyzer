/**
 * Starts the fb:posts slave
 */
DataFBPosts.after.insert(function(userId, doc) {

  console.log('Creating fb:post-likes slave for [', doc.id, ']');
  var slave = {
    targetId: doc.targetId,
    type: 'fb:post-likes',
    data: {
      objectId: doc.id
    }
  };

  Slaves.insert(slave);
});

/**
 * Starts the fb:posts slave
 */
DataFBPosts.after.insert(function(userId, doc) {

  console.log('Creating fb:post-comments slave for [', doc.id, ']');
  var slave = {
    targetId: doc.targetId,
    type: 'fb:post-comments',
    data: {
      objectId: doc.id
    }
  };

  Slaves.insert(slave);
});
