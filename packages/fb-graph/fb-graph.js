FBGraph = {};

/**
 * Sets the credentials
 */
FBGraph.init = function(options) {
  check(options, {
    appId: String,
    secret: String,
    version: Match.Optional(String),
    baseUrl: Match.Optional(String)
  });

  this.appId = options.appId;
  this.secret = options.secret;
  this._accessToken = [this.appId, this.secret].join('|');

  this.version = options.version || 'v2.3';
  this.baseUrl = options.baseUrl || 'https://graph.facebook.com';

  this._initalized = true;
}

FBGraph._call = function(method, path, params, token) {
  path = (_.isArray(path) ? _.clone(path) : [path]).join('/');
  path = this.baseUrl + '/' + path;

  params = params || {};

  _.extend(params, {
    access_token: (token || this._accessToken)
  });

  var result = HTTP.call(method, path, {
    params: params
  })

  if (result.statusCode != 200) {
    // error
  }

  return result.data;
}

FBGraph.get = function(path, params, token) {
  try {
    return this._call('GET', path, params, token);
  } catch (e) {
    try {
      console.log('Trying again (2)');
      return this._call('GET', path, params, token);
    } catch (e) {
      try {
        console.log('Trying again (3)');
        return this._call('GET', path, params, token);
      } catch (e) {
        try {
          console.log('Trying again (4)');
          return this._call('GET', path, params, token);
        } catch (e) {
          console.log('Didn\'t work in 4 times, will throw error...');
          throw e;
        }
      }
    }
  }
}

FBGraph.getPlain = function(url) {
  try {
    var result = HTTP.call('GET', url);
    return result.data;
  } catch (e) {
    try {
      console.log('Trying again (2)');
      var result = HTTP.call('GET', url);
      return result.data;
    } catch (e) {
      try {
        console.log('Trying again (3)');
        var result = HTTP.call('GET', url);
        return result.data;
      } catch (e) {
        try {
          console.log('Trying again (4)');
          var result = HTTP.call('GET', url);
          return result.data;
        } catch (e) {
          console.log('Didn\'t work in 4 times, will throw error...');
          throw e;
        }
      }
    }
  }
}

FBGraph.fetchFullArray = function(path, params, token) {
  var response = this._call('GET', path, params, token);
  var data = response.data;

  while (response && response.paging && response.paging.next) {
    response = this.getPlain(response.paging.next);
    data = _.union(data, response.data);
    console.log(data.length, 'items found until now');
  }

  return data;
}
