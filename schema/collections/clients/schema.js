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
    additionalFields: ['inCharge'],
    filter: function(userId) {
      return { $or: Roles.helper(userId, 'collections.clients.availableTargets') };
    }
  }),
  competitorsIds: orion.attribute('hasMany', {
    label: 'Competencia'
  }, {
    collection: Targets,
    titleField: 'name',
    publicationName: 'clients_competitors',
    additionalFields: ['inCharge'],
    filter: function(userId) {
      return { $or: Roles.helper(userId, 'collections.clients.availableTargets') };
    }
  }),
  inCharge: orion.attribute('user', {
    optional: true,
    label: 'Encargado'
  }, {
    publicationName: 'clients_user_attribute'
  }),
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
