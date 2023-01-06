# Async/await

Există o sintaxă specială pentru a lucra cu promisiuni într-un mod mai confortabil, numită "async/await". Este surprinzător de ușor de înțeles și de utilizat.

## Funcții Async

Să începem de la cuvântul cheie `async`. Acesta poate fi plasat înaintea unei funcții, astfel:

```js
async function f() {
  return 1;
}
```

Cuvântul "async" înaintea unei funcții înseamnă un lucru simplu: o funcție returnează întotdeauna o promisiune. Alte valori sunt incluse automat într-o promisiune rezolvată.

De exemplu, această funcție returnează o promisiune rezolvată cu rezultatul `1`; haideți să o testăm:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...Am putea returna în mod explicit o promisiune, ceea ce ar fi la fel:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Deci, `async` se asigură că funcția returnează o promisiune, și înfășoară în ea non-promisiuni. Destul de simplu, nu? Dar nu numai atât. Mai există un alt cuvânt cheie, `await`, care funcționează numai în interiorul funcțiilor `async`, și este destul de cool.

## Await

Sintaxa:

```js
// funcționează numai în interiorul funcțiilor async
let value = await promise;
```

Cuvântul cheie `await` face ca JavaScript să aștepte până când promisiunea respectivă se soluționează și îi returnează rezultatul.

Iată un exemplu cu o promisiune care se rezolvă în 1 secundă:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // așteptă până când promisiunea se rezolvă (*)
*/!*

  alert(result); // "gata!"
}

f();
```

Executarea funcției "se oprește" la linia `(*)` și se reia când promisiunea se soluționează, `result` devenind rezultatul acesteia. Astfel, codul de mai sus arată "gata!" într-o secundă.

Să subliniem: `await` suspendă literalmente execuția funcției până când promisiunea se soluționează, iar apoi o reia cu rezultatul promisiunii. Acest lucru nu costă nicio resursă de CPU, deoarece motorul JavaScript poate face între timp și alte sarcini: să execute alte scripturi, să gestioneze evenimente etc.

Este doar o sintaxă mai elegantă de a obține rezultatul promisiunii decât `promise.then`. Și, este mai ușor de citit și de scris.

````warn header="Nu se poate folosi `await` în funcții obișnuite"
Dacă am încerca să folosim `await` într-o funcție non-async, ar apărea o eroare de sintaxă:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

Putem primi această eroare dacă uităm să punem `async` înaintea unei funcții. După cum am menționat mai devreme, `await` funcționează numai în interiorul unei funcții `async`.
````

Să luăm exemplul `showAvatar()` din capitolul <info:promise-chaining> și să îl rescriem folosind `async/await`:

1. Va trebui să înlocuim apelurile `.then` cu `await`.
2. De asemenea ar trebui să facem funcția `async` pentru ca acestea să funcționeze.

```js run
async function showAvatar() {

  // citeșțe JSON-ul nostru
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // citește utilizatorul github
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // arată avatarul
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // așteaptă 3 secunde
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Destul de curat și ușor de citit, nu? Mult mai bine decât înainte.

````smart header="Modern browsers allow top-level `await` in modules"
In modern browsers, `await` on top level works just fine, when we're inside a module. We'll cover modules in article <info:modules-intro>.

For instance:

```js run module
// we assume this code runs at top level, inside a module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

If we're not using modules, or [older browsers](https://caniuse.com/mdn-javascript_operators_await_top_level) must be supported, there's a universal recipe: wrapping into an anonymous async function.

Like this:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows us to use thenable objects (those with a callable `then` method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with `await`.

Here's a demo `Thenable` class; the `await` below accepts its instances:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

If `await` gets a non-promise object with `.then`, it calls that method providing the built-in functions `resolve` and `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
````

````smart header="Async class methods"
To declare an async class method, just prepend it with `async`:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))
```
The meaning is the same: it ensures that the returned value is a promise and enables `await`.

````
## Error handling

If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, just as if there were a `throw` statement at that line.

This code:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...is the same as this:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

In real situations, the promise may take some time before it rejects. In that case there will be a delay before `await` throws an error.

We can catch that error using `try..catch`, the same way as a regular `throw`:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

In the case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

If we don't have `try..catch`, then the promise generated by the call of the async function `f()` becomes rejected. We can append `.catch` to handle it:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global `unhandledrejection` event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (but not always) more convenient.

But at the top level of the code, when we're outside any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through error, like in the line `(*)` of the example above.
```

````smart header="`async/await` works well with `Promise.all`"
When we need to wait for multiple promises, we can wrap them in `Promise.all` and then `await`:

```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

In the case of an error, it propagates as usual, from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

````

## Summary

The `async` keyword before a function has two effects:

1. Makes it always return a promise.
2. Allows `await` to be used in it.

The `await` keyword before a promise makes JavaScript wait until that promise settles, and then:

1. If it's an error, an exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
