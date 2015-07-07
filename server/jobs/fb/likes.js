JobTypes['fb:likes'] = function(job) {
  var objectId = job.data.objectId;

  console.log('Fetching page [', objectId, '] likes')

  var data = FBGraph.get(objectId, { fields: 'likes' });

  var likes = data.likes;

  DataFBLikes.insert({ targetId: job.targetId, likes: likes });

  console.log('Has ' + likes + ' likes')

  // Each day at 14:00:00
  return moment().add(1, 'day').hour(14).minute(0).second(0).toDate();
}
