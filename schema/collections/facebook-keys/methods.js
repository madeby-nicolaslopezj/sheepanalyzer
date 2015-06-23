Meteor.methods({
  requestFacebookKey: function (objectId) {
    check(objectId, String);
    Roles.checkPermission(this.userId, 'collections.facebook_keys.requestKey');

    var facebookKey = {
      objectId: objectId
    }

    return FacebookKeys.insert(facebookKey);
  },
  saveFacebookKey: function(facebookKeyId, authResponse) {
    check(authResponse, {
      accessToken: String,
      expiresIn: Number,
      signedRequest: String,
      userID: String
    });

    if (!Meteor.isServer) return;

    var facebookKey = FacebookKeys.findOne(facebookKeyId);

    var accounts = FBGraph.get('/me/accounts', {}, authResponse.accessToken);

    var page = _.findWhere(accounts.data, { id: facebookKey.facebookId });

    if (!page) {
      throw new Meteor.Error('incorrect-account', 'The user doesn\'t own this page');
    }

    if (!_.contains(page.perms, 'BASIC_ADMIN')) {
      throw new Meteor.Error('incorrect-account', 'The user doesn\'t permissions to see page insights');
    }

    FacebookKeys.update(facebookKeyId, { $set: { pageToken: page.access_token, userToken: authResponse.accessToken } });
  }
});