Clients.attachSchema(new SimpleSchema({
  slug: {
    type: String,
    label: 'Identificador',
    unique: true,
    regEx: /^[a-z0-9A-Z_-]+$/
  },
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
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
