Clients.helpers({
  mainTarget: function() {
    return Targets.findOne(this.mainTargetId);
  },
  competitors: function() {
    return Targets.find({ _id: { $in: this.competitorsIds } });
  },
  reports: function() {
    return Reports.find({ clientId: this._id }, { sort: { createdAt: -1 } });
  }
})
