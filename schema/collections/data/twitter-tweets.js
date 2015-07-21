var TwitterUserSchema = new SimpleSchema({
  created_at: {
    type: Date,
    optional: true
  },
  followers_count: {
    type: Number,
    optional: true
  },
  friends_count: {
    type: Number,
    optional: true
  },
  id_str: {
    type: String,
    index: 1
  },
  listed_count: {
    type: Number,
    optional: true
  },
  location: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  protected: {
    type: Boolean,
    optional: true
  },
  screen_name: {
    type: String,
    optional: true
  },
  statuses_count: {
    type: Number,
    optional: true
  }
});

DataTwitterTweets.attachSchema(new SimpleSchema({
  targetId: {
    type: String,
    index: 1
  },
  coordinates: {
    type: Object,
    blackbox: true,
    optional: true
  },
  created_at: {
    type: Date,
    index: 1
  },
  entities: {
    type: Object,
    blackbox: true,
    optional: true
  },
  favorite_count: {
    type: Number,
    optional: true
  },
  id_str: {
    type: String,
    unique: true
  },
  in_reply_to_screen_name: {
    type: String,
    optional: true
  },
  in_reply_to_status_id_str: {
    type: String,
    optional: true,
  },
  in_reply_to_user_id_str: {
    type: String,
    optional: true
  },
  lang: {
    type: String,
    optional: true
  },
  place: {
    type: Object,
    blackbox: true,
    optional: true
  },
  quoted_status_id_str: {
    type: String,
    optional: true
  },
  retweet_count: {
    type: Number,
    optional: true
  },
  retweeted: {
    type: Boolean,
    optional: true
  },
  retweeted_status: {
    type: Object,
    optional: true
  },
  'retweeted_status.id_str': {
    type: String,
    optional: true
  },
  'retweeted_status.text': {
    type: String,
    optional: true
  },
  'retweeted_status.user': {
    type: TwitterUserSchema,
    optional: true
  },
  text: {
    type: String
  },
  truncated: {
    type: Boolean,
    optional: true
  },
  user: {
    type: TwitterUserSchema,
    optional: true
  },
  server: {
    type: String,
    optional: true
  }
}));
