
# Event loop: microtasks și macrotasks

Fluxul de execuție JavaScript din browser, ca și în Node.js, se bazează pe un *event loop*.

Înțelegerea modului în care funcționează event loop este importantă pentru optimizări, și uneori pentru arhitectura potrivită.

În acest capitol vom acoperi mai întâi detaliile teoretice despre cum funcționează lucrurile, iar apoi vom vedea aplicațiile practice ale acestor cunoștințe.

## Event Loop

Conceptul *event loop* este foarte simplu. Există o buclă fără sfârșit, în care motorul JavaScript așteaptă sarcini, le execută și apoi adoarme, așteptând alte sarcini.

Algoritmul general al motorului:

1. În timp ce există sarcini:
    - le execută, începând cu cea mai veche sarcină.
2. Doarme până când apare o sarcină, apoi treceți la 1.

Aceasta este o formalizare pentru ceea ce vedem atunci când navigăm pe o pagină. Motorul JavaScript nu face nimic în cea mai mare parte a timpului, se execută doar dacă se activează un script/gestionar/eveniment.

Exemple de sarcini:

- Atunci când se încarcă un script extern `<script src="...">`, sarcina este de a-l executa.
- Atunci când un utilizator își mișcă mouse-ul, sarcina este de a expedia evenimentul `mousemove` și de a executa gestionarii.
- Atunci când timpul este scadent pentru un `setTimeout` programat, sarcina este să ruleze callback-ul său.
- ...și așa mai departe.

Sarcinile sunt setate -- motorul le gestionează -- apoi așteaptă mai multe sarcini (în timp ce doarme și consumă aproape zero CPU).

Se poate întâmpla ca o sarcină să vină în timp ce motorul este ocupat, atunci este pusă la coadă.

Sarcinile formează o coadă, așa-numita "macrotask queue" (termen v8):

![](eventLoop.svg)

De exemplu, în timp ce motorul este ocupat cu execuția unui `script`, un utilizator poate muta mouse-ul provocând `mousemove`, iar `setTimeout` poate fi scadent și așa mai departe, aceste sarcini formează o coadă, așa cum este ilustrat în imaginea de mai sus.

Sarcinile din coadă sunt procesate în baza "primul venit -- primul servit". Atunci când motorul browserului a terminat cu `script`, acesta se ocupă de evenimentul `mousemove`, apoi gestionarul `setTimeout`, și așa mai departe.

Până acum, destul de simplu, nu?

Încă două detalii:
1. Randarea nu are loc niciodată în timp ce motorul execută o sarcină. Nu contează dacă sarcina durează mult timp. Modificările aduse la DOM sunt pictate numai după ce sarcina este finalizată.
2. Dacă o sarcină durează prea mult, browserul nu poate efectua alte sarcini, cum ar fi procesarea evenimentelor utilizatorului. Deci după un timp, acesta lansează o alertă ca "Page Unresponsive", sugerând uciderea sarcinii împreună cu întreaga pagină. Asta se întâmplă atunci când au loc o mulțime de calcule complexe sau când o eroare de programare duce la o buclă infinită.

Aceasta a fost teoria. Acum să vedem cum putem aplica aceste cunoștințe.

## Cazul de utilizare 1: împărțirea sarcinilor flămânde de CPU

Să presupunem că avem o sarcină flămândă de CPU.

De exemplu, evidențierea sintaxei (utilizată pentru a colora exemplele de cod de pe această pagină) este destul de grea pentru CPU. Pentru a evidenția codul, se efectuează analiza, se creează multe elemente colorate, se adaugă la document - pentru o cantitate mare de text, ceea ce necesită mult timp.

În timp ce motorul este ocupat cu evidențierea sintaxei, nu poate face alte lucruri legate de DOM, procesa evenimentele utilizatorului etc. Poate chiar să provoace browserul să "sughițe" sau chiar să se "blocheze" pentru un timp, ceea ce este inacceptabil.

Putem evita problemele împărțind sarcina mare în bucăți. Evidențiază primele 100 de rânduri, apoi programați `setTimeout` (cu întârziere zero) pentru următoarele 100 de rânduri, și așa mai departe.

Pentru a demonstra această abordare, de dragul simplității, în loc de evidențierea textului, să luăm o funcție care numără de la `1` la `1000000000`.

Dacă executați codul de mai jos, motorul se va "bloca" pentru o perioadă de timp. Pentru server-side JS acest lucru este clar vizibil, iar dacă îl executați în browser, atunci încercați să faceți clic pe alte butoane de pe pagină - veți vedea că niciun alt eveniment nu este gestionat până când numărătoarea se termină.

```js run
let i = 0;

let start = Date.now();

function count() {

  // face o treabă grea
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Terminat în " + (Date.now() - start) + 'ms');
}

count();
```

Browserul poate chiar afișa un avertisment "the script takes too long".

Să împărțim sarcina folosind apeluri nested `setTimeout`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // face o parte din munca grea (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Terminat în " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // programează noul apel (**)
  }

}

count();
```

Acum interfața browserului este complet funcțională în timpul procesului de "numărare".

O singură execuție a lui `count` face o parte din treabă `(*)`, și apoi se reprogramează `(**)` dacă este necesar:

1. Prima rulare numără: `i=1...1000000`.
2. A doua rulare numără: `i=1000001..2000000`.
3. ...și așa mai departe.

Acum, dacă apare o nouă sarcină secundară (de exemplu, evenimentul `onclick`) în timp ce motorul este ocupat cu execuția părții 1, aceasta este pusă la coadă și apoi se execută când partea 1 s-a terminat, înainte de partea următoare. Revenirile periodice la event loop între execuțiile `count` oferă suficient "aer" pentru ca motorul JavaScript să facă altceva, să reacționeze la alte acțiuni ale utilizatorului.

Lucrul notabil este că ambele variante -- cu și fără diviziunea muncii prin `setTimeout` -- sunt comparabile ca viteză. Nu există o diferență prea mare în timpul total pentru numărare.

Pentru a le face mai apropiate, să facem o îmbunătățire.

Vom muta programarea la începutul lui `count()`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // mută programarea la început
  if (i < 1e9 - 1e6) {
    setTimeout(count); // programează noul apel
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Terminat în " + (Date.now() - start) + 'ms');
  }

}

count();
```

Acum, când începem `count()` și vedem că va trebui să mai `count()`, programăm acest lucru imediat, înainte de a face treaba.

Dacă o rulezi, este ușor de observat că durează semnificativ mai puțin timp.

De ce?  

Este simplu: după cum vă amintiți, există o întârziere minimă în browser de 4 ms pentru multe apeluri nested `setTimeout`. Chiar dacă setăm `0`, este `4ms` (sau un pic mai mult). Deci cu cât programăm mai devreme - cu atât mai repede se execută.

În cele din urmă, am împărțit în părți o sarcină flămândă de CPU - acum nu blochează interfața cu utilizatorul. Iar timpul său total de execuție nu este cu mult mai mare.

## Cazul de utilizare 2: indicare de progres

Un alt beneficiu al împărțirii sarcinilor grele pentru scripturile din browser este că putem afișa indicarea progresului.

Așa cum am menționat mai devreme, modificările aduse DOM sunt pictate numai după ce sarcina în curs de execuție este finalizată, indiferent cât de mult durează.

Pe de o parte, asta e grozav, deoarece funcția noastră poate crea multe elemente, le adăugă unul câte unul în document și le modifică stilurile -- vizitatorul nu va vedea nici o stare "intermediară", neterminată. Un lucru important, nu-i așa?

Iată demonstrația, modificările aduse lui `i` nu vor apărea până când funcția nu se termină, așa că vom vedea doar ultima valoare:


```html run
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

...Dar este posibil să dorim să afișăm ceva în timpul sarcinii, e.g. o bară de progres.

Dacă împărțim sarcina grea în bucăți folosind `setTimeout`, atunci modificările sunt pictate între ele.

Asta arată mai frumos:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // să facă o parte din munca grea (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

Acum, `<div>` arată valorile crescânde ale lui `i`, un fel de bară de progres.


## Cazul de utilizare 3: a face ceva după eveniment

Într-un gestionar de evenimente putem decide să amânăm anumite acțiuni până când evenimentul a crescut și a fost gestionat la toate nivelele. Putem face asta prin ambalarea codului în `setTimeout` cu întârziere zero.

În capitolul <info:dispatch-events> am văzut un exemplu: evenimentul personalizat `menu-open` este expediat în `setTimeout`, astfel încât să se întâmple după ce evenimentul "click" a fost complet gestionat.

```js
menu.onclick = function() {
  // ...

  // crează un eveniment personalizat cu datele despre elementul de meniu pe care s-a făcut clic
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  // expediază evenimentul personalizat în mod asincron
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

## Macrotasks and Microtasks

Along with *macrotasks*, described in this chapter, there are *microtasks*, mentioned in the chapter <info:microtask-queue>.

Microtasks come solely from our code. They are usually created by promises: an execution of `.then/catch/finally` handler becomes a microtask. Microtasks are used "under the cover" of `await` as well, as it's another form of promise handling.

There's also a special function `queueMicrotask(func)` that queues `func` for execution in the microtask queue.

**Immediately after every *macrotask*, the engine executes all tasks from *microtask* queue, prior to running any other macrotasks or rendering or anything else.**

For instance, take a look:

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

What's going to be the order here?

1. `code` shows first, because it's a regular synchronous call.
2. `promise` shows second, because `.then` passes through the microtask queue, and runs after the current code.
3. `timeout` shows last, because it's a macrotask.

The richer event loop picture looks like this (order is from top to bottom, that is: the script first, then microtasks, rendering and so on):

![](eventLoop-full.svg)

All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

That's important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask`.

Here's an example with "counting progress bar", similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

## Summary

A more detailed event loop algorithm (though still simplified compared to the [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Dequeue and run the oldest task from the *macrotask* queue (e.g. "script").
2. Execute all *microtasks*:
    - While the microtask queue is not empty:
        - Dequeue and run the oldest microtask.
3. Render changes if any.
4. If the macrotask queue is empty, wait till a macrotask appears.
5. Go to step 1.

To schedule a new *macrotask*:
- Use zero delayed `setTimeout(f)`.

That may be used to split a big calculation-heavy task into pieces, for the browser to be able to react to user events and show progress between them.

Also, used in event handlers to schedule an action after the event is fully handled (bubbling done).

To schedule a new *microtask*
- Use `queueMicrotask(f)`.
- Also promise handlers go through the microtask queue.

There's no UI or network event handling between microtasks: they run immediately one after another.

So one may want to `queueMicrotask` to execute a function asynchronously, but within the environment state.

```smart header="Web Workers"
For long heavy calculations that shouldn't block the event loop, we can use [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

That's a way to run code in another, parallel thread.

Web Workers can exchange messages with the main process, but they have their own variables, and their own event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiple CPU cores simultaneously.
```
