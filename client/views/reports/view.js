Template.reportsView.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('reportsView', Router.current().params._id);
  });
});

Template.reportsView.helpers({
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
  }
})

Template.reportsView.events({
  'click .refresh-report-btn': function(event, template) {
    var type = String(this);
    var $unset = {};
    $unset['data.' + type] = '';
    Reports.update(Router.current().params._id, { $unset: $unset });
    Meteor.call('collectReportData', Router.current().params._id, type);
  }
})
