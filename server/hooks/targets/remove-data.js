/**
 * Remove all the jobs associated
 */
Targets.before.remove(function(userId, doc) {
  Jobs.remove({ targetId: doc._id });
  DataFBPosts.remove({ targetId: doc._id });
  DataFBPostLikes.remove({ targetId: doc._id });
  DataFBLikes.remove({ targetId: doc._id });
});
