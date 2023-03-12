importance: 5

---

# Armata de funcții

Următorul cod creează o matrice de `shooters`.

Fiecare funcție este menită să emită numărul său. Dar ceva nu este în regulă...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // crează o funcție shooter,
      alert( i ); // care ar trebui să arate numărul său
    };
    shooters.push(shooter); // și adăugați-l la matrice
    i++;
  }

  // ...și returnează matricea de shooters
  return shooters;
}

let army = makeArmy();

*!*
// toți shooters arată 10 în loc de numerele lor 0, 1, 2, 3...
army[0](); // 10 de la shooter cu numărul 0
army[1](); // 10 de la shooter cu numărul 1
army[2](); // 10 ...și așa mai departe.
*/!*
```

De ce toți shooters arată aceeași valoare? 

Remediați codul astfel încât acestea să funcționeze așa cum a fost intenționat.

