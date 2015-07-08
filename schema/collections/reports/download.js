Roles.registerAction('collections.reports.downloadData', true);

ReportDataDownloadRequest = new Mongo.Collection('report_data_download_request');
ReportDataDownloadRequest.attachSchema(new SimpleSchema({
  reportId: {
    type: String
  },
  dataType: {
    type: String,
    allowedValues: ReportsItems.types
  }
}));

ReportDataDownloadRequest.allow({
  insert: function(userId, doc) {
    return Roles.allow(userId, 'collections.reports.downloadData');
  }
});
