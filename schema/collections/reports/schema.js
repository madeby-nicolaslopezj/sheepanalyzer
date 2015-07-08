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
    min: 1,
    autoform: {
      noselect: true,
      options: ReportsItems.titles
    }
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
  startDate: {
    type: Date,
    label: 'Desde',
    autoform: {
      type: 'pickadate',
      timezoneId: 'America/Santiago'
    }
  },
  endDate: {
    type: Date,
    label: 'Hasta',
    autoform: {
      type: 'pickadate',
      timezoneId: 'America/Santiago'
    }
  },
  divideBy: {
    type: String,
    allowedValues: ['day', 'week', 'month'],
    autoform: {
      noselect: true,
      options: {
        day: 'Día',
        week: 'Semana',
        month: 'Mes'
      }
    }
  },
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
