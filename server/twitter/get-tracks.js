Meteor.methods({
  getTwitterTracks: function() {
    var tracks = [];

    Targets.find({}, { fields: { twitter: 1 } }).forEach(function(target) {
      _.each(target.twitter.directMentions, function(username) {
        tracks.push({ targetId: target._id, track: ('@' + username), regex: new RegExp('(' + '@' + username + ')', 'gi') });
      })

      var indirects = target.twitter.indirectMentions;
      if (indirects) {
        _.each(indirects, function(item) {
          if (item && item.containingAlso) {
            _.each(item.containingAlso, function(also) {
              tracks.push({ targetId: target._id, track: (item.mention + ' ' + also), regex: new RegExp('(' + item.mention + ').*(' + also + ')|(' + also + ').*(' + item.mention + ')', 'gi') });
            })
          } else if (item) {
            tracks.push({ targetId: target._id, track: item.mention, regex: new RegExp('(' + item.mention + ')', 'gi') });
          }
        });
      }
    });

    return tracks;
  }
})
