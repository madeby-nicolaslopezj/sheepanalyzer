FacebookKeys.attachSchema(new SimpleSchema({
  objectId: {
    type: String,
    index: 1,
    unique: true
  },
  facebookId: {
    type: String,
    optional: true,
    index: 1,
    unique: true
  },
  pageToken: {
    type: String,
    optional: true
  },
  userToken: {
    type: String,
    optional: true
  },
  data: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: orion.attribute('createdAt'),
  createdBy: orion.attribute('createdBy')
}));