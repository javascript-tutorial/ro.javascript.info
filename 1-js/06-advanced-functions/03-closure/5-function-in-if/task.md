importance: 5

---
# Funcție în if

Priviți codul. Care va fi rezultatul apelului de la ultima linie?

```js run
let phrase = "Bună ziua";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
