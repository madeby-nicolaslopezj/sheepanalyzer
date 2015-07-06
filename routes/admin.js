Router.route('/admin/status', {
  name: 'admin.status',
  layoutTemplate: 'orionMaterializeLayout'
})

if (Meteor.isClient) {
  orion.addLink({
    section: 'top',
    title: 'Status',
    routeName: 'admin.status',
    activeRouteRegex: 'admin.status',
  });

  orion.accounts.addProtectedRoute('admin.status');
}
