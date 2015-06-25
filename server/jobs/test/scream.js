Jobs['test:scream'] = function(slave) {
  console.log('ahhhh!!!');

  return moment().add(4, 'minute').toDate();
}

Jobs['test:yell'] = function(slave) {
  console.log('tontoooooooo!!!');


  return moment().add(1, 'minute').toDate();
}