Alerts.attachSchema(new SimpleSchema({
  targetId: orion.attribute('hasOne', {
    label: 'Target Principal'
  }, {
    collection: Targets,
    titleField: 'name',
    publicationName: 'alerts_target',
    additionalFields: ['inCharge'],
    filter: function(userId) {
      return { $or: Roles.helper(userId, 'collections.clients.availableTargets') };
    }
  }),
  importantTwitterAccounts: {
    type: [String],
    regEx: /^(\w){1,15}$/,
    optional: true,
    label: 'Cuentas de twitter (sin @)',
    autoform: {
      type: 'tags'
    }
  },
  level1Emails: {
    type: [String],
    regEx: SimpleSchema.RegEx.Email,
    label: 'Emails que reciben las alerts de cuentas importantes y de nivel 1 o mas',
    autoform: {
      type: 'tags'
    }
  },
  level1Rate: {
    type: Number,
    label: 'Tweets cada 5 minutos para activar nivel 1'
  },
  level2Emails: {
    type: [String],
    regEx: SimpleSchema.RegEx.Email,
    label: 'Emails que reciben las alerts de nivel 2 o mas',
    autoform: {
      type: 'tags'
    }
  },
  level2Rate: {
    type: Number,
    label: 'Tweets cada 5 minutos para activar nivel 2'
  },
  level3Emails: {
    type: [String],
    regEx: SimpleSchema.RegEx.Email,
    label: 'Emails que reciben las alerts de nivel 3',
    autoform: {
      type: 'tags'
    }
  },
  level3Rate: {
    type: Number,
    label: 'Tweets cada 5 minutos para activar nivel 3'
  },
  rate: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  status: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  history: {
    type: [Object],
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  }
}))
