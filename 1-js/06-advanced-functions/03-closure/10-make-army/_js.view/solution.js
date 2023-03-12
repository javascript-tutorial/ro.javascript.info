function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // funcția shooter
      alert( i ); // ar trebui să arate numărul său
    };
    shooters.push(shooter);
  }

  return shooters;
}
