# Data și ora

Să cunoaștem un nou obiect încorporat: [Date](mdn:js/Date). Acesta stochează data, ora și oferă metode de administrare a datei/orei.

De exemplu, îl putem utiliza pentru a stoca timpul de creare/modificare, pentru a măsura timpul, sau pur și simplu pentru a imprima data curentă.

## Creare

Pentru a crea un nou obiect `Date` apelați `new Date()` cu unul dintre următoarele argumente:

`new Date()`
: Fără argumente -- creează un obiect `Date` pentru data și ora curentă:

    ```js run
    let now = new Date();
    alert( now ); // afișează data/ora curentă
    ```

`new Date(milisecunde)`
: Creează un obiect `Date` cu timpul egal cu numărul de milisecunde (1/1000 dintr-o secundă) care au trecut de la 1 ianuarie 1970 UTC+0.

    ```js run
    // 0 înseamnă 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // acum adaugă 24 de ore, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Un număr întreg care reprezintă numărul de milisecunde care au trecut de la începutul anului 1970 se numește *timestamp*.

    Este o reprezentare numerică ușoară a unei date. Putem oricând să creăm o dată dintr-un timestamp folosind `new Date(timestamp)` și să convertim obiectul `Date` existent într-un timestamp folosind metoda `date.getTime()` (a se vedea mai jos).

    Datele anterioare 01.01.1970 au timestamp-uri negative, e.g.:
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(șir de date)`
: Dacă există un singur argument, și acesta este un șir de caractere, atunci acesta este parsat automat. Algoritmul este același pe care îl folosește `Date.parse`, îl vom acoperi mai târziu.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Ora nu este setată, așa că se presupune că este miezul nopții GMT și
    // este ajustată în funcție de fusul orar în care este rulat codul
    // Astfel rezultatul ar putea fi
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // sau
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(an, lună, date, ore, minute, secunde, ms)`
: Creează data cu componentele date în fusul orar local. Doar primele două argumente sunt obligatorii.

    - Anul `year` trebuie să aibă 4 cifre. Pentru compatibilitate, sunt acceptate și 2 cifre, care sunt considerate `19xx`, e.g.`98` este același lucru cu `1998` aici, dar este întotdeauna puternic încurajată folosirea a 4 cifre.
    - Numărătoarea "lunilor" începe cu `0` (Ian), până la `11` (Dec).
    - Parametrul `date` este de fapt ziua lunii, dacă nu există atunci se presupune `1`.
    - Dacă `ore/minute/secunde/ms` este absent, se presupune că sunt egale cu `0`.

    De exemplu:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // la fel, orele etc sunt 0 în mod implicit
    ```

    Precizia maximă este 1 ms (1/1000 sec):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Accesarea componentelor de date

Există metode pentru a accesa anul, luna și așa mai departe din obiectul `Date`:

[getFullYear()](mdn:js/Date/getFullYear)
: Obține anul (4 cifre)

[getMonth()](mdn:js/Date/getMonth)
: Obține luna, **de la 0 la 11**.

[getDate()](mdn:js/Date/getDate)
: Obține ziua lunii, de la 1 la 31, numele metodei pare puțin ciudat.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Obține componentele de timp corespunzătoare.

```warn header="Nu `getYear()`, ci `getFullYear()`"
Multe motoare JavaScript implementează o metodă non-standard `getYear()`. Această metodă este depreciată. Ea returnează uneori anul din 2 cifre. Vă rugăm să nu o folosiți niciodată. Există `getFullYear()` pentru an.
```

Adițional, putem obține o zi a săptămânii:

[getDay()](mdn:js/Date/getDay)
: Obține ziua săptămânii, de la `0` (Duminică) la `6` (Sâmbătă). Prima zi este întotdeauna Duminică, în unele țări nu este așa, dar nu poate fi schimbată.

**Toate metodele de mai sus returnează componentele în raport cu fusul orar local.**

Există de asemenea omologii lor UTC, care returnează ziua, luna, anul și așa mai departe pentru fusul orar UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Doar introduceți `"UTC"` imediat după `"get"`.

Dacă fusul orar local este decalat față de UTC, atunci codul de mai jos afișează ore diferite:

```js run
// data curentă
let date = new Date();

// ora în fusul vostru orar
alert( date.getHours() );

// ora în fusul orar UTC+0 (ora Londrei fără ora de vară)
alert( date.getUTCHours() );
```

În afară de metodele date, există două metode speciale care nu au o variantă UTC:

[getTime()](mdn:js/Date/getTime)
: Returnează timestamp-ul pentru dată -- un număr de milisecunde trecute de la 1 Ianuarie 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Returnează diferența dintre UTC și fusul orar local, în minute:

    ```js run
    // dacă vă aflați în fusul orar UTC-1, produce 60
    // dacă vă aflați în fusul orar UTC+3, produce -180
    alert( new Date().getTimezoneOffset() );

    ```

## Stabilirea componentelor datei

Următoarele metode permit stabilirea componentelor de dată/ora:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (setează întreaga dată cu milisecunde începând cu 01.01.1970 UTC)

Fiecare dintre ele cu excepția `setTime()` au o variantă UTC, de exemplu: `setUTCHours()`.

După cum putem vedea, unele metode pot seta mai multe componente deodată, de exemplu `setHours`. Componentele care nu sunt menționate nu sunt modificate.

De exemplu:

```js run
let today = new Date();

today.setHours(0);
alert(today); // tot astăzi, dar ora este schimbată la 0

today.setHours(0, 0, 0, 0);
alert(today); // tot astăzi, la ora 00:00:00 fix.
```

## Autocorecție

*Autocorecția* este o caracteristică foarte utilă a obiectelor `Date`. Putem seta valori în afara intervalelor, iar aceasta se va auto-ajusta.

De exemplu:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...este 1 Feb 2013!
```

Componentele de date în afara intervalului sunt distribuite automat.

Să spunem că trebuie să mărim data "28 Feb 2016" cu 2 zile. Aceasta poate fi "2 Mar" sau "1 Mar" în cazul unui an bisect. Nu trebuie să ne gândim la asta. Doar adăugăm 2 zile. Obiectul `Date` se va ocupa de restul:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Acea caracteristică este adesea utilizată pentru a obține data după o perioadă de timp dată. De exemplu, să obținem data pentru "70 de secunde de acum încolo":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // afișează data corectă
```

De asemenea putem seta valori zero sau chiar negative. De exemplu:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // setează ziua 1 a lunii
alert( date );

date.setDate(0); // ziua minimă este 1, deci se presupune ultima zi a lunii precedente
alert( date ); // 31 Dec 2015
```

## Date to number, date diff

Atunci când un obiect `Date` este convertit în număr, acesta devine timestamp-ul la fel ca `date.getTime()`:

```js run
let date = new Date();
alert(+date); // numărul de milisecunde, la fel ca date.getTime()
```

Efect secundar important: datele se pot scădea, rezultatul fiind diferența lor în ms.

Acesta poate fi folosit pentru măsurători de timp:

```js run
let start = new Date(); // începe măsurarea timpului

// face treaba
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // încheie măsurarea timpului

alert( `Bucla a durat ${end - start} ms` );
```

## Date.now()

Dacă dorim doar să măsurăm timpul, nu avem nevoie de obiectul `Date`.

Există o metodă specială `Date.now()` care returnează timestamp-ul curent.

Aceasta este semantic echivalentă cu `new Date().getTime()`, dar nu creează un obiect `Date` intermediar. Astfel este mai rapidă și nu pune presiune pe garbage collection.

Este folosit în mare parte pentru conveniență sau când performanța contează, cum ar fi în jocuri în JavaScript sau alte aplicații specializate.

Așa că este probabil mai bine așa:

```js run
*!*
let start = Date.now(); // milisecundele se numără de la 1 Ian 1970
*/!*

// face treaba
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // gata
*/!*

alert( `Bucla a durat ${end - start} ms` ); // scade numere, nu date
```

## Benchmarking

Dacă dorim un benchmark fiabil al unei funcții care consumă mult CPU, trebuie să fim atenți.

De exemplu, să măsurăm două funcții care calculează diferența dintre două date: care dintre ele este mai rapidă?

Astfel de măsurători de performanță sunt adesea numite "benchmarks".

```js
// avem date1 și date2, care funcție returnează mai repede diferența lor în ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// sau
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Acestea două fac exact același lucru, dar una dintre ele folosește `date.getTime()` explicit pentru a obține data în ms, iar cealaltă se bazează pe o transformare dată-la-număr. Rezultatul lor este întotdeauna același.

Așadar, care dintre ele este mai rapidă?

Prima idee ar putea fi să le rulăm de multe ori la rând și să măsurăm diferența de timp. Pentru cazul nostru, funcțiile sunt foarte simple, așa că trebuie să o facem de cel puțin 100000 de ori.

Să măsurăm:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Utilizând `getTime()` este mult mai rapid! Asta pentru că nu există conversie de tip, este mult mai ușor de optimizat pentru motoare.

Bine, avem ceva. Dar acesta nu este un benchmark bun încă.

Imaginați-vă că în momentul rulării `bench(diffSubtract)` CPU-ul făcea ceva în paralel, și acesta consuma resurse. Iar până în momentul în care se execută `bench(diffGetTime)` acea sarcină s-a terminat.

Un scenariu destul de real pentru un multiproces modern de OS.

Ca urmare, primul benchmark va avea mai puține resurse CPU decât al doilea. Acest lucru poate duce la rezultate greșite.

**Pentru un benchmarking mai fiabil, întregul pachet de benchmarks ar trebui rulat de mai multe ori.**

De exemplu, cam așa:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// execută bench(diffSubtract) și bench(diffGetTime) fiecare de 10 ori alternativ
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Timp total pentru diffSubtract: ' + time1 );
alert( 'Timp total pentru diffGetTime: ' + time2 );
```

Motoarele JavaScript moderne încep să aplice optimizări avansate doar pentru "codul fierbinte" care se execută de mai multe ori (nu este nevoie să optimizeze lucruri executate rar). Așadar, în exemplul de mai sus, primele execuții nu sunt bine optimizate. Am vrea să adăugăm o execuție de încălzire:

```js
// adăugată pentru "încălzire" înainte de bucla principală
bench(diffSubtract);
bench(diffGetTime);

// acum benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Aveți grijă când faceți microbenchmarking"
Motoarele JavaScript moderne efectuează multe optimizări. Acestea ar putea ajusta rezultatele "testelor artificiale" în comparație cu "utilizarea normală", în special atunci când efectuăm benchmark-uri pentru ceva foarte mic, cum ar fi modul în care funcționează un operator sau o funcție încorporată. Deci dacă vreți să înțelegeți în mod serios performanța, atunci vă rugăm să studiați modul în care funcționează motorul JavaScript. Și atunci probabil că nu veți avea nevoie deloc de microbenchmarks.

Marele pachet de articole despre V8 poate fi găsit la <https://mrale.ph>.
```

## Date.parse dintr-un șir

Metoda [Date.parse(str)](mdn:js/Date/parse) poate citi o dată dintr-un șir.

Formatul șirului trebuie să fie: `YYYY-MM-DDTHH:mm:ss.sssZ`, unde:

- `YYYY-MM-DD` -- este data: an-lună-zi.
- Caracterul `"T"` este utilizat ca delimitator.
- `HH:mm:ss.sss` -- este timpul: ore, minute, secunde și milisecunde.
- Partea opțională `'Z'` denotă fusul orar în formatul `+-hh:mm`. O singură literă `Z` ar însemna UTC+0.

Sunt posibile și variante mai scurte, precum `YYYY-MM-DD` sau `YYYY-MM` sau chiar `YYYY`.

Apelul la `Date.parse(str)` parsează șirul în formatul dat și returnează timestamp-ul (numărul de milisecunde de la 1 ianuarie 1970 UTC+0). Dacă formatul nu este valid, se returnează `NaN`.

De exemplu:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417 (timestamp)
```

Putem crea instantaneu un obiect `new Date` din timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);
```

## Sumar

- Data și ora în JavaScript sunt reprezentate cu obiectul [Date](mdn:js/Date). Nu putem crea "doar data" sau "doar ora": Obiectele `Date` le conțin întotdeauna pe amândouă.
- Lunile sunt numărate de la zero (da, Ianuarie este o lună zero).
- Zilele săptămânii în `getDay()` sunt de asemenea numărate de la zero (asta-i Duminică).
- `Date` se autocorectează atunci când sunt setate componente în afara intervalului. Bună pentru adăugarea/subtragerea zilelor/lunilor/orelor.
- Datele pot fi sustrase, dând diferența lor în milisecunde. Asta pentru că un `Date` devine timestamp-ul atunci când este convertit într-un număr.
- Folosiți `Date.now()` pentru a obține rapid timestamp-ul curent.

Rețineți că spre deosebire de multe alte sisteme, timestamp-urile din JavaScript sunt în milisecunde, nu în secunde.

Uneori avem nevoie de măsurători de timp mai precise. JavaScript în sine nu are o modalitate de a măsura timpul în microsecunde (1 milionime dintr-o secundă), dar majoritatea mediilor o oferă. De exemplu, browserul are [performance.now()](mdn:api/Performance/now) care oferă numărul de milisecunde de la începutul încărcării paginii cu precizie de microsecunde (3 cifre după punct):

```js run
alert(`Încărcarea a început cu ${performance.now()}ms în urmă`);
// Ceva precum: "Încărcarea a început acum 34731.26000000001ms"
// .26 reprezintă microsecunde (260 microsecunde)
// mai mult de 3 cifre după virgulă sunt erori de precizie, doar primele 3 sunt corecte
```

Node.js are modulul `microtime` și alte modalități. Tehnic, aproape orice dispozitiv și mediu permite obținerea unei precizii mai mare, doar că nu este în `Date`.
