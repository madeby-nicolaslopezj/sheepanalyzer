SimpleSchema.messages({cantChangeFacebookId: 'No está permitido cambiar el ID de Facebook'});

var facebookSchema = new SimpleSchema({
  objectId: {
    type: String,
    label: 'ID',
    unique: true,
    custom: function() {
      if (!this.isInsert) {
        return 'cantChangeFacebookId';
      }
    }
  },
  id: {
    type: String,
    optional: true,
    unique: true,
    autoform: {
      omit: true
    }
  },
  data: {
    type: Object,
    optional: true,
    autoform: {
      omit: true
    }
  }
})

var indirectMentionSchema = new SimpleSchema({
  mention: {
    type: String,
    label: 'Mención'
  },
  containingAlso: {
    type: [String],
    label: 'Y que además contenga',
    optional: true
  }
})

var twitterSchema = new SimpleSchema({
  directMentions: {
    type: [String],
    optional: true,
    label: 'Cuentas'
  },
  indirectMentions: {
    type: [indirectMentionSchema],
    optional: true,
  }
})

Targets.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  inCharge: orion.attribute('user', {
    optional: true,
    label: 'Encargado'
  }, {
    publicationName: 'targets_user_attribute'
  }),
  facebook: {
    type: facebookSchema,
    label: 'Facebook'
  },
  twitter: {
    type: twitterSchema,
    label: 'Twitter'
  }
}));
