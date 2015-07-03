Clients.attachSchema(new SimpleSchema({
  mainTargetId: orion.attribute('hasOne', {
    label: 'Target Principal'
  }, {
    collection: Targets,
    titleField: 'name',
    publicationName: 'clients_mainTarget',
  }),
  competitorsIds: orion.attribute('hasMany', {
    label: 'Competencia'
  }, {
    collection: Targets,
    titleField: 'name',
    publicationName: 'clients_competitors',
  }),
  dayToReports: {
    type: Number,
    label: 'Dia en que se generan los reportes',
    allowedValues: [0, 1, 2, 3, 4, 5, 6, 7],
    autoform: {
      options: [
          { label: 'Generar reportes manualmente', value: 0 },
          { label: 'Lunes', value: 1 },
          { label: 'Martes', value: 2 },
          { label: 'Miercoles', value: 3 },
          { label: 'Jueves', value: 4 },
          { label: 'Viernes', value: 5 },
          { label: 'Sabado', value: 6 },
          { label: 'Domingo', value: 7 },
        ]
    }
  },
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
