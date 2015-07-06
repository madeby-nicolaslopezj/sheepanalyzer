Template['reportsData_fb:likes-history'].onRendered(function() {
  var data = {
    labels: [],
    datasets: [{
      label: 'My FB Page',
      data: []
    }]
  };

  _.each(this.data.reverse(), function(point){
    var date = moment(point.date).format("D-MMM");
    data.labels.push(date);
    data.datasets[0].data.push(point.likes);
  })

  var ctx = this.$("canvas").get(0).getContext("2d");
  var chart = new Chart(ctx).Line(data, {
    scaleShowGridLines: false,
    datasetFill : false,
  });
})
