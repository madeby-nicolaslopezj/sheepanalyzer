exportToCSV = function(title, fields, data) {
  check(title, Match.Optional(String));
  check(fields, [{
    key: String,
    title: String,
    transform: Match.Optional(Function)
  }]);
  check(data, [Object]);

  var rows = [];

  if (title) {
    rows.push([title]);
  }

  var titles = [];
  _.each(fields, function(field) {
    titles.push(field.title);
  });
  rows.push(titles);

  _.each(data, function(item) {
    var row = [];
    _.each(fields, function(field, index) {
      var value = orion.helpers.searchObjectWithDots(item, field.key) || '';
      row[index] = (_.isFunction(field.transform) && field.transform(value)) || value;
    });
    rows.push(row);
  });

  return rows.map(function(row) {
    return row.join(';');
  }).join('\n');
};
