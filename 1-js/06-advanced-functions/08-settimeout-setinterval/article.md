# Planificare: setTimeout și setInterval

Am putea decide să executăm o funcție nu chiar acum, ci la un anumit moment mai târziu. Acest lucru se numește "planificarea unui apel".

Există două metode pentru aceasta:

- `setTimeout` ne permite să rulăm o funcție o dată după un interval de timp.
- `setInterval` ne permite să rulăm o funcție în mod repetat, începând după intervalul de timp, apoi repetându-se încontinuu la acel interval.

Aceste metode nu fac parte din specificația JavaScript. Dar majoritatea mediilor au planificator intern și oferă aceste metode. În particular, ele sunt acceptate în toate browserele și în Node.js.

## setTimeout

Sintaxa:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

Parametri:

`func|code`
: Funcție sau un șir de cod să fie executat.
De obicei, este o funcție. Din motive istorice, poate fi trecut un șir de cod, dar nu este recomandat.

`delay`
: Întârzierea înainte de rulare, în milisecunde (1000 ms = 1 secundă), implicit 0.

`arg1`, `arg2`...
: Argumente pentru funcție

De exemplu, acest cod apelează `sayHi()` după o secundă:

```js run
function sayHi() {
  alert('Bună ziua');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

Cu argumente:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Bună ziua", "John"); // Bună ziua, John
*/!*
```

Dacă primul argument este un șir de caractere, atunci JavaScript creează o funcție din acesta.

Așadar, și acest lucru va funcționa:

```js run no-beautify
setTimeout("alert('Bună ziua')", 1000);
```

Dar folosirea șirurilor de caractere nu este recomandată, folosiți funcții săgeată în locul lor, astfel:

```js run no-beautify
setTimeout(() => alert('Bună ziua'), 1000);
```

````smart header="Treceți o funcție, dar nu o rulați"
Dezvoltatorii începători fac uneori o greșeală adăugând paranteze `()` după funcție:

```js
// greșit!
setTimeout(sayHi(), 1000);
```
Asta nu va funcționa, deoarece `setTimeout` se așteaptă la o referință spre o funcție. Iar aici `sayHi()` rulează funcția, iar *rezultatul execuției sale* este trecut la `setTimeout`. În cazul nostru, rezultatul lui `sayHi()` este `undefined` (funcția nu returnează nimic), deci nu se planifică nimic.
````

### Anulare cu clearTimeout

Un apel la `setTimeout` returnează un "identificator de temporizator" `timerId` pe care îl putem folosi pentru a anula execuția.

Sintaxa de anulare:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

În codul de mai jos, planificăm funcția și apoi o anulăm (ne-am răzgândit). Ca urmare, nu se întâmplă nimic:

```js run no-beautify
let timerId = setTimeout(() => alert("nu se întâmplă niciodată"), 1000);
alert(timerId); // identificatorul temporizatorului

clearTimeout(timerId);
alert(timerId); // același identificator (nu devine nul după anulare)
```

După cum se poate observa din ieșirea `alert`, într-un browser identificatorul temporizatorului este un număr. În alte medii, acesta poate fi altceva. De exemplu, Node.js returnează un obiect timer cu metode suplimentare.

Din nou, nu există o specificație universală pentru aceste metode, așa că este în regulă.

Pentru browsere, temporizatoarele sunt descrise în [secțiunea timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) din HTML Living Standard.

## setInterval

Metoda `setInterval` are aceeași sintaxă ca și `setTimeout`:

```js
let timerId = setInterval(func|cod, [întârziere], [arg1], [arg2], ...)
```

Toate argumentele au aceeași semnificație. Dar spre deosebire de `setTimeout` acesta rulează funcția nu doar o singură dată, ci în mod regulat după intervalul de timp dat.

Pentru a opri apelurile ulterioare, ar trebui să apelăm `clearInterval(timerId)`.

Următorul exemplu va afișa mesajul la fiecare 2 secunde. După 5 secunde, ieșirea este oprită:

```js run
// se repetă cu intervalul de 2 secunde
let timerId = setInterval(() => alert('tic'), 2000);

// după 5 secunde se oprește
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="Timpul continuă cât este afișat `alert`"
În majoritatea browserelor, inclusiv Chrome și Firefox, cronometrul intern continuă să "ticăie" în timp ce se afișează `alert/confirm/prompt`.

Deci dacă executați codul de mai sus și nu închideți fereastra `alert` pentru o perioadă de timp, atunci următorul `alert` va fi afișat imediat ce o faceți. Intervalul real dintre alerte va fi mai scurt de 2 secunde.
```

## setTimeout inbricat

Există două modalități de a rula ceva în mod regulat.

Una dintre ele este `setInterval`. Cealaltă este un `setTimeout` imbricate, ca acesta:

```js
/** în loc de:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

`setTimeout` de mai sus planifică următorul apel chiar la sfârșitul celui curent `(*)`.

Metoda imbricată `setTimeout` este mai flexibilă decât `setInterval`. În acest fel următorul apel poate fi planificat diferit, în funcție de rezultatele apelului curent.

De exemplu, trebuie să scriem un serviciu care să trimită o solicitare către server la fiecare 5 secunde pentru a cere date, dar în cazul în care serverul este supraîncărcat, ar trebui să crească intervalul la 10, 20, 40 de secunde...

Iată pseudocodul:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...send request...

  if (request failed due to server overload) {
    // crește intervalul până la următoarea execuție
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


Iar dacă funcțiile pe care le planificăm sunt mari consumatoare de CPU, atunci putem măsura timpul de execuție și putem planifica următorul apel mai devreme sau mai târziu.

**`setTimeout`-ul imbricat permite stabilirea întârzierii dintre execuții mai precis decât `setInterval`.**

Să comparăm două fragmente de cod. Primul utilizează `setInterval`:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

Al doilea utilizează `setTimeout` imbricat:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

Pentru `setInterval` planificatorul intern va rula `func(i++)` la fiecare 100 ms:

![](setinterval-interval.svg)

Ați observat?

**Întârzierea reală între apelurile `func` pentru `setInterval` este mai mică decât în cod!**

Este normal, pentru că timpul ocupat de execuția lui `func` "consumă" o parte din interval.

Este posibil ca execuția lui `func` să se dovedească a fi mai lungă decât ne așteptam și să dureze mai mult de 100ms.

În acest caz motorul așteaptă ca `func` să se termine, apoi verifică planificatorul și dacă timpul a expirat, îl rulează din nou *imediat*.

În cazul marginal, dacă funcția se execută întotdeauna mai îndelungat decât `delay` ms, atunci apelurile se vor întâmpla fără nicio pauză.

Și iată imaginea pentru `setTimeout` imbricat:

![](settimeout-interval.svg)

**`setTimeout`-ul imbricat garantează întârzierea fixă (aici 100ms).**

Asta pentru că un nou apel este planificat la sfârșitul celui precedent.

````smart header="Colectarea gunoiului și callback-ul setInterval/setTimeout"
Atunci când o funcție este predată în `setInterval/setTimeout`, este creată o referință internă la aceasta și salvată în planificator. Aceasta previne ca funcția să fie colectată la gunoi, chiar dacă nu există alte referințe la ea.

```js
// funcția rămâne în memorie până când planificatorul o apelează
setTimeout(function() {...}, 100);
```

Pentru `setInterval`, funcția rămâne în memorie până când este apelată `clearInterval`.

Există un efect secundar. O funcție face referire la mediul lexical extern, astfel încât, în timp ce ea trăiește, trăiesc și variabilele externe. Acestea pot ocupa mult mai multă memorie decât funcția însăși. Deci atunci când nu mai avem nevoie de funcția programată, este mai bine să o anulăm, chiar dacă este foarte mică.
````

## Zero delay setTimeout

There's a special use case: `setTimeout(func, 0)`, or just `setTimeout(func)`.

This schedules the execution of `func` as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.

So the function is scheduled to run "right after" the current script.

For instance, this outputs "Hello", then immediately "World":

```js run
setTimeout(() => alert("World"));

alert("Hello");
```

The first line "puts the call into calendar after 0ms". But the scheduler will only "check the calendar" after the current script is complete, so `"Hello"` is first, and `"World"` -- after it.

There are also advanced browser-related use cases of zero-delay timeout, that we'll discuss in the chapter <info:event-loop>.

````smart header="Zero delay is in fact not zero (in a browser)"
In the browser, there's a limitation of how often nested timers can run. The [HTML Living Standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) says: "after five nested timers, the interval is forced to be at least 4 milliseconds.".

Let's demonstrate what it means with the example below. The `setTimeout` call in it re-schedules itself with zero delay. Each call remembers the real time from the previous one in the `times` array. What do the real delays look like? Let's see:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call

  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

First timers run immediately (just as written in the spec), and then we see `9, 15, 20, 24...`. The 4+ ms obligatory delay between invocations comes into play.

The similar thing happens if we use `setInterval` instead of `setTimeout`: `setInterval(f)` runs `f` few times with zero-delay, and afterwards with 4+ ms delay.

That limitation comes from ancient times and many scripts rely on it, so it exists for historical reasons.

For server-side JavaScript, that limitation does not exist, and there exist other ways to schedule an immediate asynchronous job, like [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) for Node.js. So this note is browser-specific.
````

## Summary

- Methods `setTimeout(func, delay, ...args)` and `setInterval(func, delay, ...args)` allow us to run the `func` once/regularly after `delay` milliseconds.
- To cancel the execution, we should call `clearTimeout/clearInterval` with the value returned by `setTimeout/setInterval`.
- Nested `setTimeout` calls are a more flexible alternative to `setInterval`, allowing us to set the time *between* executions more precisely.
- Zero delay scheduling with `setTimeout(func, 0)` (the same as `setTimeout(func)`) is used to schedule the call "as soon as possible, but after the current script is complete".
- The browser limits the minimal delay for five or more nested calls of `setTimeout` or for `setInterval` (after 5th call) to 4ms. That's for historical reasons.

Please note that all scheduling methods do not *guarantee* the exact delay.

For example, the in-browser timer may slow down for a lot of reasons:
- The CPU is overloaded.
- The browser tab is in the background mode.
- The laptop is on battery saving mode.

All that may increase the minimal timer resolution (the minimal delay) to 300ms or even 1000ms depending on the browser and OS-level performance settings.
