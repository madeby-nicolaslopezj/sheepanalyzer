/**
 * Sets the target name before its created
 */
Reports.before.insert(function(userId, doc) {
  var target = Targets.findOne(doc.targetId);
  if (!target) {
    return false;
  }

  doc.targetName = target.name;
})
