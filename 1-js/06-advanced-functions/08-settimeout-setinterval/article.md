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

## setTimeout cu Întârziere zero

Există un caz special de utilizare: `setTimeout(func, 0)`, sau doar `setTimeout(func)`.

Acest lucru planifică execuția lui `func` cât mai curând posibil. Dar planificatorul îl va invoca numai după ce scriptul în curs de execuție este finalizat.

Astfel funcția este planifică să se execute "imediat după" scriptul curent.

De exemplu, aceasta produce "Hello", apoi imediat "World":

```js run
setTimeout(() => alert("World"));

alert("Hello");
```

Prima linie "pune apelul în calendar după 0ms". Dar planificatorul va "verifica calendarul" numai după ce scriptul curent este finalizat, așa că `"Hello"` este primul, iar `"World"` -- după el.

Există de asemenea cazuri avansate de utilizare a timeout-ului cu întârziere zero legate de browser, pe care le vom discuta în capitolul <info:event-loop>.

````smart header="Întârzierea zero nu este de fapt zero (într-un browser)"
În browser, este o limitare pentru cât de des pot rula temporizatoarele imbricate. [HTML Living Standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) spune: "după cinci temporizatoare imbricate, intervalul este forțat să fie de cel puțin 4 milisecunde.".

Să demonstrăm ce înseamnă acest lucru cu exemplul de mai jos. Apelul `setTimeout` cuprins în el se reprogramează singur cu întârziere zero. Fiecare apel reține întârzierea reală din cel precedent în matricea `times`. Cum arată întârzierile reale? Să vedem:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // ține minte întârzierea de la apelul anterior

  if (start + 100 < Date.now()) alert(times); // arată întârzierile după 100ms
  else setTimeout(run); // else replanifică
});

// un exemplu de ieșire:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

Primele temporizatoare se execută imediat (așa cum este scris în specificație), iar apoi vedem `9, 15, 20, 24...`. Intră în joc întârzierea obligatorie de 4+ ms între invocări.

Un lucru similar se întâmplă dacă folosim `setInterval` în loc de `setTimeout`: `setInterval(f)` rulează `f` de câteva ori cu întârziere zero, iar apoi cu întârziere de 4+ ms.

Această limitare provine din timpuri străvechi și multe scripturi se bazează pe ea, așa că există din motive istorice.

Pentru JavaScript pe server, această limitare nu există și există alte modalități de a programa o sarcină asincronă imediată, cum ar fi [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) pentru Node.js. Deci această notă este specifică browserului.
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
