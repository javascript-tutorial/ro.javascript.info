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

````smart header="Browserele moderne permit top-level `await` în module"
În browserele moderne, top-level `await` funcționează chiar bine, atunci când ne aflăm în interiorul unui modul. Vom aborda modulele în articolul <info:modules-intro>.

De exemplu:

```js run module
// presupunem că acest cod rulează la top-level, în interiorul unui modul
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

Dacă nu folosim module, sau [browsere mai vechi](https://caniuse.com/mdn-javascript_operators_await_top_level) trebuie să fie suportate, există o rețetă universală: înfășurarea într-o funcție asincronă anonimă.

Astfel:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await` acceptă \"thenables\""
La fel ca `promise.then`, `await` ne permite să folosim obiecte thenable (cele care au o metodă `then` apelabilă). Ideea este că un obiect terț poate să nu fie o promisiune, dar să fie compatibil cu promisiunile: dacă acceptă `.then`, este suficient pentru a-l folosi cu `await`.

Iată o clasă demo `Thenable`; `await` de mai jos acceptă instanțele sale:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // rezolvă cu this.num*2 după 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // așteaptă 1 secundă, apoi result devine 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

Dacă `await` obține un obiect non-promise cu `.then`, apelează metoda respectivă oferind ca argumente funcțiile integrate `resolve` și `reject` (la fel cum o face în cazul unui executor `Promise` obișnuit). Apoi `await` așteaptă până când una dintre ele este apelată (în exemplul de mai sus se întâmplă în linia `(*)`) și apoi continuă cu rezultatul.
````

````smart header="Metode de clasă asincrone"
Pentru a declara o metodă de clasă asincronă, trebuie doar să o precedați cu `async`.:

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
  .then(alert); // 1 (acesta este același cu (result => alert(result)))
```
Semnificația este aceeași: se asigură că valoarea returnată este o promisiune și permite `await`.

````
## Gestionarea erorilor

Dacă o promisiune se rezolvă normal, atunci `await promise` returnează rezultatul. Dar în cazul unei respingeri, se aruncă eroarea, ca și cum ar exista o instrucțiune `throw` la linia respectivă.

Acest cod:

```js
async function f() {
*!*
  await Promise.reject(new Error("Uuups!"));
*/!*
}
```

...este la fel ca aceasta:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

În situații reale, promisiunea poate dura ceva timp înainte de a fi respinsă. În acest caz va exista o întârziere înainte ca `await` să arunce o eroare.

Putem prinde această eroare folosind `try..catch`, la fel ca un `throw` obișnuit:

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

În cazul unei erori, controlul sare la blocul `catch`. Putem de asemenea să înfășurăm mai multe linii:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // prinde erorile atât din fetch cât și din response.json
    alert(err);
  }
}

f();
```

Dacă nu avem `try..catch`, atunci promisiunea generată de apelarea funcției asincrone `f()` devine respinsă. Putem adăuga `.catch` pentru a o gestiona:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() devine o promisiune respinsă
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

Dacă uităm să adăugăm `.catch` acolo, atunci vom primi o eroare de promisiune negestionată (vizualizabilă în consolă). Putem prinde astfel de erori folosind un gestionar de evenimente global `unhandledrejection`, așa cum este descris în capitolul <info:promise-error-handling>.


```smart header="`async/await` și `promise.then/catch`"
Atunci când folosim `async/await`, rareori avem nevoie de `.then`, deoarece `await` se ocupă de așteptare în locul nostru. Și putem folosi un `try..catch` obișnuit în loc de `.catch`. Acest lucru este de obicei (dar nu întotdeauna) mai convenabil.

Dar la nivelul superior al codului, atunci când ne aflăm în afara oricărei funcții `async`, nu putem ca sintactic să folosim `await`, așa că este o practică normală să adăugăm `.then/catch` pentru a gestiona rezultatul final sau eroarea în cădere, ca în linia `(*)` din exemplul de mai sus.
```

````smart header="`async/await` funcționează bine cu `Promise.all`"
Atunci când trebuie să așteptăm mai multe promisiuni, le putem înfășura în `Promise.all` și apoi `await`:

```js
// așteptă matricea de rezultate
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

În cazul unei erori, aceasta se propagă ca de obicei, de la promisiunea eșuată la `Promise.all`, iar apoi devine o excepție pe care o putem prinde folosind `try..catch` în jurul apelului.

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
