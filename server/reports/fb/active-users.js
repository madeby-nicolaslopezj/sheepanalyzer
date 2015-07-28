ReportsItems['fb:active-users'] = function(report) {
  var users = DataFBPostComments.aggregate([
    { $match: {
      targetId: report.mainTargetId,
      created_time: { $gte: report.startDate },
      created_time: { $lte: report.endDate }
    } },
    {
      $group: {
        _id: '$from.id',
        comments: { $sum: 1 },
        totalCommentsLikes: { $sum: '$like_count' }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  users = users.map(function(user) {
    user.likes = DataFBPostLikes.find({ userId: user._id }).count();
    return user;
  });

  return users;
}
