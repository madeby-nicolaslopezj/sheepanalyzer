exportToColumns = function(title, fields, data) {
  title && check(title, String);
  check(fields, [{
    key: String,
    title: String,
    transform: Match.Optional(Function),
    type: Match.Optional(String)
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
      var value = orion.helpers.searchObjectWithDots(item, field.key) || null;
      value = _.isFunction(field.transform) ? field.transform(value) : value;
      value = String(value);
      row[index] = value
    });
    rows.push(row);
  });

  return rows;
};


exportToCSV = function(title, fields, data) {
  title && check(title, String);
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
      value = _.isFunction(field.transform) ? field.transform(value) : value;
      value = String(value);
      var result = value.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0)
          result = '"' + result + '"';
      row[index] = result
    });
    rows.push(row);
  });

  return rows.map(function(row) {
    return row.join(';');
  }).join('\n');
};
