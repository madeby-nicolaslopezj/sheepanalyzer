ReportsItems['fb:likes-history'] = function(report) {
  var likes = DataFBLikes.find({ targetId: report.targetId }, { fields: { _id: 0, targetId: 0 }, limit: 20, sort: { date: -1 } }).fetch();
  return likes;
}
