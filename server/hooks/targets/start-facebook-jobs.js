/**
 * Starts the fb:likes job
 */
Targets.after.insert(function(userId, doc) {
  var job = {
    targetId: doc._id,
    type: 'fb:likes',
    data: {
      objectId: doc.facebook.id
    }
  };

  Jobs.insert(job);
});

/**
 * Starts the fb:posts job
 */
Targets.after.insert(function(userId, doc) {
  var job = {
    targetId: doc._id,
    type: 'fb:posts',
    data: {
      objectId: doc.facebook.id
    }
  };

  Jobs.insert(job);
});
