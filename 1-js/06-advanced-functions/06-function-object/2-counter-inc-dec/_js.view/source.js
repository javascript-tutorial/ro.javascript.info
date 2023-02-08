function makeCounter() {
  let count = 0;

  // ... codul vostru ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // setează noul count

alert( counter() ); // 10

counter.decrease(); // scade count cu 1

alert( counter() ); // 10 (în loc de 11)
