# Bucle: while și for

De multe ori avem nevoie să facem o acțiune repetată.

De exemplu, afișarea elementelor dintr-o listă unul după altul sau rularea aceluiași cod pentru fiecare număr de la 1 la 10.

*Buclele* sunt o soluție pentru a repeta același cod de mai multe ori.

## Bucla "while"

Bucla `while` are următoarea sintaxă:

```js
while (condiția) {
  // codul
  // așa-numitul "corp al buclei"
}
```

Atâta timp cât `condiția` e truthy, `codul` din corpul buclei este excutat.

De exemplu, bucla de mai jos afișează `i` cât timp `i < 3`:

```js run
let i = 0;
while (i < 3) { // afișează 0, apoi 1, apoi 2
  alert( i );
  i++;
}
```

O singură execuție a corpului buclei se numește *o iterație*. Bucla din exemplul de mai sus face trei iterații.

Dacă `i++` lipsea din exemplul de mai sus, bucla s-ar repeta (în teorie) pentru totdeauna. În practică, browserul oferă moduri de a opri astfel de bucle, iar în codul Javascript rulat pe server, putem opri procesul.

Orice expresie sau variabilă poate fi o condiție a unei bucle, nu doar comparațiile: condiția e evaluată și transformată într-un boolean de către `while`.

De exemplu, putem scrie mai scurt `while (i != 0)` ca `while (i)`:

```js run
let i = 3;
*!*
while (i) { // atunci când i devine 0, condiția devine falsy, iar bucla se oprește
*/!*
  alert( i );
  i--;
}
```

````smart header="Acoladele nu sunt necesare pentru un corp care conține o singură linie de cod"
Dacă corpul buclei are o singură linie de cod, putem omite acoladele `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## Bucla "do...while"

Verificarea condiției poate fi mutată *sub* corpul funcției folosind sintaxa `do...while`:

```js
do {
  // corpul buclei
} while (condția);
```

Bucla va rula mai întâi corpul, apoi va verifica condiția, și, cât timp aceasta e truthy, o va executa iar și iar.

De exemplu:

```js
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Acest tip de sintaxă ar trebui folosit atunci când vrei ca corpul buclei să se execute **cel puțin o dată** indiferent dacă condiția e truthy sau nu. De obicei, se preferă cealaltă formă: `while(...) {...}`

## Bucla "for"

Bucla `for` e mai complexă, dar totodată e cea mai folosită buclă.

Arată cam așa:

```js
for (inițializator; condiție; pas) {
  // ... corpul buclei ...
}
```

Hai să înțelegem ce înseamnă toate aceste părți printr-un exemplu. Bucla de mai jos rulează `alert(i)` pentru `i` de la `0` până la (dar nu inclusiv) `3`:

```js run
for (let i = 0; i < 3; i++) { // afișează 0, apoi 1, apoi 2
  alert(i);
}
```

Hai să analizăm fiecare parte a condiției buclei `for`:

| parte          |               |                                                                                         |
| -------------- | ------------- | --------------------------------------------------------------------------------------- |
| inițializator | `let i = 0` | Se execută o dată la începutul buclei.                                               |
| condiția      | `i < 3`     | Se verifică înainte de fiecare iterație a buclei. Dacă e falsă, bucla se oprește. |
| corpul         | `alert(i)`  | Rulează iar și iar cât timp condiția e adevărată.                                 |
| pas            | `i++`       | Rulează după corpul buclei la fiecare iterație.                                      |

În general, algoritmul buclei funcționează cam așa:

```
Rulează inițializatorul
→ (dacă condiția e adevărată → rulează corpul buclei și rulează pasul)
→ (dacă condiția e adevărată → rulează corpul buclei și rulează pasul)
→ (dacă condiția e adevărată → rulează corpul buclei și rulează pasul)
→ ...
```

Adică, inițializatorul se execută o dată, iar apoi este iterat: după fiecare test al `condiție`, `corpul` și `pas` sunt rulate.

Dacă ești nou pe subiectul bucle, te-ar putea ajuta să te întorci la exemplul de mai sus și să reproduci rularea lui pas cu pas pe o coală de hârtie.

Aici poți vedea mai exact ce se întâmplă în cazul nostru:

```js
// for (let i = 0; i < 3; i++) alert(i)

// rulează inițializatorul
let i = 0
// dacă condiția e adevărată → rulează corpul buclei și rulează pasul
if (i < 3) { alert(i); i++ }
// dacă condiția e adevărată → rulează corpul buclei și rulează pasul
if (i < 3) { alert(i); i++ }
// dacă condiția e adevărată → rulează corpul buclei și rulează pasul
if (i < 3) { alert(i); i++ }
// ...sfârșit, deoarece acum i == 3
```

````smart header="Declararea de variabile inline"
Aici, variabila "contor" `i` este declarată direct în buclă. Asta se numește o declarare de varibilă "inline". Astfel de variabile sunt vizibile numai în interiorul buclei.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // eroare, variabila nu există
```

În loc să declarăm o variabilă, putem folosi una existentă

```js run
let i = 0;

for (i = 0; i < 3; i++) { // folosim o variabilă existentă
  alert(i); // 0, 1, 2
}

alert(i); // 3, vizibilă, deoarece a fost declarată în afara buclei de această dată
```

````

### Omiterea unor părți

Orice parte a buclei `for` poate fi omisă.

De exemplu, putem omite `inițializator` dacă nu avem nevoie să facem nimic la începutul buclei.

Precum aici:

```js run
let i = 0; // deja îl avem pe i declarat și inițializat

for (; i < 3; i++) { // nu avem nevoie de "inițializator"
  alert( i ); // 0, 1, 2
}
```

Putem omite de asemenea și `pas`:

```js
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Asta face ca bucla să fie identică cu `while(i < 3)`.

Putem chiar să omitem totul, creeând o buclă infintă.

```js
for (;;) {
  // se repetă fără limită
}
```

Te rugăm să reții că cele două "punct și virgulă" `;` din bucla `for` trebuie să fie prezente. Altminteri, ar apărea un syntax error.

## Întreruperea buclei

În mod normal, o buclă se întrerupe atunci când condiția sa devine falsy.

Dar putem forța întreruperea în orice moment prin folosirea instrucțiunii `break`.

De exemplu, bucla de mai jos îi cere utilizatorului o serie de numere, "întrerupându-se" atunci când nici-un număr nu a fost furnizat:

```js run
let sum = 0;

while (true) {

  let value = +prompt("Introdu un număr", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sumă: ' + sum );
```

Instrucțiunea `break` e activată de linia `{*}` dacă utilizatorul nu introduce nimic sau dacă anulează introducerea. Bucla se întrerupe imediat și este rulată ultima linie de cod de după buclă.

Combinația "buclă infinită + `break` în funcție de necesități" e excelentă în situații când condiția unei bucle nu trebuie verificată de la început sau la final, ci în mijlocul sau chiar în mai multe locuri din corpul buclei.

## Continuă cu următoarea iterație [#continue]

Instrucțiunea `continue` e o "versiune mai blândă" a lui `break`. Nu oprește toată bucla. În schimb, oprește iterația  actuală și forțează bucla să înceapă una nouă (dacă condiția permite aceasta).

O putem folosi dacă am terminat cu iterația curentă și vrem să trecem la următoarea.

Bucla de mai jos folosește `continue` ca să afișeze numai valorile impare:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // dacă e adevărat, treci peste restul corpului buclei
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, apoi 3, 5, 7, 9
}
```

Pentru valorile pare ale lui `i`, instrucțiunea `continue` oprește executarea corpului și rulează următoarea iterație a lui `for` (cu următorul număr). Astfel funcția `alert` e apelată numai pentru valorile impare.

````smart header="Instrucțiunea `continue` ajută la diminuarea nesting-ului"
O buclă care afișează valorile impare ar putea arăta așa:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Dintr-un punct de vedere tehnic, aceasta este identică cu exemplul de mai sus. Desigur, putem și să încadrăm codul de mai sus într-un `if` block în loc să folosim `continue`.

````

````warn header="Fără `break/continue` în dreapta a '?'"
Vă rugăm să rețineți că construcțiile de sintaxă care nu sunt expresii nu pot fi folosite cu operatorul ternar `?`. În particular, instrucțiuni precum `break/continue` nu sunt permise acolo.

De exemplu, dat fiind acest cod:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...rescriindu-l cu un semn de întrebare:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue nu e permis aici
```

...nu mai funcționează: apare un syntax error.

Acesta e un alt motiv de a nu folosi operatorul `?` în favoarea lui `if`.
````

## Denumiri pentru break/continue

Uneori avem nevoie să întrerupem mai multe bucle odată.

De exemplu, în codul de mai jos iterăm pentru `i` și `j`, afișând coordonatele `(i, j)` de la `(0, 0)` la `(2, 2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valoare la coordonatele (${i},${j})`, '');

    // ce-ar fi dacă am vrea să întrerupem buclele și să sărim direct la Gata (dedesubt)
  }
}

alert('Gata!');
```

Avem nevoie de o cale de a opri procesul dacă utilizatorul anulează introducerea de text.

Banalul `break` pus după `input` ar întrerupe doar bucla din interior. Asta nu e suficient - etichetelor, veniți și salvați-ne!

O *etichetă* este un indentificator urmat de două puncte înainte de o buclă:

```js
labelName: for (...) {
  ...
}
```

Expresia `break <labelName>` din bucla de mai jos întrerupe bucla etichetată:

```js run no beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valoare la coordonatele (${i},${j})`, '');

    // dacă e un string gol sau e anulat, atunci întrerupe
    if (!input) *!*break outer*/!*; // (*)

    // fă ceva cu valorea...
  }
}
alert('Gata!');
```

În codul de mai sus, `break outer` caută eticheta cu numele `outer` și întreupe acea buclă.

Deci execuția codului sare de la `(*)` la `alert('Gata!')`.

De asemenea, putem să mutăm eticheta pe o linie separată:

```js no-beautify
exterior:
for (let i = 0; i < 3; i++) { ... }
```

Și instrucțiunea `continue` poate să fie folosită cu o etichetă. În acest caz, execuția codului sare la următoarea iterație a buclei etichetate.

````warn header="Etichetele nu ne permit să \"sărim\" oriune"
Etichetele nu ne permit să sărim la locuri din cod alese arbitrar.

De exemplu, e imposibil să facem asta:
```js
break etichetă; // sare la eticheta de dedesubt (nu funcționează)

etichetă: for (...)
```

Instrucțiunea `break` trebuie să fie în interiorul unui code block. Practic, orice code block ar funcționa, de exemplu:
```js
etichetă: {
  // ...
  break label; // funcționează
  // ...
}
```

...Cu toatea acestea, în 99.9% din cazuri `break` este folosit în interiorul buclelor, precum am văzut în exemplele de mai sus.

`Continue` poate fi folosit numai în interiorul unei bucle.
````

## Rezumat

Am vorbit despre 3 tipuri de bucle:

- `while` -- Condiția este verificată înainte de fiecare iterație.
- `do..while` -- Condiția este verificată după fiecare iterație.
- `for (;;)` -- Condiția este verificată înainte de fiecare iterație, avem și alte setări disponibile.

Pentru a face o buclă "infinită", de obicei este folosită secvența `while(true)`. O astfel de buclă, la fel ca oricare alta, poate fi oprită cu instrucțiunea `break`.

Dacă nu vrem să facem nimic în iterația curentă și am vrea să trecem la următoarea, putem folosi instrucțiunea `continue`.

`break/continue` admit etichete înainte de buclă. O etichetă este singurul mod pentru `break/continue` să întrerupă o buclă imbricată și să treacă la una exterioară.
