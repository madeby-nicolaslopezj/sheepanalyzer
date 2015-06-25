Meteor.methods({
  scheduleJob: function () {
    var slave = Slaves.findAndModify({
      query: { nextRun: { $lt: new Date() }, isRunning: false },
      update: { $set: { isRunning: true } },
      sort: { nextRun: -1 },
      new: true
    });


    if (!slave) {
      Meteor._sleepForMs(1000);
      return;
    };

    try {
      var nextRun = Jobs[slave.type](slave);
      Slaves.update(slave._id, { $set: { nextRun: nextRun, lastRun: new Date(), isRunning: false } });
    } catch (e) {
      Slaves.update(slave._id, { $set: { nextRun: new Date(), isRunning: false } });
      Meteor._sleepForMs(5000);
      throw e;
    }
  }
});

Meteor.startup(function () {
  Slaves.update({ isRunning: true }, { $set: { isRunning: false } });
  Meteor.defer(function() {
    while (Jobs.running) {
      try {
        Meteor.call('scheduleJob');
      } catch(e) {
        console.log('Error running job: ', e);
      }
      Meteor._sleepForMs(200 + _.random(300));
    }
  })
});