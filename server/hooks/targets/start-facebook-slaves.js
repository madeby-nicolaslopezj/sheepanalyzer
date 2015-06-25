/**
 * Starts the fb:likes slave
 */
Targets.after.insert(function(userId, doc) {
  var slave = {
    targetId: doc._id,
    type: 'fb:likes',
    data: {
      objectId: doc.facebook.id
    }
  };

  Slaves.insert(slave);
});

/**
 * Starts the fb:posts slave
 */
Targets.after.insert(function(userId, doc) {
  var slave = {
    targetId: doc._id,
    type: 'fb:posts',
    data: {
      objectId: doc.facebook.id
    }
  };

  Slaves.insert(slave);
});