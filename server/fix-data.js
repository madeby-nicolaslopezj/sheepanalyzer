var json = Assets.getText('accounts.json');
var accounts = JSON.parse(json);
data = [];


var lastFacebook = null;
_.each(accounts, function(row) {
  var facebook = row.FIELD8.replace('https://www.facebook.com/', '');
  var currentItem;
  if (facebook) {
    lastFacebook = facebook;
    currentItem = {
      id: lastFacebook,
      name: row.FIELD2,
      facebook: {
        objectId: facebook
      },
      twitter: {
        directMentions: [],
        indirectMentions: []
      }
    };
    data.push(currentItem);
  } else {
    currentItem = _.findWhere(data, { id: lastFacebook });
  }

  row.FIELD4 && currentItem.twitter.directMentions.push(row.FIELD4.replace('@', ''));

  if (row.FIELD6) {
    if (row.FIELD7) {
      currentItem.twitter.indirectMentions.push({
        mention: row.FIELD6.trim(),
        containingAlso: row.FIELD7.split(',').map(function(str) { return str.trim() })
      });
    } else {
      currentItem.twitter.indirectMentions.push({
        mention: row.FIELD6.trim()
      });
    }
  }
});

Router.route('data', function() {
  this.response.end(JSON.stringify(data, null, 2));
}, { where: 'server' });
