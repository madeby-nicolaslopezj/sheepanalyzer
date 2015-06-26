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
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
