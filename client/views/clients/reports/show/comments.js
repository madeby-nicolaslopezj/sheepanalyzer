Template.clientsReportsShowComments.onRendered(function() {
})

Template.clientsReportsShowComments.helpers({
  comments: function() {
    return this.report.comments && this.report.comments[this.item];
  }
})

Template.clientsReportsShowComments.events({
  'click .new-comment-btn': function(event, template) {
    var comment = template.$('.new-comment-input').val();
    var modifier = {};
    modifier['comments.' + this.item] = comment;
    Reports.update(this.report._id, { $addToSet: modifier });
    template.$('.new-comment-input').val('');
  },
  'click .delete-comment-btn': function(event, template) {
    if (confirm('Quieres borrar este comentario?')) {
      var comment = String(this);
      var modifier = {};
      modifier['comments.' + Template.parentData(1)] = comment;
      Reports.update(Template.parentData(2)._id, { $pull: modifier });
    }
  }
})
