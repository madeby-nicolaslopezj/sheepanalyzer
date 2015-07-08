Template.clientsReportsShow.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('reportsView', Router.current().params._id);
    self.subscribe('clientBySlug', Router.current().params.slug);
  });
});

Template.clientsReportsShow.helpers({
  report: function() {
    return Reports.findOne(Router.current().params._id);
  },
  getTemplate: function() {
    var type = String(this);
    return 'reportsData_' + type;
  },
  getData: function() {
    var type = String(this);
    var report = Reports.findOne(Router.current().params._id);
    return report && report.data && report.data[type];
  },
  getTitle: function() {
    var type = String(this);
    return ReportsItems.titles[type];
  },
  hasPermission: function() {
    var report = Reports.findOne(Router.current().params._id);
    return Roles.userHasPermission(Meteor.userId(), 'collections.reports.update', Meteor.userId(), report);
  }
})

Template.clientsReportsShow.events({
  'click .refresh-report-btn': function(event, template) {
    var type = String(this);
    var $unset = {};
    $unset['data.' + type] = '';
    Reports.update(Router.current().params._id, { $unset: $unset });
    Meteor.call('collectReportData', Router.current().params._id, type);
  },
  'click .download-data-btn': function(event, template) {
    var type = String(this);
    var reportId = Router.current().params._id;
    ReportDataDownloadRequest.insert({ reportId: reportId, dataType: type }, function(error, result) {
      if (!error) {
        var redirectWindow = window.open('/report-data/' + result, '_blank');
        redirectWindow.location;
      }
    })
  }
})
