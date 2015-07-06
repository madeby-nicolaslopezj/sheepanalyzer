ReportsItems['fb:likes-history'] = function(report) {
  var result = [];

  result.push({
    targetId: report.mainTargetId,
    data: DataFBLikes.find({ targetId: report.mainTargetId }, { fields: { _id: 0, targetId: 0 }, limit: 20, sort: { date: -1 } }).fetch()
  })

  _.each(report.competitorsIds, function(competitorId){
    result.push({
      targetId: competitorId,
      data: DataFBLikes.find({ targetId: competitorId }, { fields: { _id: 0, targetId: 0 }, limit: 20, sort: { date: -1 } }).fetch()
    })
  });

  return result;
}
