DataFBLikes.attachSchema(new SimpleSchema({
  targetId: {
    type: String,
    index: 1
  },
  likes: {
    type: Number
  },
  date: orion.attribute('createdAt')
}));