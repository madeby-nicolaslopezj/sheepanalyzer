Template['reportsData_fb:likes-history'].onRendered(function() {
  var self = this;
  _.each(this.data, function(chart){
    var ctx = self.$('#likes-chart-' + chart.targetId).get(0).getContext("2d");
    var chart = new Chart(ctx).Line(chart, {
      datasetFill: false
    });
  })
})


Template['reportsData_fb:likes-history'].helpers({
  charts: function() {
    return this;
  }
});
