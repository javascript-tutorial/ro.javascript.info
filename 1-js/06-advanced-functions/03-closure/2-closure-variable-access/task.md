importance: 5

---

# Ce variabile sunt disponibile?

Funcția `makeWorker` de mai jos creează o altă funcție și o returnează. Această nouă funcție poate fi apelată din altă parte.

Va avea acces la variabilele exterioare de la locul de creare, de la locul de invocare, sau ambele?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// creați o funcție
let work = makeWorker();

// apelați-o
work(); // ce va arăta?
```

Ce valoare va arăta? "Pete" sau "John"?
