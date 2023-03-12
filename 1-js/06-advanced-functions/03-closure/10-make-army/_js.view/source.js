function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // funcția shooter
      alert( i ); // ar trebui să arate numărul său
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // numărul shooter 0 arată 10
army[5](); // și numărul 5 de asemeni produce 10...
// ... toți shooters arată 10 în loc de 0, 1, 2, 3...
*/
