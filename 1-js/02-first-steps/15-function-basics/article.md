# Funcții

Destul de des avem nevoie să realizăm o acțiune similară în multe locuri ale script-ului.

De exemplu, avem nevoie să arătăm un mesaj frumos când un vizitator se conectează, se deconectează și poate în altă parte.

Funcțiile sunt principalele "blocuri de construcție" ale programului. Ele permit apelarea codului de mai multe ori fără repetare.

Am văzut deja exemple de funcții încorporate, precum `alert(message)`, `prompt(message, default)` și `confirm(question)`. Dar putem crea și funcții proprii de asemenea.

## Funcție Declarată

Pentru a crea o funcție putem folosi o *funcție declarată*.

Arata cam așa:

```js
function showMessage() {
  alert( 'Bună ziua tuturor!' );
}
```

Cuvântul cheie `function` este primul, apoi urmează *numele funcției*, apoi o listă de *parametrii* între paranteze (separate prin virgulă, gol în exemplul de mai sus, vom vedea exemple mai târziu) și în final codul funcției, numit de asemenea "corpul funcției", între acolade.

```js
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

Noua noastră funcție poate fi apelată după numele ei: `showMessage()`.

De exemplu:

```js run
function showMessage() {
  alert( 'Bună ziua tuturor!' );
}

*!*
showMessage();
showMessage();
*/!*
```

Apelul `showMessage()` execută codul funcției. Aici vom vedea mesajul de două ori.

Acest exemplu demonstrează în mod clar unul dintre scopurile principale ale funcțiilor: să evite duplicarea codului.

Dacă trebuie vreodată să schimbăm mesajul sau modul în care este afișat, este suficient să modifici codul într-un singur loc: funcția care îl emite.

## Variabile locale

O variabilă declarată în interiorul unei funcții este vizibilă numai în interiorul acelei funcții.

De exemplu:

```js run
function showMessage() {
*!*
  let message = "Bună, sunt JavaScript!"; // variabilă locală
*/!*

  alert( message );
}

showMessage(); // Bună, sunt JavaScript!

alert( message ); // <-- Eroare! Variabila este locală funcției
```

## Variabile exterioare

O funcție poate accesa și o variabilă exterioară, de exemplu:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Bună, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Bună, John
```

Funcția are acces complet la variabila exterioară. Il poate modifica si ea.

De exemplu:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) a schimbat variabila exterioară

  let message = 'Bună, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* înainte de apelul funcției

showMessage();

alert( userName ); // *!*Bob*/!*, valoarea a fost modificată de funcție
```

Variabila exterioară este utilizată numai dacă nu există una locală.

Dacă o variabilă cu același nume este declarată în interiorul funcției atunci aceasta o *pune în umbră* pe cea exterioară. De exemplu, în codul de mai jos funcția folosește `userName`-ul local. Cel exterior este ignorat:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declară o variabilă locală
*/!*

  let message = 'Bună, ' + userName; // *!*Bob*/!*
  alert(message);
}

// funcția va crea și va folosi propriul userName
showMessage();

alert( userName ); // *!*John*/!*, neschimbat, funcția nu a accesat variabila exterioară
```

```smart header="Variabile globale"
Variabile declarate în afara oricărei funcții, precum acel `userName` exterior în codul de mai sus, se numesc *globale*.

Variabilele globale sunt vizibile din orice funcție (dacă nu sunt umbrite de cele locale).

Este o bună practică pentru a minimiza utilizarea variabilelor globale. Codul modern are puține globale sau deloc. Majoritatea variabilelor aparțin funcțiilor lor. Totuși, pot fi utile pentru a stoca date la nivel de proiect.
```

## Parametrii

Putem transmite date arbitrare funcțiilor folosind parametri.

În exemplul de mai jos, funcția are doi parametri: `from` și `text`.

```js run
function showMessage(*!*from, text*/!*) { // parametrii: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Bună!');*/!* // Ann: Bună! (*)
*!*showMessage('Ann', "Ce faci?");*/!* // Ann: Ce faci? (**)
```

Când funcția este apelată în liniile `(*)` și `(**)`, valorile date sunt copiate în variabile locale `from` și `text`. Atunci funcția le folosește.

Iată încă un exemplu: avem o variabilă `from` și este transmis funcției. Vă rugăm să rețineți: functia schimbă `from`, dar schimbarea nu se vede afară, deoarece o funcție primește întotdeauna o copie a valorii:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // face ca "from" să pară mai frumos
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Bună"); // *Ann*: Bună

// valoarea lui "from" este aceeași, funcția a modificat o copie locală
alert( from ); // Ann
```

Când o valoare este transmisă ca parametru de funcție, se mai numește *argument*.

Cu alte cuvinte, pentru a clarifica acești termeni:

- Un parametru este variabila listată între paranteze în funcția declarată (este un termen din timpul declarației)
- Un argument este valoarea care este transmisă funcției atunci când este apelată (este un termen din timpul apelării).

Declarăm funcții care listează parametrii lor, apoi le numim argumente de trecere.

În exemplul de mai sus, s-ar putea spune : "funcția `showMessage` este declarată cu doi parametri, apoi apelată cu două argumente: `from` și `"Bună"`".


## Valori implicite

Dacă o funcție este apelată, dar nu este oferit un argument, atunci valoarea corespunzătoare devine `undefined`.

De exemplu, funcția menționată mai sus `showMessage(from, text)` poate fi apelată cu un singur argument:

```js
showMessage("Ann");
```

Asta nu este o eroare. Un astfel de apel ar ieși `"*Ann*: nedefinită"`. Ca valoare pentru `text` nu este trecută, ea devine `nedefinită`.

Putem preciza așa-numitul "implicit" (de utilizat dacă este omisă) valoare pentru un parametru din declarația funcției, folosind `=`:

```js run
function showMessage(from, *!*text = "nu este dat niciun text"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: nu este dat niciun text
```

Acum dacă parametrul `text` nu este trecut, va primi valoarea `"nu este dat niciun text"

Valoarea implicită apare și în cazul în care parametrul există, dar este strict egal cu `undefined`, astfel:

```js
showMessage("Ann", undefined); // Ann: nu a fost dat niciun text
```

Aici `"nu este dat niciun text"` este un șir, dar poate fi o expresie mai complexă, care este evaluată și atribuită doar dacă parametrul lipsește. Deci, acest lucru este posibil:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() executat numai dacă nu este dat text
  // rezultatul său devine valoarea textului
}
```

```smart header="Evaluarea parametrilor impliciți"
În JavaScript, un parametru implicit este evaluat de fiecare dată când funcția este apelată fără parametrul respectiv.

În exemplul de mai sus, `anotherFunction()` nu este apelat deloc, dacă este furnizat parametrul `text`.

Pe de altă parte, este apelat independent de fiecare dată când lipsește `text`.
```

````smart header="Parametrii impliciți în vechiul cod JavaScript"
Cu câțiva ani în urmă, JavaScript nu a acceptat sintaxa pentru parametrii impliciți. Deci oamenii au folosit alte moduri de a le specifica.

În zilele noastre, le putem întâlni în scripturi vechi.

De exemplu, o verificare explicită pentru `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'nu a fost dat niciun text';
  }
*/!*

  alert( from + ": " + text );
}
```

...Sau folosind operatorul `||`:

```js
function showMessage(from, text) {
  // Dacă valoarea textului este falsă, atribuiți valoarea implicită
  // aceasta presupune că text == "" este la fel ca nici un text
  text = text || 'nu a fost dat niciun text';
  ...
}
```
````


### Parametri impliciți alternativi

Uneori este logic să atribuiți valori implicite pentru parametrii într-o etapă ulterioară după declararea funcției.

Putem verifica dacă parametrul este transmis în timpul execuției funcției, comparându-l cu `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // dacă parametrul lipsește
    text = 'mesaj gol';
  }
*/!*

  alert(text);
}

showMessage(); // mesaj gol
```

...Sau am putea folosi operatorul `||`:

```js
function showMessage(text) {
  // dacă textul este nedefinit sau fals, setați-l ca 'empty'

  text = text || 'empty';
  ...
}
```

Motoarele JavaScript moderne susțin [nullish coalescing operator](info:nullish-coalescing-operator) `??`, este mai bine atunci când majoritatea valorilor false, cum ar fi `0`, ar trebui considerate "normale":

```js run
function showCount(count) {
  // dacă numărul este nedefinit sau nul, afișază "necunoscut"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // necunoscut
showCount(); // necunoscut
```

## Returnarea unei valori

O funcție poate returna înapoi o valoare în codul de apelare ca rezultat.

Cel mai simplu exemplu ar fi o funcție care însumează două valori:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

Directiva `return` poate fi în orice loc al funcției. Când execuția ajunge la el, funcția se oprește, iar valoarea este returnată codului de apelare (atribuit lui `result` de mai sus).

Pot exista multe apariții ale lui `return` întro singura funcție. De exemplu:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Ai permisiunea părinților tăi?');
*/!*
  }
}

let age = prompt('Câți ani ai?', 18);

if ( checkAge(age) ) {
  alert( 'Acces permis' );
} else {
  alert( 'Acces interzis' );
}
```

Este posibil să utilizați `return` făra o valoare. Acesta face ca funcția să se încheie imediat.

De exemplu:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Vă arăt filmul" ); // (*)
  // ...
}
```

În codul de mai sus, dacă `checkAge(age)` returnează `false`, atunci `showMovie` nu va trece la `alert`.

````smart header=" O funcție cu un 'return' gol sau fara o returnare este `undefined`"
Dacă o funcție nu returnează o valoare, este la fel ca și când returnează `undefined`:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // adevărat
```

Un `return` gol este același cu `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // adevărat
```
````

````warn header="Nu adăugați niciodată o linie nouă între `return` și valoare"
Pentru o expresie lungă în `return`, ai putea fi tentant să-l pui pe o linie separată, așa:

```js
return
 (unele + lung + expresie + sau + orice * f(a) + f(b))
```
Asta nu funcționează, deoarece JavaScript presupune un punct și virgulă după `return`. Asta va funcționa la fel ca:

```js
return*!*;*/!*
 (unele + lung + expresie + sau + orice * f(a) + f(b))
```

Deci, devine efectiv un return gol.

Dacă dorim ca expresia returnată să se înfășoare pe mai multe linii, ar trebui să o începem pe aceeași linie cu`return`. Sau cel puțin puneți parantezele de deschidere acolo, după cum urmează:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
Și va funcționa așa cum ne așteptăm.
````

## Denumind o funcție [#function-naming]

Funcțiile sunt acțiuni. Deci numele lor este de obicei un verb. Ar trebui să fie scurt, cât mai precis posibil și să descrie ceea ce face funcția, astfel încât cineva care citește codul să obțină o indicație despre ceea ce face funcția.

Este o practică larg răspândită de a începe o funcție cu un prefix verbal care descrie vag acțiunea. Trebuie să existe un acord în cadrul echipei cu privire la semnificația prefixelor.

De exemplu, funcțiile care încep cu `"show"` de obicei afișază ceva.

Funcția care începe cu...

- `"get…"` -- returnează o valoare,
- `"calc…"` -- calculează ceva,
- `"create…"` -- crează ceva,
- `"check…"` -- verifică ceva și returnează un boolean, etc.

Exemple de astfel de nume:

```js no-beautify
showMessage(..)     // arată un mesaj
getAge(..)          // returnează vârsta (o primește cumva)
calcSum(..)         // calculează o sumă și returnează rezultatul
createForm(..)      // creează un Form (și de obicei îl returnează)
checkPermission(..) // verifică o permisiune, returnează true/false
```

Cu prefixele la loc, o privire asupra numelui unei funcții oferă o înțelegere a ce fel de activitate face și ce fel de valoare returnează.

```smart header="O funcție -- o acțiune"
O funcție ar trebui să facă exact ceea ce este sugerat de numele ei, nu mai mult.

Două acțiuni independente deservesc de obicei două funcții, chiar dacă de obicei sunt apelate împreună (în acest caz, putem face o a treia funcție care le apelează pe cele două).

Câteva exemple de încălcare a acestei reguli:

- `getAge` -- ar fi rău dacă arată o `alert` cu vârsta (ar trebui doar să obțină).
- `createForm` -- ar fi rău dacă ar modifica documentul, adăugându-i o formă (ar trebui doar să-l creeze și să-l returneze).
- `checkPermission` -- ar fi rău dacă afișează mesajul „acces acordat/refuzat”. (ar trebui să efectueze doar verificarea și să returneze rezultatul).

Aceste exemple presupun semnificații comune ale prefixelor. Tu și echipa ta sunteți liberi să vă puneți de acord asupra altor semnificații, dar de obicei nu sunt foarte diferite. În orice caz, ar trebui să înțelegeți ferm ce înseamnă un prefix, ce poate și ce nu poate face o funcție prefixată. Toate funcțiile cu același prefix ar trebui să respecte regulile. Și echipa ar trebui să împărtășească cunoștințele.
```

```smart header="Nume de funcții ultrascurte"
Funcțiile care sunt folosite *foarte des* au uneori nume ultrascurte.

Ca de exemplu, framework-ul [jQuery](http://jquery.com) definește o funcție cu `$`. Librăria [Lodash](http://lodash.com/) are funcția sa de bază numită `_`.

Acestea sunt excepții. În general, numele funcțiilor ar trebui să fie concise și descriptive.
```

## Funcții == Comentarii

Funcțiile ar trebui să fie scurte și să facă un lucru exact. Dacă acel lucru este mare, poate că merită să împărțiți funcția în câteva funcții mai mici. Uneori, respectarea acestei reguli poate să nu fie atât de ușoară, dar cu siguranță este un lucru bun.

O funcție separată este mai ușor de testat și de depanat -- însăși existența sa este un comentariu grozav!

De exemplu, compară cele două funcții `showPrimes(n)` de mai jos. Fiecare emite [numere prime](https://ro.wikipedia.org/wiki/Num%C4%83r_prim) pâna la`n`.

Prima variantă folosește o etichetă:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

A doua variantă folosește o funcție adițională `isPrime(n)` pentru a testa primalitatea:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

A doua variantă este mai ușor de înțeles, nu-i aşa? În loc de piesa de cod, vedem un nume al acțiunii (`isPrime`). Uneori, oamenii se referă la un astfel de cod ca *auto-descriptiv*.

Deci, funcțiile pot fi create chiar dacă nu intenționăm să le reutilizam. Ele structurează codul și îl fac lizibil.

## Rezumat

O declarație de funcție arată astfel:

```js
function name(parametri, delimitați, de, virgulă) {
  /* cod */
}
```

- Valorile transmise unei funcții ca parametri sunt copiate în variabilele locale.
- Funcția poate accesa variabile exterioare. Dar funcționează numai din interior spre exterior. Codul din afara funcției nu vede variabilele locale.
- O funcție poate returna o valoare. Dacă nu, atunci rezultatul ei este `undefined`.

Pentru a face codul curat și ușor de înțeles, este recomandat să folosiți în principal variabile și parametri locali în funcție, nu variabile exterioare.

Este întotdeauna mai ușor de înțeles o funcție care primește parametri, lucrează cu ei și returnează un rezultat, decât o funcție care nu primește niciun parametru, dar modifică variabilele exterioare ca efect secundar.

Denumirea funcției:

- Un nume ar trebui să descrie clar ceea ce face funcția. Când vedem un apel de funcție în cod, un nume bun ne oferă instantaneu o înțelegere a ceea ce face și returnează.
- O funcție este o acțiune, deci numele funcțiilor sunt de obicei verbale.
- Există multe prefixe de funcții binecunoscute, cum ar fi `create…`, `show…`, `get…`, `check…` și așa mai departe. Folosiți-le pentru a indica ce face o funcție.

Funcțiile sunt principalele blocuri de construcție ale scripturilor. Acum am acoperit elementele de bază, astfel încât să putem începe să le creăm și să le folosim. Dar acesta este doar începutul drumului. Ne vom întoarce la ele de multe ori, mergând mai adânc în caracteristicile lor avansate.
