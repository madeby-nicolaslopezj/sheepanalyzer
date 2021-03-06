Template['reportsData_fb:likes-history'].onRendered(function() {
  var self = this;
  _.each(this.data, function(chart) {
    var data = {
      labels: [],
      datasets: [{
        label: 'My FB Page',
        data: []
      }]
    };

    _.each(chart.data.reverse(), function(point){
      var date = moment(point.date).format("D-MMMM");
      data.labels.push(date);
      data.datasets[0].data.push(point.likes);
    })

    var ctx = self.$('#likes-chart-' + chart.targetId).get(0).getContext('2d');
    var chart = new Chart(ctx).Line(data, {
      datasetFill : false,
    });
  })
})


Template['reportsData_fb:likes-history'].helpers({
  charts: function() {
    return this;
  }
});
