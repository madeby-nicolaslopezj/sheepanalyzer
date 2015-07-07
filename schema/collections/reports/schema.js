Reports.attachSchema(new SimpleSchema({
  clientId: {
    type: String,
    index: 1
  },
  mainTargetId: {
    type: String,
    label: 'Target',
    index: 1,
    autoValue: function() {
      var clientId = this.field('clientId');
      if (clientId.isSet) {
        var client = Clients.findOne(clientId.value);
        if (client) {
          return client.mainTargetId;
        }
      }
    }
  },
  competitorsIds: {
    type: [String],
    label: 'Competencia',
    optional: true,
    autoValue: function() {
      var clientId = this.field('clientId');
      if (clientId.isSet) {
        var client = Clients.findOne(clientId.value);
        if (client) {
          return client.competitorsIds;
        }
      }
    }
  },
  selectedReports: {
    type: [String],
    label: 'Reportes',
    allowedValues: ReportsItems.types,
    min: 1
  },
  isVisible: {
    type: Boolean,
    label: 'Visible',
    defaultValue: false
  },
  data: {
    type: Object,
    blackbox: true,
    optional: true
  },
  comments: {
    type: Object,
    blackbox: true,
    optional: true
  },
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
