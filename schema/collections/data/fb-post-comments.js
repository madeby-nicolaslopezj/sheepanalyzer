DataFBPostComments.attachSchema(new SimpleSchema({
  targetId: {
    type: String,
    index: 1
  },
  id: {
    type: String,
    unique: true,
    index: 1
  },
  from: {
    type: Object,
    blackbox: true
  },
  message: {
    type: String,
    optional: true
  },
  created_time: {
    type: Date
  },
  like_count: {
    type: Number
  }
}));