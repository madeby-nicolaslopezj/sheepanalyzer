var facebookSchema = new SimpleSchema({
  objectId: {
    type: String,
    label: 'ID'
  },
  id: {
    type: String,
    optional: true,
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
  containingTo: {
    type: String,
    label: 'Y que además contenga',
    optional: true
  }
})

var twitterSchema = new SimpleSchema({
  directMentions: {
    type: [String]
  },
  indirectMentions: {
    type: [indirectMentionSchema],
    optional: true
  }
})

Targets.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  facebook: {
    type: facebookSchema,
    label: 'Facebook'
  },
  twitter: {
    type: twitterSchema,
    label: 'Twitter'
  }
}));
