Template.clientsFacebookKeysLink.onCreated(function() {
  var self = this;
  self.autorun(function () {
    self.subscribe('clientsFacebookKeysLink', Router.current().params._id);
  });
})

Template.clientsFacebookKeysLink.onRendered(function() {
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.3&appId=" + orion.config.get('FACEBOOK_APPID');
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
})

Template.clientsFacebookKeysLink.helpers({
  facebookKey: function () {
    return FacebookKeys.findOne(Router.current().params._id);
  }
});

Template.clientsFacebookKeysLink.events({
  'click .fb-login': function () {
    FB.login(function(response) {
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        Meteor.call('saveFacebookKey', Router.current().params._id, response.authResponse);
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    }, {scope: 'read_insights,manage_pages'});
  }
});