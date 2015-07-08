ReportsItems['fb:likes-distribution'] = function(report) {
  var result = {
    lastWeek: [],
    now: []
  };

  var nowFromDate = moment(report.createdAt).subtract(1, 'week').toDate();
  var nowToDate = moment(report.createdAt).toDate();

  var likesObject = DataFBLikes.findOne({ targetId: report.mainTargetId, date: { $gte: nowFromDate, $lt: nowToDate } }, { sort: { date: -1 } });
  result.now.push({
    targetId: report.mainTargetId,
    likes: (likesObject && likesObject.likes) || 0
  })

  _.each(report.competitorsIds, function(competitorId){
    var likesObject = DataFBLikes.findOne({ targetId: competitorId, date: { $gte: nowFromDate, $lt: nowToDate } }, { sort: { date: -1 } });
    result.now.push({
      targetId: competitorId,
      likes: (likesObject && likesObject.likes) || 0
    })
  });

  var lastWeekFromDate = moment(report.createdAt).subtract(2, 'week').toDate();
  var lastWeekToDate = moment(report.createdAt).subtract(1, 'week').toDate();

  var likesObject = DataFBLikes.findOne({ targetId: report.mainTargetId, date: { $gte: lastWeekFromDate, $lt: lastWeekToDate } }, { sort: { date: -1 } });
  result.lastWeek.push({
    targetId: report.mainTargetId,
    likes: (likesObject && likesObject.likes) || 0
  })

  _.each(report.competitorsIds, function(competitorId){
    var likesObject = DataFBLikes.findOne({ targetId: competitorId, date: { $gte: lastWeekFromDate, $lt: lastWeekToDate } }, { sort: { date: -1 } });
    result.lastWeek.push({
      targetId: competitorId,
      likes: (likesObject && likesObject.likes) || 0
    })
  });

  return result;
}
