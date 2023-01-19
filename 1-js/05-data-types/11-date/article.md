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

If we want a reliable benchmark of CPU-hungry function, we should be careful.

For instance, let's measure two functions that calculate the difference between two dates: which one is faster?

Such performance measurements are often called "benchmarks".

```js
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

These two do exactly the same thing, but one of them uses an explicit `date.getTime()` to get the date in ms, and the other one relies on a date-to-number transform. Their result is always the same.

So, which one is faster?

The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.

Let's measure:

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

Wow! Using `getTime()` is so much faster! That's because there's no type conversion, it is much easier for engines to optimize.

Okay, we have something. But that's not a good benchmark yet.

Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` that work has finished.

A pretty real scenario for a modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. That may lead to wrong results.

**For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

For example, like this:

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
// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Modern JavaScript engines start applying advanced optimizations only to "hot code" that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to add a heat-up run:

```js
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Be careful doing microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.

The great pack of articles about V8 can be found at <https://mrale.ph>.
```

## Date.parse from a string

The method [Date.parse(str)](mdn:js/Date/parse) can read a date from a string.

The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

- `YYYY-MM-DD` -- is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` -- is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` would mean UTC+0.

Shorter variants are also possible, like `YYYY-MM-DD` or `YYYY-MM` or even `YYYY`.

The call to `Date.parse(str)` parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns `NaN`.

For instance:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

We can instantly create a `new Date` object from the timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);
```

## Summary

- Date and time in JavaScript are represented with the [Date](mdn:js/Date) object. We can't create "only date" or "only time": `Date` objects always carry both.
- Months are counted from zero (yes, January is a zero month).
- Days of week in `getDay()` are also counted from zero (that's Sunday).
- `Date` auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
- Dates can be subtracted, giving their difference in milliseconds. That's because a `Date` becomes the timestamp when converted to a number.
- Use `Date.now()` to get the current timestamp fast.

Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](mdn:api/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct
```

Node.js has `microtime` module and other ways. Technically, almost any device and environment allows to get more precision, it's just not in `Date`.
