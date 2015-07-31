Template.adminTargetsData.onRendered(function() {
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 3,
    format: 'dd/mm/yyyy',
    max: new Date()
  });
});

Template.adminTargetsData.events({
  'click .download-btn': function(event, template) {
    var fromDate = moment($('.date-from').val(), 'DD/MM/YYYY')
    var toDate = moment($('.date-to').val(), 'DD/MM/YYYY')

    if (!$('.date-from').val() || !$('.date-to').val()) {
      alert('Debes elegir el rango de fechas');
      return;
    }

    if (fromDate.isAfter(toDate)) {
      alert('Las fechas son incorrectas');
      return;
    }

    var type = $(event.currentTarget).attr('data-type');
    var targetId = Router.current().params._id;
    var path = '/download-data/' + targetId + '/' + type + '/' + fromDate.unix() + '/' + toDate.unix();

    window.open(path, '_blank');
  }
});
