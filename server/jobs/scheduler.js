Meteor.methods({
  scheduleJob: function() {
    var job = Jobs.findAndModify({
      query: { nextRun: { $lt: new Date() }, isRunning: false },
      update: { $set: { isRunning: true, startedAt: new Date() } },
      sort: { nextRun: 1 },
      new: true
    });

    if (!job) {
      Meteor._sleepForMs(1000);
      return;
    };

    try {
      var nextRun = JobTypes[job.type](job);
      if (nextRun) {
        Jobs.update(job._id, { $set: { nextRun: nextRun, lastRun: new Date(), isRunning: false }, $unset: { startedAt: '' } });
      } else {
        Jobs.remove(job._id);
      }
    } catch (e) {
      Jobs.update(job._id, { $set: { nextRun: new Date(), isRunning: false }, $unset: { startedAt: '' }});
      Meteor._sleepForMs(5000);
      throw e;
    }
  },
  refreshJobs: function() {
    console.log('Setting jobs state to unactive');
    Jobs.update({ isRunning: true }, { $set: { isRunning: false }, $unset: { startedAt: '' } });
  }
});

Meteor.startup(function () {
  Meteor.call('refreshJobs');
  Meteor.defer(function() {
    while (Jobs.running) {
      try {
        Meteor.call('scheduleJob');
      } catch(e) {
        console.log('Error running job: ', e);
      }
      Meteor._sleepForMs(100 + _.random(300));
    }
  })
});
