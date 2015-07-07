/**
 * Stores the facebook likes history of a target
 */
DataFBLikes = new Mongo.Collection('data_fb_likes');

/**
 * Stores the comments of a facebook post
 */
DataFBPostComments = new Mongo.Collection('data_fb_post_comments');

/**
 * Stores the likes of a facebook post
 */
DataFBPostLikes = new Mongo.Collection('data_fb_post_likes');

/**
 * Stores the facebook posts of a target
 */
DataFBPosts = new Mongo.Collection('data_fb_posts');

/**
 * Stores the tweets
 */
DataTwitterTweets = new Mongo.Collection('data_twitter_tweets');

/**
 * Targets collection
 */
Targets = new orion.collection('targets', {
  singularName: 'target',
  pluralName: 'targets',
  title: 'Targets',
  link: {
    title: 'Targets'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
      orion.attributeColumn('user', 'inCharge', 'Encargado')
    ]
  }
});
