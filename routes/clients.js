Meteor.startup(function() {
  Router.route('/:slug', {
    name: 'clients.reports.index',
    layoutTemplate: 'layout'
  })
})
