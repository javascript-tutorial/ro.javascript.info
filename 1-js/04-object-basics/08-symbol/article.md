
# Tipul simbol ("symbol")

Conform specificațiilor, doar două tipuri primitive pot servi drept chei de proprietăți ale obiectului:

- tipul string, sau
- tipul symbol.

În caz contrar, dacă cineva folosește alt tip, cum ar fi număr, este autoconvertit în string. Astfel `obj[1]` este același cu `obj["1"]`, și `obj[true]` este același cu `obj["true"]`.

Până acum am folosit doar string. 

Acum haideți sa explorăm symbol, să vedem ce pot face ele pentru noi.

## Simboluri

Un "symbol" reprezintă un identificator unic.

O valoare de acest tip poate fi creată folosind `Symbol()`:

```js
let id = Symbol();
```

După creare, putem aloca o descriere simbolului (numită și symbol name), folositoare îndeosebi pentru scopuri de depanare:

```js
// id este un simbol cu descrierea "id"
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

Așadar, pentru a rezuma, un simbol este o "valoare unică primitive" cu o descriere opțională. Haideți să vedem unde le putem folosi.

````warn header="Simbolurile nu se auto-convertesc la un șir"
Cele mai multe valori în JavaScript suportă conversie implicită la un șir. De exemplu, putem `alert`-a aproape orice valoare și va funcționa. Simbolurile sunt speciale. Ele nu se auto-convertesc.

De exemplu, următoarea instrucțiune `alert` va genera o eroare:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Aceasta este un "language guard" împotriva încurcăturilor, deoarece string și symbol sunt fundamental diferite și nu ar trebui să se convertească din greșeală unul în celălalt.

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

Simbolurile ne permit să creăm proprietăți "ascunse" ale unui obiect, pe care nicio altă parte a codului nu le poate accesa sau suprascrie din greșeală.

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

Deoarece obiectele `user` aparțin altui cod, nu este sigur să le adăugăm câmpuri, deoarece am putea afecta comportamentul predefinit în acel codebase. Cu toate acestea, simbolurile nu pot fi accesate din greșeală. Codul terților nu va fi conștient de simbolurile nou definite, deci este sigur să adăugăm symbol la obiectele `user`.

De asemenea, imaginați-vă că un alt script dorește să aibă propriul său identificator în interiorul obiectului `user`, pentru propriile sale scopuri.

Apoi acel script își poate crea propriul `Symbol("id")`, ca aici:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Nu va exista niciun conflict între identificatorul nostru și al lor, deoarece simbolurile sunt întotdeauna diferite, chiar dacă au același nume.

...Însă, dacă am folosi un șir `"id"` în loc de un simbol pentru același scop, atunci *va* exista un conflict:

```js
let user = { name: "John" };

// Script-ul nostru folosește proprietatea "id"
user.id = "Our id value";

// ...Alt script dorește "id" pentru scopurile sale...

user.id = "Their id value"
// Boom! rescris de alt script!
```

### Simboluri într-un object literal

Dacă vrem să folosim un simbol într-un obiect literal `{...}`, avem nevoie de paranteze pătrate în jurul lui.

Ca aici:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // nu "id": 123
*/!*
};
```
Asta deoarece avem nevoie de valoarea din variabila `id` ca și cheie, nu de șirul "id".

### Simbolurile sunt sărite de for..in

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
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) le ignoră, de asemenea. Aceasta este o parte a principiului general "ascunderea proprietăților simbolice". Dacă un alt script sau librărie iterează asupra obiectului nostru, nu va accesa neașteptat o proprietate simbol.

În contrast, metoda [Object.assign](mdn:js/Object/assign) copiază atât proprietățile string cât și symbol:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Nu este niciun paradox aici. Așa este construit. Ideea este că, atunci când clonăm un obiect sau contopim obiecte, de obicei vrem ca *toate* proprietățile să fie copiate (incluzând simboluri precum `id`).

## Simboluri globale

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

Am văzut că pentru simbolurile globale, `Symbol.for(key)` returnează un simbol după nume. Pentru a face opusul -- să returnăm un nume pentru un simbol global -- putem folosi: `Symbol.keyFor(sym)`:

De exemplu:

```js run
// accesează simbolul după nume
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// accesează numele după simbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

Acest `Symbol.keyFor` utilizează în mod intern registrul global de simboluri pentru a căuta cheia simbolului. Deci nu funcționează pentru simboluri non-globale. Dacă simbolul nu este global, nu îl va putea găsi și va returna `undefined`.

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

Simbolurile sunt întotdeauna valori diferite, chiar dacă au același nume. Dacă vrem ca simbolurile cu același nume să fie egale, atunci trebuie să folosim registrul global: `Symbol.for(key)` returnează (creează dacă este nevoie) un simbol global cu `cheie` ca și nume. Apelări multiple a `Symbol.for` cu aceeași `key` returnează exact același simbol.

Simbolurile au două cazuri principale de folosire:

1. Proprietăți "ascunse" ale unui obiect.

    Dacă vrem să adăugăm o proprietate într-un obiect care "aparține" altui script sau un library, putem crea un simbol și îl putem folosi ca și property key. O proprietate simbolică nu apare în `for..in`, așa că nu va fi procesată accidental împreună cu alte proprietăți. De asemenea nu va fi accesată direct, deoarece un alt script nu are simbolul nostru. Așa că proprietatea va fi protejată împotriva utilizării sau suprascrierii accidentale.

    Deci putem ascunde "după cortină" ceva în obiectele de care avem nevoie, dar pe care alții nu ar trebui să le vadă, folosind proprietăți simbolice.

2. Există multe simboluri sistem folosite de JavaScript care sunt accesibile prin `Symbol.*`. Le putem folosi pentru a altera câteva comportamente incluse în limbaj. De exemplu, mai târziu în tutorial vom folosi `Symbol.iterator` pentru [iterabile](info:iterable), `Symbol.toPrimitive` pentru a configura [conversia object-to-primitive](info:object-toprimitive) ș.a.m.d.

Tehnic, simbolurile nu sunt 100% ascunse. Există o metodă built-in [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) care ne permit sa accesăm toate simbolurile. Mai există o metodă numită [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) care returnează  *toate* cheile unui obiect incluzându-le și pe cele simbolice. Dar cele mai multe librării, funcții built-in și construcții de sintaxă nu folosesc aceste metode.
