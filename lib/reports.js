ReportsItems = {};
ReportsItems.info = {
  'fb:active-users': {
    title: 'Ranking de usuarios mas activos',
    csvFields: [
      { key: '_id', title: 'User', transform: function(value) { return 'http://facebook.com/' + value } },
      { key: 'comments', title: 'Comentarios' },
      { key: 'likes', title: 'likes' }
    ]
  },
  'fb:best-comments': {
    title: 'Comentarios mas relevantes',
    csvFields: [
      { key: 'id', title: 'Comment', transform: function(value) { return 'http://facebook.com/' + value } },
      { key: 'from.id', title: 'User', transform: function(value) { return 'http://facebook.com/' + value } },
      { key: 'message', title: 'Contenido' },
      { key: 'created_time', title: 'Fecha' },
      { key: 'like_count', title: 'Likes' }
    ]
  }
}

ReportsItems.titles = {};
_.each(ReportsItems.info, function(value, key) {
  ReportsItems.titles[key] = value.title;
});

ReportsItems.types = _.keys(ReportsItems.titles);
