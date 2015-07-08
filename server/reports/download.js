Router.route('/report-data/:_id', function() {
  var reportDataDownloadRequest = ReportDataDownloadRequest.findOne(this.params._id);

  if (!reportDataDownloadRequest) {
    this.response.end(JSON.stringify({ error: 'link expired' }, null, 2));
    return;
  }

  var report = Reports.findOne(reportDataDownloadRequest.reportId);
  var data = report.data[reportDataDownloadRequest.dataType];

  this.response.end(JSON.stringify(data, null, 2));
  ReportDataDownloadRequest.remove({ _id: this.params._id });
}, { where: 'server', name: 'report.downloadData' });
