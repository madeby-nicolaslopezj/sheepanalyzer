ReportsItems['fb:likes-distribution'] = function(report) {
  var result = {
    lastWeek: [],
    now: []
  };

  var nowFromDate = moment(report.createdAt).startOf('day').toDate();
  var nowToDate = moment(report.createdAt).endOf('day').toDate();

  var likesObject = DataFBLikes.findOne({ targetId: report.mainTargetId, date: { $gte: nowFromDate, $lt: nowToDate } });
  result.now.push({
    targetId: report.mainTargetId,
    likes: (likesObject && likesObject.likes) || 0
  })

  _.each(report.competitorsIds, function(competitorId){
    var likesObject = DataFBLikes.findOne({ targetId: competitorId, date: { $gte: nowFromDate, $lt: nowToDate } });
    result.now.push({
      targetId: competitorId,
      likes: (likesObject && likesObject.likes) || 0
    })
  });

  var lastWeekFromDate = moment(report.createdAt).subtract(1, 'week').startOf('day').toDate();
  var lastWeekToDate = moment(report.createdAt).subtract(1, 'week').endOf('day').toDate();

  var likesObject = DataFBLikes.findOne({ targetId: report.mainTargetId, date: { $gte: lastWeekFromDate, $lt: lastWeekToDate } });
  result.lastWeek.push({
    targetId: report.mainTargetId,
    likes: (likesObject && likesObject.likes) || 0
  })

  _.each(report.competitorsIds, function(competitorId){
    var likesObject = DataFBLikes.findOne({ targetId: competitorId, date: { $gte: lastWeekFromDate, $lt: lastWeekToDate } });
    result.lastWeek.push({
      targetId: competitorId,
      likes: (likesObject && likesObject.likes) || 0
    })
  });

  console.log(result);
  return result;
}
