AutoForm.addHooks('createReportsForm', {
  onSuccess: function(formType, result) {
    Router.go('clients.reports.show', { slug: Router.current().params.slug, _id: result });
  }
})
