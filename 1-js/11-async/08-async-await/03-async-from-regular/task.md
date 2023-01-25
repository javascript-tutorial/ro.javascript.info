
# Apelarea asincronă din non-asincronă

Avem o funcție "obișnuită" numită `f`. Cum puteți apela funcția `async` `wait()` și să utilizați rezultatul acesteia în interiorul lui `f`?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...ce ar trebui să scrieți aici?
  // trebuie să apelăm async wait() și să așteptăm să primim 10
  // rețineți, nu putem folosi "await"
}
```

P.S. Sarcina este foarte simplă din punct de vedere tehnic, dar întrebarea este destul de frecventă pentru dezvoltatorii noi în async/await.
