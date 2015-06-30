ReportsItems['fb:likes-history'] = function(report) {
  var fromDate = moment(report.createdAt).endOf('day').subtract(1, 'month').toDate();
  var toDate = moment(report.createdAt).endOf('day').toDate();

  var likes = DataFBLikes.find({targetId: report.targetId, date: { $gte: fromDate, $lt: toDate }}, { fields: { _id: 0, targetId: 0 } }).fetch();

  return likes;
}
