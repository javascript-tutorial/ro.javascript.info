Pentru a găsi toate anagramele, să împărțim fiecare cuvânt în litere și să le sortăm. Atunci când sunt ordonate pe litere, toate anagramele sunt identice.

De exemplu:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Vom folosi variantele sortate pe litere ca chei de map pentru a stoca doar o singură valoare pentru fiecare cheie:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // desparte cuvântul după litere, le sortează și le reunește înapoi
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Sortarea literelor se face prin lanțul de apeluri din linia `(*)`.

Pentru conveniență să o împărțim în mai multe linii:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Două cuvinte diferite `'PAN'` și `'nap'` primesc aceeași formă sortată pe litere `'anp'`.

Următoarea linie a pus cuvântul în hartă:

```js
map.set(sorted, word);
```

Dacă vom mai întâlni vreodată un cuvânt cu aceeași formă sortată pe litere, atunci va suprascrie valoarea anterioară cu aceeași cheie din map. Astfel vom avea întotdeauna maxim un cuvânt per formă de literă.

La final `Array.from(map.values())` ia o iterabilă peste valorile din hartă (nu avem nevoie de chei în rezultat) și returnează un array din acestea.

Aici am putea folosi și un obiect simplu în loc de `Map`, deoarece cheile sunt șiruri de caractere.

Iată cum poate arăta soluția:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
