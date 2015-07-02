DataFBPosts.attachSchema(new SimpleSchema({
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
  picture: {
    type: String,
    optional: true
  },
  link: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    optional: true
  },
  status_type: {
    type: String,
    optional: true
  },
  object_id: {
    type: String,
    optional: true
  },
  created_time: {
    type: Date
  },
  updated_time: {
    type: Date,
    optional: true
  },
  commentsCount: {
    type: Number,
    optional: true
  },
  likesCount: {
    type: Number,
    optional: true
  },
  sharesCount: {
    type: Number,
    optional: true
  }
}))
