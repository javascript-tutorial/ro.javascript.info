
# Tipul simbol ("symbol")

Conform specificațiilor, cheile proprietății obiectului pot fi fie de tip șir ("string"), fie de tip simbol ("symbol"). Nu numere, nu booleene, doar șiruri sau simboluri, aceste două tipuri.

Până acum am folosit doar șiruri. Acum să vedem ce avantaje ne oferă simbolurile.

## Simboluri

Un "symbol" reprezintă un identificator unic.

O valoare de acest tip poate fi creată folosind `Symbol()`:

```js
// id-ul noului simbol
let id = Symbol();
```

După creare, putem aloca o descriere simbolului (mai numită și nume de simbol), folositoare îndeosebi pentru scopuri de depanare:

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
```js run
// id este un simbol cu descrierea "id"
=======
```js
// id is a symbol with the description "id"
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md
let id = Symbol("id");
```

Simbolurile sunt garantate a fi unice. Chiar dacă creăm mai multe simboluri cu aceeași descriere, ele reprezintă valori diferite. Descrierea este doar o etichetă care nu afectează nimic.

De exemplu, mai jos sunt două simboluri cu aceeași descriere -- ele nu sunt egale:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Dacă sunteți familiari cu Ruby sau alt limbaj de programare ce are de asemenea orice fel de "simboluri" -- nu vă lăsați păcălit. Simbolurile JavaScript sunt diferite.

````warn header="Simbolurile nu se auto-convertesc la un șir"
Cele mai multe valori în JavaScript suportă conversie implicită la un șir. De exemplu, putem `alert`-a aproape orice valoare și va funcționa. Simbolurile sunt speciale. Ele nu se auto-convertesc.

De exemplu, următoarea instrucțiune `alert` va genera o eroare:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Aceasta este "protecția limbajului" ("language guard") împotriva stricăciunilor, deoarece șirurile și simbolurile sunt fundamental diferite și nu ar trebui convertite ocazional dintr-unul în altul.
=======
That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md

Dacă vrem neapărat să afișăm un simbol, trebuie să apelăm explicit metoda `.toString()` a acestuia, ca aici:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), acum funcționează
*/!*
```

Sau să obținem proprietatea `symbol.description` pentru a afișa numai descrierea:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## Proprietăți "ascunse"

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Simbolurile ne permit să creăm proprietăți ascunse ale unui obiect, pe care nicio bucată de cod nu le poate accesa sau rescrie accidental.
=======
Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md

De exemplu, dacă lucrăm cu obiecte `user`, ce fac parte din cod extern, am dori să le adăugăm identificatori.

Să folosim o cheie simbol pentru asta:

```js run
let user = { // aparține altui cod
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // putem accesa informația folosind simbolul ca și cheie
```

Care sunt avantajele folosirii `Symbol("id")` față de un șir `"id"`?

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Deoarece obiectele `user` aparțin altui cod, și acel cod lucrează de asemenea cu acestea, nu ar trebui să adăugăm niciun câmp la ele. Este nesigur. Însă un simbol nu poate fi accesat accidental, codul extern, probabil, nici nu-l va vedea, deci pesemne este în regulă să o facem.
=======
As `user` objects belongs to another code, and that code also works with them, we shouldn't just add any fields to it. That's unsafe. But a symbol cannot be accessed accidentally, the third-party code probably won't even see it, so it's probably all right to do.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md

De asemenea, imaginați-vă că un alt script dorește să aibă propriul său identificator în interiorul obiectului `user`, pentru propriile sale scopuri. Poate fi o altă librărie JavaScript, astfel că script-urile nu știu unul de existența celuilalt.

Apoi acel script își poate crea propriul `Symbol("id")`, ca aici:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Nu va exista niciun conflict între identificatorul nostru și al lor, deoarece simbolurile sunt întotdeauna diferite, chiar dacă au același nume.

...Însă, dacă am folosi un șir `"id"` în loc de un simbol pentru același scop, atunci *va* exista un conflict:

```js run
let user = { name: "John" };

// Script-ul nostru folosește proprietatea "id"
user.id = "Our id value";

// ...Alt script dorește "id" pentru scopurile sale...

user.id = "Their id value"
// Boom! rescris de alt script!
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
### Simboluri într-un literal
=======
### Symbols in an object literal
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md

Dacă vrem să folosim un simbol într-un obiect literal `{...}`, avem nevoie de paranteze pătrate în jurul lui.

Ca aici:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
  [id]: 123 // nu "id: 123"
=======
  [id]: 123 // not "id": 123
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md
*/!*
};
```
Asta deoarece avem nevoie de valoarea din variabila `id` ca și cheie, nu de șirul "id".

### Simbolurile sunt ignorate de bucla for..in

Proprietățile simboluri nu participă în bucla `for..in`.

De exemplu:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (niciun simbol)
*/!*

// accesul direct către simbol funcționează
alert( "Direct: " + user[id] );
```

`Object.keys(user)` le ignoră, de asemenea. Aceasta este o parte a principiului general "ascunderea proprietăților simbol". Dacă un alt script sau librărie iterează asupra obiectului, nu va accesa neașteptat o proprietate simbol.

În contrast, metoda [Object.assign](mdn:js/Object/assign) copiază proprietățile de ambele tipuri, șir și simbol:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Nu este niciun paradox aici. Așa este construit. Ideea este că, atunci când clonăm un obiect sau contopim obiecte, în mod normal vrem ca *toate* proprietățile să fie copiate (incluzând simboluri precum `id`).

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
````smart header="Proprietățile cheie de alte tipuri sunt forțate la șiruri"
Putem folosi doar șiruri sau simboluri ca și chei în obiecte. Alte tipuri sunt convertite la șiruri.

De exemplu, un număr `0` devine un șir `"0"` când este folosit ca și proprietate cheie:

```js run
let obj = {
  0: "test" // identic cu "0": "test"
};

// ambele alerte accesează aceeași proprietate (numărul 0 este convertit la șirul "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (aceeași proprietate)
```
````

## Simboluri globale
=======
## Global symbols
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md

După cum am văzut, în mod normal toate simbolurile sunt diferite, chiar dacă au același nume. Însă câteodată dorim ca simbolurile numite identic să fie aceleași entități. De exemplu, diferite părți ale aplicației noastre doresc să acceseze simbolul `"id"` care să însemne exact aceeași proprietate.

Pentru a realiza acest lucru, există un *registru global de simboluri*. Putem crea simboluri în el și le putem accesa mai târziu, și garantează că accesări repetate după același nume returnează fix același simbol.

Pentru a citi (crea dacă nu există) un simbol din registru, folosiți `Symbol.for(key)`.

Acest apel verifică registrul global, și dacă există un simbol descris ca și cheie, atunci îl returnează, în caz contrar, creează un nou simbol `Symbol(key)` și îl stochează în registru după `cheia` dată.

De exemplu:

```js run
// citește din registrul global
let id = Symbol.for("id"); // dacă simbolul nu există, îl creează

// citește din nou (poate din altă parte a codului)
let idAgain = Symbol.for("id");

// același simbol
alert( id === idAgain ); // true
```

Simbolurile din interiorul registrului sunt denumite *simboluri globale*. Dacă dorim un simbol pentru toată aplicația, accesibil peste tot în cod - pentru asta sunt folosite.

```smart header="Asta seamănă cu Ruby"
În unele limbaje de programare, precum Ruby, există un singur simbol pentru un nume.

În JavaScript, după cum putem vedea, acest fapt este adevărat pentru simbolurile globale.
```

### Symbol.keyFor

Pentru simbolurile globale, nu numai `Symbol.for(key)` returnează un simbol după nume, dar există și un apel invers: `Symbol.keyFor(sym)`, care face reversul: returnează un nume după un simbol global.

De exemplu:

```js run
// accesează simbolul după nume
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// accesează numele după simbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Metoda `Symbol.keyFor` folosește intern registrul global de simboluri pentru a căuta cheia simbolului. Deci nu funcționează pentru simboluri non-globale. Dacă simbolul nu este global, nu îl va putea găsi și va returna `undefined`.
=======
The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md

Acestea fiind spuse, orice simbol poate avea proprietatea `description`.

De exemplu:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, simbol global
alert( Symbol.keyFor(localSymbol) ); // undefined, non global

alert( localSymbol.description ); // name
```

## Simboluri sistem

Există multe simboluri "sistem" pe care JavaScript le folosește intern, și pe care le putem folosi pentru a regla fin diverse aspecte ale obiectelor noastre.

Ele sunt listate în specificațiile din tabelul [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...ș.a.m.d.

De exemplu, `Symbol.toPrimitive` ne permite să descriem obiectele la conversii primitive. Îi vom vedea utilizarea foarte curând.

Alte simboluri vor deveni de asemenea familiare după ce vom studia caracteristicile corespunzătoare limbajului.

## Rezumat

`Symbol` este un tip primitiv pentru identificatori unici.

Simbolurile sunt create cu apelul `Symbol()` cu o descriere opțională (name).

Simbolurile sunt întotdeauna valori diferite, chiar dacă au același nume. Dacă vrem ca simbolurile cu același nume să fie egale, atunci trebuie să folosim registrul global: `Symbol.for(key)` returnează (creează dacă este nevoie) un simbol global cu `cheie` ca și nume. Apelări multiple ale metodei `Symbol.for` aceeași `cheie` returnează exact același simbol.

Simbolurile au două cazuri principale de folosire:

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
1. Proprietăți "ascunse" ale unui obiect.
    Dacă vrem să adăugăm o proprietate într-un obiect care "aparține" altui script sau biblioteci, putem crea un simbol și îl putem folosi ca și proprietate cheie. O proprietate simbolică nu apare în `for..in`, motiv pentru care, nu va fi procesată accidental împreună cu alte proprietăți. De asemenea, nu va fi accesată direct, deoarece un alt script nu va avea simbolul nostru. În concluzie, proprietatea va fi protejată împotriva folosirii sau rescrierii accidentale.
=======
1. "Hidden" object properties.
    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/04-object-basics/08-symbol/article.md

    Deci, putem ascunde "după cortină", în obiecte, ceva de care avem nevoie, dar alții nu ar trebui să vadă, folosind proprietăți simbol.

2. Există multe simboluri sistem folosite de JavaScript care sunt accesibile prin `Symbol.*`. Le putem folosi pentru a altera comportamente incluse în limbaj. De exemplu, mai târziu în tutorial vom folosi `Symbol.iterator` pentru [iterables](info:iterable), `Symbol.toPrimitive` pentru a configura [object-to-primitive conversion](info:object-toprimitive) ș.a.m.d.

Tehnic, simbolurile nu sunt 100% ascunse. Există metode ale limbajului JavaScript [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) care ne permit sa accesăm toate simbolurile. Mai există o metodă numită [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) care returnează  *toate* cheile unui obiect incluzându-le și pe cele simbol. Deci ele nu sunt ascunse cu adevărat. Dar cele mai multe biblioteci, funcții incluse în limbaj și construcții de sintaxă nu folosesc aceste metode.
