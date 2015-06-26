Reports = new orion.collection('reports', {
  singularName: 'reporte',
  pluralName: 'reportes',
  title: 'Reportes',
  link: {
    title: 'Reportes'
  },
  tabular: {
    columns: [
      { data: 'targetName', title: 'Target' },
      orion.attributeColumn('createdAt', 'createdAt', 'Fecha'),
      { title: 'Acciones', tmpl: Meteor.isClient && Template.adminReportsIndexButton }
    ]
  }
});
