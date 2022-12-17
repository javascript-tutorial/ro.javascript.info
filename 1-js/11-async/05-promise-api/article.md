# Promise API

Există 6 metode statice în clasa `Promise`. Vom acoperi rapid cazurile de utilizare a acestora aici.

## Promise.all

Să spunem că dorim ca mai multe promisiuni să se execute în paralel și să așteptăm până când toate sunt gata.

De exemplu, să descărcăm mai multe URL-uri în paralel și să procesăm conținutul odată ce toate sunt gata.

La asta servește `Promise.all`.

Sintaxa este:

```js
let promise = Promise.all(iterable);
```

`Promise.all` primește un iterabil (de obicei, un array de promisiuni) și returnează o nouă promisiune.

Noua promisiune se rezolvă atunci când toate promisiunile listate sunt rezolvate, iar array-ul cu rezultate acestora devine rezultatul său.

De exemplu, `Promise.all` de mai jos se soluționează după 3 secunde, iar rezultatul său este un array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 când promisiunile sunt gata: fiecare promisiune contribuie cu un membru în array
```

Vă rugăm să notați că ordinea membrilor array-ului rezultat este aceeași cu cea din promisiunile sursă. Chiar dacă prima promisiune ia cel mai mult timp pentru a fi rezolvată, ea este totuși prima în lista de rezultate.

Un truc obișnuit este de a mapa un array cu date de sarcini într-un array cu promisiuni și apoi a le împacheta în `Promise.all`.

De exemplu, dacă avem un array de URL-uri, le putem prelua pe toate în felul următor:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// mapează fiecare url la promisiunea lui fetch
let requests = urls.map(url => fetch(url));

// Promise.all așteaptă până când toate sarcinile sunt resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

Un exemplu mai amplu cu preluarea informațiilor utilizatorilor pentru un array de utilizatori GitHub după numele lor (am putea prelua un array de bunuri după id-urile lor, logica este identică):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // toate răspunsurile sunt rezolvate cu succes
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // arată 200 pentru fiecare url
    }

    return responses;
  })
  // mapează array de răspunsuri într-un array de response.json() pentru a citi conținutul lor
  .then(responses => Promise.all(responses.map(r => r.json())))
  // toate răspunsurile JSON sunt parsate: "users" este array-ul lor
  .then(users => users.forEach(user => alert(user.name)));
```

**Dacă oricare dintre promisiuni este respinsă, promisiunea returnată de `Promise.all` este respinsă imediat cu acea eroare.**

De exemplu:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Uuups!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Uuups!
```

Aici a doua promisiune este respinsă în două secunde. Asta duce la o respingere imediată a `Promise.all`, așa că se execută `.catch`: eroarea de respingere devine rezultatul întregii `Promise.all`.

```warn header="În cazul unei erori, celelalte promisiuni sunt ignorate"
Dacă o promisiune este respinsă, `Promise.all` se respinge imediat, uitând complet de celelalte din listă. Rezultatele acestora sunt ignorate.

De exemplu, dacă sunt mai multe apeluri `fetch`, ca în exemplul de mai sus, și unul eșuează, celelalte vor continua să se execute, dar `Promise.all` nu le va mai urmări. Probabil că se vor soluționa, dar rezultatele lor vor fi ignorate.

`Promise.all` nu face nimic pentru a le anula, deoarece nu există conceptul de "anulare" în promisiuni. În [un alt capitol](info:fetch-abort) vom acoperi `AbortController` care poate ajuta cu asta, dar nu face parte din Promise API.
```

````smart header="`Promise.all(iterable)` permite valori non-promise \"regular\" în `iterable`"
În mod normal, `Promise.all(...)` acceptă un iterabil (în cele mai multe cazuri un array) de promisiuni. Dar dacă unul dintre aceste obiecte nu este o promisiune, este trecut în array-ul rezultat "așa cum este".

De exemplu, aici rezultatele sunt `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Deci putem trece valori pregătite la `Promise.all` acolo unde este convenabil.
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` se respinge în întregime dacă orice promisiune este respinsă. Acest lucru este bun pentru cazurile "totul sau nimic", când avem nevoie de *toate* rezultatele pozitive pentru a continua:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // metoda de randare are nevoie de rezultatele tuturor preluărilor
```

`Promise.allSettled` așteaptă doar ca toate promisiunile să fie soluționate, indiferent de rezultat. Array-ul rezultat are:

- `{status: "fulfilled", value:result}` pentru răspunsurile reușite,
- `{status: "rejected", reason:error}` pentru erori.

De exemplu, ne-ar plăcea să preluăm informații despre utilizatori multipli. Chiar dacă o cerere eșuează, suntem interesați de celelalte.

Să folosim `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

Rezultatele `results` din linia `(*)` de mai sus vor fi:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

Deci pentru fiecare promisiune obținem statusul ei și `valoarea/error`.

### Polyfill

Dacă browserul nu acceptă `Promise.allSettled`, este ușor să facem polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

În acest cod, `promises.map` ia valorile de intrare, le transformă în promisiuni (doar în cazul în care a fost trecută o non-promisiune) cu `p => Promise.resolve(p)` și apoi adaugă gestionarul `.then` la fiecare dintre ele.

Acel gestionar schimbă un rezultat de succes `value` în `{status:'fulfilled', value}`, iar o eroare `reason` în `{status:'rejected', reason}`. Acesta este exact formatul lui `Promise.allSettled`.

Acum putem folosi `Promise.allSettled` pentru a obține rezultatele pentru *toate* promisiunile date, chiar dacă unele dintre ele sunt respinse.

## Promise.race

Similar cu `Promise.all`, dar așteaptă doar prima promisiune soluționată și obține rezultatul (sau eroarea) acesteia.

Sintaxa este:

```js
let promise = Promise.race(iterable);
```

De exemplu, aici rezultatul va fi `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Uuups!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Prima promisiune de aici a fost cea mai rapidă, așa că a devenit rezultatul. După ce prima promisiune soluționată "câștigă cursa", toate celelalte rezultate/erori sunt ignorate.


## Promise.any

Similar cu `Promise.race`, dar așteaptă doar prima promisiune fulfilled și obține rezultatul acesteia. Dacă toate promisiunile date sunt respinse, atunci promisiunea returnată este respinsă cu [`AggregateError`](mdn:js/AggregateError) - un obiect special de eroare care stochează toate erorile promisiunii în proprietatea sa `errors`.

Sintaxa este:

```js
let promise = Promise.any(iterable);
```

De exemplu, aici rezultatul va fi `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Uuups!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Prima promisiune de aici a fost cea mai rapidă, dar a fost respinsă, așa că a doua promisiune a devenit rezultatul. După ce prima promisiune fulfilled "câștigă cursa", toate rezultatele ulterioare sunt ignorate.

Iată un exemplu când toate promisiunile eșuează:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Au!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Eroare!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Au!
  console.log(error.errors[1]); // Error: Eroare!
});
```

După cum puteți vedea, obiectele de eroare pentru promisiunile eșuate sunt disponibile în proprietatea `errors` a obiectului `AggregateError`.

## Promise.resolve/reject

Metodele `Promise.resolve` și `Promise.reject` sunt rareori necesare în codul modern, deoarece sintaxa `async/await` (o vom acoperi [puțin mai târziu](info:async-await)) le face oarecum depășite.

Le acoperim aici pentru completitudine și pentru cei care nu pot folosi `async/await` din anumite motive.

### Promise.resolve

`Promise.resolve(value)` creează o promisiune resolved cu rezultatul `value`.

La fel ca și:

```js
let promise = new Promise(resolve => resolve(value));
```

Metoda este utilizată pentru compatibilitate, atunci când se așteaptă ca o funcție să returneze o promisiune.

De exemplu, funcția `loadCached` de mai jos preia un URL și îi reține (caches) conținutul. Pentru apelurile viitoare cu același URL aceasta obține imediat conținutul anterior din cache, dar folosește `Promise.resolve` pentru a face o promisiune din acesta, astfel încât valoarea returnată este întotdeauna o promisiune:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Putem scrie `loadCached(url).then(…)`, deoarece funcția este garantată să returneze o promisiune. Putem folosi întotdeauna `.then` după `loadCached`. Acesta este scopul lui `Promise.resolve` din linia `(*)`.

### Promise.reject

`Promise.reject(error)` creează o promisiune respinsă cu `error`.

La fel ca:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

În practică, această metodă nu este aproape niciodată utilizată.

## Sumar

Există 6 metode statice ale clasei `Promise`:

1. `Promise.all(promises)` -- așteaptă ca toate promisiunile să se rezolve și returnează un array cu rezultatele lor. Dacă oricare dintre promisiunile date este respinsă, aceasta devine eroarea din `Promise.all`, iar toate celelalte rezultate sunt ignorate.
2. `Promise.allSettled(promises)` (metodă adăugată recent) -- așteaptă ca toate promisiunile să se soluționeze și returnează rezultatele lor ca un array de obiecte cu:
    - `status`: `"fulfilled"` sau `"rejected"`.
    - `value` (dacă sunt fulfilled) sau `reason` (dacă sunt rejected).
3. `Promise.race(promises)` -- așteaptă ca prima promisiune să se soluționeze, iar rezultatul/eroarea acesteia devine rezultatul.
4. `Promise.any(promises)` (metodă adăugată recent) -- așteaptă ca prima promisiune să fie fulfilled, iar rezultatul acesteia devine rezultatul. Dacă toate promisiunile date sunt respinse, [`AggregateError`](mdn:js/AggregateError) devine eroarea din `Promise.any`.
5. `Promise.resolve(value)` -- realizează o promisiune resolved cu valoarea dată.
6. `Promise.reject(error)` -- realizează o promisiune rejected cu eroarea dată.

Dintre toate acestea, `Promise.all` este probabil cea mai frecventă în practică.
