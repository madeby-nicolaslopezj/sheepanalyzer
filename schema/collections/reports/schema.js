Reports.attachSchema(new SimpleSchema({
  targetId: {
    type: String,
    label: 'Target'
  },
  targetName: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
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
    optional: true
  },
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
