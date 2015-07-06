ReportsItems['fb:likes-history'] = function(report) {
  var result = [];

  var dates = [];
  var datesLabels = [];
  var date = moment().subtract(15, 'days');
  _.range(1, 15).map(function(index) {
    var newDate = date.add(1, 'day').clone();
    dates.push(newDate);
    datesLabels.push(newDate.format('D-MMMM'));
  });

  var target = Targets.findOne(report.mainTargetId);
  result.push({
    targetId: target._id,
    labels: datesLabels,
    datasets: [{
      label: target.name,
      data: []
    }]
  })

  _.each(report.competitorsIds, function(competitorId){
    var target = Targets.findOne(competitorId);
    result.push({
      targetId: target._id,
      labels: datesLabels,
      datasets: [{
        label: target.name,
        data: []
      }]
    })
  });

  _.each(dates, function(date){
    var likesDoc = DataFBLikes.findOne({ targetId: report.mainTargetId, date: { $gte: date.clone().startOf('day').toDate(), $lt: date.clone().endOf('day').toDate() } });
    _.findWhere(result, { targetId: report.mainTargetId }).datasets[0].data.push((likesDoc && likesDoc.likes) || null);

    _.each(report.competitorsIds, function(competitorId){
       var likesDoc = DataFBLikes.findOne({ targetId: competitorId, date: { $gte: date.clone().startOf('day').toDate(), $lt: date.clone().endOf('day').toDate() } });
       _.findWhere(result, { targetId: competitorId }).datasets[0].data.push((likesDoc && likesDoc.likes) || null);
    })
  })
  console.log(result[0].datasets[0]);
  return result;
}
