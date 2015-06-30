Reports.after.insert(function(userId, doc) {
  _.each(doc.selectedReports, function(item) {
    Meteor.defer(function() {
      var reportData = ReportsItems[item](doc);
      var $set = {};
      $set['data.' + item] = reportData;
      Reports.update({ _id: doc._id }, { $set: $set });
    });
  });
})
