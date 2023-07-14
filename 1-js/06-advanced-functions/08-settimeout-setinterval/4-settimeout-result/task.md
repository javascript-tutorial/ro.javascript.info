importance: 5

---

# Ce va arăta setTimeout?

În codul de mai jos este planificat un apel `setTimeout`, apoi se rulează un calcul intensiv, care durează mai mult de 100ms pentru a se termina.

Când se va executa funcția planificată?

1. După buclă.
2. Înainte de buclă.
3. La începutul buclei.


Ce va arăta `alert`?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// să presupunem că timpul de execuție a acestei funcții este >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
