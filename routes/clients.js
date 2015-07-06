Meteor.startup(function() {
  Router.route('/:slug', {
    name: 'clients.reports.index',
    layoutTemplate: 'clientsLayout'
  })

  Router.route('/:slug/generar-reporte', {
    name: 'clients.reports.create',
    layoutTemplate: 'clientsLayout'
  })

  Router.route('/:slug/reportes/:_id', {
    name: 'clients.reports.show',
    layoutTemplate: 'clientsLayout'
  })
})
