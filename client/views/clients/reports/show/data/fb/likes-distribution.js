var colors = ['#d32f2f', '#2196f3', '#009688', '#795548', '#ffeb3b', '#673ab7', '#4caf50']

Template['reportsData_fb:likes-distribution'].onRendered(function() {
  var dataLastWeek = this.data.lastWeek.map(function(item, index) {
    return {
      value: item.likes,
      label: Targets.findOne(item.targetId).name,
      color: colors[index]
    }
  });
  var ctx1 = this.$('#likes-distribution-lastWeek').get(0).getContext('2d');
  var chart1 = new Chart(ctx1).Doughnut(dataLastWeek, {});

  var dataNow = this.data.now.map(function(item, index) {
    return {
      value: item.likes,
      label: Targets.findOne(item.targetId).name,
      color: colors[index]
    }
  });
  var ctx2 = this.$('#likes-distribution-now').get(0).getContext('2d');
  var chart2 = new Chart(ctx2).Doughnut(dataNow, {});
})
