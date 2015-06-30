Meteor.methods({
  /**
   * Collects a report data
   * @param  {String} reportId The id of the report
   * @param  {String} type     The identifier of the data type
   */
  collectReportData: function(reportId, type) {
    check(reportId, String);
    check(type, String);

    Meteor.defer(function() {
      var report = Reports.findOne(reportId);
      var reportData = ReportsItems[type](report);

      var $set = {};
      $set['data.' + type] = reportData;
      Reports.update({ _id: report._id }, { $set: $set });
    });
  }
})
