Package.describe({
  name: 'nicolaslopezj:fb-graph',
  summary: 'Interct with FB graph API, made for meteor',
  version: '1.0.1',
  git: 'https://github.com/nicolaslopezj/meteor-fb-graph'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['http', 'underscore']);

  api.addFiles('fb-graph.js', 'server');

  api.export('FBGraph');
});

Package.onTest(function(api) {
  api.use('tinytest');
});
