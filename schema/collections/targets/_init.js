Targets = new orion.collection('targets', {
  singularName: 'target', 
  pluralName: 'targets', 
  title: 'Targets',
  link: {
    title: 'Targets' 
  },
  tabular: {
    columns: [
      { data: 'analist', title: 'Analista' },
      { data: 'name', title: 'Nombre' },
      { data: 'isCompetition', title: 'Marca/Competencia', render: function(val) { return val ? 'Competencia' : 'Marca' } },
    ]
  }
});