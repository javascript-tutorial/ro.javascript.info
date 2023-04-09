
# Map and Set

Până acum, am învățat despre următoarele structuri complexe de date:

- Obiectele sunt utilizate pentru stocarea colecțiilor cu chei.
- Array-urile sunt utilizate pentru stocarea colecțiilor ordonate.

Dar acest lucru nu este suficient pentru viața reală. De aceea există și `Map` și `Set`.

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) este o colecție de elemente de date cu chei, exact ca un `Object`. Dar diferența principală este că `Map` permite chei de orice tip.

Metodele și proprietățile sunt:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creează map.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stochează valoarea în funcție de cheie.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returnează valoarea în funcție de cheie, `undefined` dacă `key` nu există în map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returnează `true` dacă `key` există, `false` în caz contrar.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- elimină elementul (perechea cheie/valoare) în funcție de cheie.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- elimină totul din map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returnează numărul curent de elemente.

De exemplu:

```js run
let map = new Map();

map.set('1', 'str1');   // o cheie string
map.set(1, 'num1');     // o cheie numerică
map.set(true, 'bool1'); // o cheie boolean

// vă amintiți de Obiectul obișnuit? acesta ar converti cheile în șiruri de caractere
// Map păstrează tipul, deci acestea două sunt diferite:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

După cum putem vedea, spre deosebire de obiecte, cheile nu sunt convertite în șiruri de caractere. Orice tip de cheie este posibilă.

```smart header="`map[key]` nu este modalitatea corectă de utilizare a unui `Map`"
Deși `map[key]` funcționează de asemenea, e.g. putem seta `map[key] = 2`, acest lucru tratează `map` ca pe un obiect obișnuit JavaScript, deci implică toate limitările corespunzătoare (numai chei de tip string/simbol și așa mai departe).

Deci ar trebui să folosim metodele `map`: `set`, `get` și așa mai departe.
```

**Map poate folosi și obiecte ca și chei.**

De exemplu:

```js run
let john = { name: "John" };

// pentru fiecare utilizator, să stocăm numărul de vizite ale acestuia
let visitsCountMap = new Map();

// john este cheia pentru hartă
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Utilizarea obiectelor drept chei este una dintre cele mai notabile și importante caracteristici ale `Map`. Același lucru nu se pune la socoteală pentru `Object`. String ca cheie în `Object` este în regulă, dar nu putem folosi un alt `Object` drept cheie în `Object`.

Să încercăm:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // încercați să folosiți un obiect

visitsCountObj[ben] = 234; // încercați să folosiți obiectul ben ca și cheie
visitsCountObj[john] = 123; // încercați să utilizați obiectul john ca cheie, obiectul ben va fi înlocuit.

*!*
// Asta este ceea ce s-a scris!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

Deoarece `visitsCountObj` este un obiect, acesta convertește toate cheile `Object`, cum ar fi `john` și `ben` de mai sus, în același șir de caractere `"[object Object]"`. Cu siguranță nu este ceea ce ne dorim.

```smart header="Cum compară `Map` cheile"
Pentru a testa echivalența cheilor, `Map` folosește algoritmul [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Este aproximativ la fel ca egalitatea strictă `===`, dar diferența este că `NaN` este considerat egal cu `NaN`. Astfel `NaN` poate fi folosit și ca cheie de asemenea.

Acest algoritm nu poate fi modificat sau personalizat.
```

````smart header="Înlănțuire"
Fiecare apel `map.set` returnează map însăși, astfel încât putem "înlănțui" apelurile:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Iterare peste Map

Pentru a parcurge un `map`, există 3 metode:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- returnează un iterabil pentru chei,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- returnează un iterabil pentru valori,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- returnează un iterabil pentru intrările `[cheie, valoare]`, este utilizat în mod implicit în `for..of`.

De exemplu:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterați peste chei (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterați peste valori (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterați peste intrările [cheie, valoare]
for (let entry of recipeMap) { // același lucru ca și în recipeMap.entries()
  alert(entry); // cucumber,500 (și așa mai departe)
}
```

```smart header="Se folosește ordinea de inserție"
Iterația se desfășoară în aceeași ordine în care au fost inserate valorile. `Map` păstrează această ordine, spre deosebire de un `Object` obișnuit.
```

Pe lângă asta, `Map` are o metodă încorporată `forEach`, similară cu `Array`:

```js
// rulează funcția pentru fiecare pereche (cheie, valoare)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map din Obiect

Când se creează un `Map`, putem transmite un array (sau un alt iterabil) cu perechi cheie/valoare pentru inițializare, astfel:

```js run
// array de perechi [cheie, valoare].
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Dacă avem un obiect obișnuit, și dorim să creăm un `Map` din el, atunci putem folosi metoda încorporată [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) care returnează o matrice de perechi cheie/valoare pentru un obiect exact în acest format.

Astfel putem crea un map dintr-un obiect în felul următor:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Aici, `Object.entries` returnează matricea de perechi cheie/valoare: `[ ["name","John"], ["age", 30] ]`. De asta are nevoie `Map`.


## Object.fromEntries: Obiect din Map

Tocmai am văzut cum să creăm `Map` dintr-un obiect obișnuit cu `Object.entries(obj)`.

Există metoda `Object.fromEntries` care face invers: primind o matrice de perechi `[key, value]`, aceasta creează un obiect din ele:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// acum prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Putem folosi `Object.fromEntries` pentru a obține un obiect obișnuit din `Map`.

E.g. stocăm datele într-un `Map`, dar trebuie să le transmitem unui cod terț care așteaptă un obiect obișnuit.

Iată cum procedăm:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // face un obiect obișnuit (*)
*/!*

// gata!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Un apel către `map.entries()` returnează un iterabil de perechi cheie/valoare, exact în formatul corect pentru `Object.fromEntries`.

Am putea de asemenea să facem linia `(*)` mai scurtă:
```js
let obj = Object.fromEntries(map); // omit .entries()
```

Este același lucru, deoarece `Object.fromEntries` așteaptă ca argument un obiect iterabil. Nu neapărat o matrice. Iar iterația standard pentru `map` returnează aceleași perechi cheie/valoare ca și `map.entries()`. Deci obținem un obiect obișnuit cu aceleași chei/valori ca și `map`.

## Set

Un [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) este un tip special de colecție - "set de valori" (fără chei), în care fiecare valoare poate apărea o singură dată.

Principalele sale metode sunt:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creează setul și, dacă este furnizat un obiect `iterable` (de obicei o matrice), copiază valorile din acesta în set.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adaugă o valoare, returnează setul însuși.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- elimină valoarea, returnează `true` dacă `value` a existat la momentul apelului, altfel `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returnează `true` dacă valoarea există în set, altfel `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- elimină totul din set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- este numărul de elemente.

Caracteristica principală este că apelurile repetate ale `set.add(value)` cu aceeași valoare nu fac nimic. Acesta este motivul pentru care fiecare valoare apare într-un `Set` doar o singură dată.

De exemplu, avem vizitatori care vin și, am dori să ne amintim de toți. Dar vizitele repetate nu ar trebui să ducă la dubluri. Un vizitator trebuie să fie "numărat" o singură dată.

`Set` este exact ceea ce trebuie pentru asta:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// vizite, unii utilizatori vin de mai multe ori
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// setul păstrează numai valorile unice
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (apoi Pete și Mary)
}
```

Alternativa la `Set` ar putea fi o matrice de utilizatori, iar codul să verifice dacă există dubluri la fiecare inserare folosind [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Dar performanța ar fi mult mai slabă, deoarece această metodă parcurge întreaga matrice verificând fiecare element. `Set` este mult mai bine optimizat la nivel intern pentru verificarea unicității.

## Iteration over Set

We can loop over a set either with `for..of` or using `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Note the funny thing. The callback function passed in `forEach` has 3 arguments: a `value`, then *the same value* `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But this may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

The same methods `Map` has for iterators are also supported:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- returns an iterable object for values,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- same as `set.keys()`, for compatibility with `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## Summary

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- is a collection of keyed values.

Methods and properties:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key, returns the map itself.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- is a collection of unique values.

Methods and properties:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value (does nothing if `value` exists), returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can't say that these collections are unordered, but we can't reorder elements or directly get an element by its number.
