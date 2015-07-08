/*
facebook = new GraphAPI({
    appId: orion.config.get('FACEBOOK_APPID'),
    secret: orion.config.get('FACEBOOK_SECRET'),
    version: 'v2.3'
})
*/

FBGraph.init({
  appId: process.env.FACEBOOK_APPID,
  secret: process.env.FACEBOOK_SECRET,
  version: 'v2.3'
});
