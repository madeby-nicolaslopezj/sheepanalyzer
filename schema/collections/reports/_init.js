Reports = new orion.collection('reports', {
  singularName: 'reporte',
  pluralName: 'reportes',
  title: 'Reportes',
  link: {
    title: 'Reportes'
  },
  tabular: {
    columns: [
      { data: 'targetName', title: 'Target' }
    ]
  }
});
