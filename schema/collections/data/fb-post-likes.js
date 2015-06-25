DataFBPostLikes.attachSchema(new SimpleSchema({
  targetId: {
    type: String,
    index: 1,
    unique: false
  },
  postId: {
    type: String,
    index: 1,
    unique: false
  },
  userId: {
    type: String,
    index: 1,
    unique: false
  },
  date: orion.attribute('createdAt')
}));