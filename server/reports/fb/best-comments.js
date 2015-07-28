ReportsItems['fb:best-comments'] = function(report) {
  var comments = DataFBPostComments.find({
    targetId: report.mainTargetId,
    created_time: { $gte: report.startDate },
    created_time: { $lte: report.endDate }
  }, {
    sort: { like_count: -1 },
    limit: 10
  }).fetch();

  return comments;
}
