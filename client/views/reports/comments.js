Template.reportsComments.onRendered(function() {
  console.log(this.data);
})

Template.reportsComments.helpers({
  comments: function() {
    return this.report.comments[this.item];
  }
})

Template.reportsComments.events({
  'click .new-comment-btn': function(event, template) {
    var comment = template.$('.new-comment-textarea').val();
    var modifier = {};
    modifier['comments.' + this.item] = comment;
    Reports.update(this.report._id, { $addToSet: modifier });
    template.$('.new-comment-textarea').val('');
  }
})
