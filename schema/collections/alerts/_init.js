Alerts = new orion.collection('alerts', {
  singularName: 'alerta',
  pluralName: 'alertas',
  title: 'Alertas',
  link: {
    title: 'Alertas'
  },
  tabular: {
    columns: [
      orion.attributeColumn('hasOne', 'targetId', 'Target'),
      { data: 'rate', title: 'Rate' },
      { data: 'status', title: 'Status' }
    ]
  }
});
