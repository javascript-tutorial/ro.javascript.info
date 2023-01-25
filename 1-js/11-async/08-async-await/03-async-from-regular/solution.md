
Acesta este cazul în care este util să știți cum funcționează în interior.

Pur și simplu tratați apelul `async` ca pe o promisiune și atașați-i `.then`:
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // afișează 10 după 1 secundă
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
