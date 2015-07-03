Reports.attachSchema(new SimpleSchema({
  targetId: {
    type: String,
    label: 'Target'
  },
  competitors: {
    type: [String],
    label: 'Competencia',
    optional: true
  },
  selectedReports: {
    type: [String],
    label: 'Elegir Reportes',
    allowedValues: ReportsItems.types,
    autoform: {
      type: "select-checkbox"
    }
  },
  data: {
    type: Object,
    blackbox: true,
    optional: true,
    autoform: {
      omit: true
    }
  },
  comments: {
    type: Object,
    blackbox: true,
    optional: true,
    autoform: {
      omit: true
    }
  },
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
