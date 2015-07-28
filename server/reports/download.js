Router.route('/report-download/:reportId', function() {
  check(this.params.reportId, String);

  var report = Reports.findOne(this.params.reportId);
  var csvs = [];
  _.each(report.selectedReports, function(dataType) {
    var data = report.data[dataType];
    var reportInfo = ReportsItems.info[dataType];
    var csv = exportToCSV(reportInfo.title, reportInfo.csvFields, data);
    csvs.push(csv);
  });

  var headers = {
    'Content-type': 'text/csv',
    'Content-Disposition': 'attachment; filename=data.csv'
  };

  this.response.writeHead(200, headers);
  this.response.end(csvs.join('\n;\n'));

}, { where: 'server', name: 'report.downloadAllData' });


Router.route('/report-data/:_id', function() {
  var reportDataDownloadRequest = ReportDataDownloadRequest.findOne(this.params._id);

  if (!reportDataDownloadRequest) {
    this.response.end(JSON.stringify({ error: 'link expired' }, null, 2));
    return;
  }

  var report = Reports.findOne(reportDataDownloadRequest.reportId);
  var data = report.data[reportDataDownloadRequest.dataType];
  var reportInfo = ReportsItems.info[reportDataDownloadRequest.dataType];
  var csv = exportToCSV(reportInfo.title, reportInfo.csvFields, data);
  var headers = {
    'Content-type': 'text/csv',
    'Content-Disposition': 'attachment; filename=data.csv'
  };

  this.response.writeHead(200, headers);
  this.response.end(csv);

  ReportDataDownloadRequest.remove({ _id: this.params._id });
}, { where: 'server', name: 'report.downloadData' });
