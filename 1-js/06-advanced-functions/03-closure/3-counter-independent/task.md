importance: 5

---

# Sunt contoarele independente?

Aici facem două contoare: `counter` și `counter2` folosind aceeași funcție `makeCounter`.

Sunt ele independente? Ce va arăta cel de-al doilea contor? `0,1` sau `2,3` sau altceva?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

