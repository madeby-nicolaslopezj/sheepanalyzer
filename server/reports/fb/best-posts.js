ReportsItems['fb:best-posts'] = function(report) {

  var fromDate = moment(report.createdAt).endOf('day').subtract(1, 'week').toDate();
  var toDate = moment(report.createdAt).endOf('day').toDate();

  var result = DataFBPostLikes.aggregate([
    {
      $match: {
        targetId: report.targetId,
        date: {
          $gte: fromDate,
          $lt: toDate
        }
      }
    },
    {
      $group: {
        _id: { postId: "$postId" },
        likes: { $sum: 1 },
      }
    },
    { $sort: { likes: -1 } },
    { $limit: 2 }
  ])

  var postIds = _.pluck(_.pluck(result, '_id'), 'postId');
  var posts = postIds.map(function(postId) {
    return FBGraph.get(postId);
  })

  return { posts: posts };
}
