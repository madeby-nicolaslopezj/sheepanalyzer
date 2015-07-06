Template.clientsReportsCreate.onRendered(function() {

});

Template.clientsReportsCreate.helpers({
  types: function() {
    return ReportsItems.types;
  },
  label: function() {
    return ReportsItems.titles[String(this)];
  }
});

Template.clientsReportsCreate.events({
  'click .btn-create': function(event, template) {
    var types = template.$('input[type="checkbox"]:checked').map(function() { return $(this).val(); } );

    var reportId = Reports.insert({ selectedReports: _.toArray(types), clientId: this._id });
    console.log(reportId);
  }
})
