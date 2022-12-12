
# Event loop: microtasks și macrotasks

Fluxul de execuție JavaScript din browser, ca și în Node.js, se bazează pe un *event loop*.

Înțelegerea modului în care funcționează event loop este importantă pentru optimizări, și uneori pentru arhitectura potrivită.

În acest capitol vom acoperi mai întâi detaliile teoretice despre cum funcționează lucrurile, iar apoi vom vedea aplicațiile practice ale acestor cunoștințe.

## Event Loop

Conceptul *event loop* este foarte simplu. Există o buclă fără sfârșit, în care motorul JavaScript așteaptă sarcini, le execută și apoi adoarme, așteptând alte sarcini.

Algoritmul general al motorului:

1. În timp ce sunt sarcini:
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

## Cazul de utilizare 1: împărțirea sarcinilor flămânde pentru CPU

Să presupunem că avem o sarcină flămândă pentru CPU.

De exemplu, evidențierea sintaxei (utilizată pentru a colora exemplele de cod de pe această pagină) este destul de grea pentru CPU. Pentru a evidenția codul, se efectuează analiza, se creează multe elemente colorate, se adaugă la document - pentru o cantitate mare de text, ceea ce necesită mult timp.

În timp ce motorul este ocupat cu evidențierea sintaxei, nu poate face alte lucruri legate de DOM, procesa evenimentele utilizatorului etc. Poate chiar să provoace browserul să "sughițe" sau chiar să se "blocheze" pentru un timp, ceea ce este inacceptabil.

Putem evita problemele împărțind sarcina mare în bucăți. Evidențiază primele 100 de rânduri, apoi programa `setTimeout` (cu întârziere zero) pentru următoarele 100 de rânduri, și așa mai departe.

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

  // să facă o parte din munca grea (*)
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

Acum, dacă apare o nouă sarcină secundară (e.g. evenimentul `onclick`) în timp ce motorul este ocupat cu execuția părții 1, aceasta este pusă la coadă și apoi se execută când partea 1 s-a terminat, înainte de partea următoare. Revenirile periodice la event loop între execuțiile `count` oferă suficient "aer" pentru ca motorul JavaScript să facă altceva, să reacționeze la alte acțiuni ale utilizatorului.

Lucrul notabil este că ambele variante -- cu și fără diviziunea muncii prin `setTimeout` -- sunt comparabile ca viteză. Nu este o diferență prea mare în timpul total pentru numărare.

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

Este simplu: după cum vă amintiți, este o întârziere minimă în browser de 4 ms pentru multe apeluri nested `setTimeout`. Chiar dacă setăm `0`, este `4ms` (sau un pic mai mult). Deci cu cât programăm mai devreme - cu atât mai repede rulează.

În cele din urmă, am împărțit în părți o sarcină flămândă pentru CPU - acum nu blochează interfața utilizatorului. Iar timpul său total de execuție nu este cu mult mai mare.

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

...Dar este de asemenea posibil să dorim să afișăm ceva în timpul sarcinii, e.g. o bară de progres.

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

Acum `<div>`-ul arată valorile crescânde ale lui `i`, un fel de bară de progres.


## Cazul de utilizare 3: făcând ceva după eveniment

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

## Macrotasks și Microtasks

Alături de *macrotasks*, descrise în acest capitol, mai sunt și *microtasks*, menționate în capitolul <info:microtask-queue>.

Microtask-urile provin exclusiv din codul nostru. Ele sunt de obicei create prin promisiuni: o execuție a gestionarului `.then/catch/finally` devine un microtask. Microtask-urile sunt folosite "sub capacul" lui `await` de asemenea, deoarece este o altă formă de gestionare a promisiunilor.

Mai este de asemenea o funcție specială `queueMicrotask(func)` care pune la coadă `func` pentru execuție în microtask queue.

**Imediat după fiecare *macrotask*, motorul execută toate sarcinile din *microtask* queue, înainte de a rula alte macrotasks sau a randa sau orice altceva.**

De exemplu, aruncați o privire:

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

Care va fi ordinea aici?

1. `code` apare primul, pentru că este un apel sincron obișnuit.
2. `promise` apare al doilea, deoarece `.then` trece prin microtask queue, și se execută după codul curent.
3. `timeout` apare ultimul, deoarece este un macrotask.

Imaginea mai bogată a event loop arată astfel (ordinea este de sus în jos, adică: mai întâi scriptul, apoi microtaskul, randarea și așa mai departe):

![](eventLoop-full.svg)

Toate microtask-urile sunt finalizate înainte de orice altă gestionare a evenimentelor sau randare sau orice alt macrotask.

Asta este important, deoarece garantează că mediul aplicației este practic același (fără modificări ale coordonatelor mouse-ului, fără date de rețea noi etc.) între microtaskuri.

Dacă dorim să executăm o funcție în mod asincron (după codul curent), dar înainte ca modificările să fie randate sau noi evenimente gestionate, o putem programa cu `queueMicrotask`.

Iată un exemplu cu "contorizarea barei de progres", similar cu cel prezentat anterior, dar `queueMicrotask` este folosit în loc de `setTimeout`. Puteți vedea că se randează chiar la sfârșit. La fel ca în cazul codului sincron:

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

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

## Sumar

Un algoritm mai detaliat al event loop (deși este încă simplificat în comparație cu [specificația](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Retrage din coadă și rulează cea mai veche sarcină din *macrotask* queue (e.g. "script").
2. Execută toate *microtasks*:
    - Cât timp microtask queue nu este goală:
        - Retrage din coadă și rulează cel mai vechi microtask.
3. Randează modificări dacă există.
4. Dacă macrotask queue este goală, așteptă până când apare un macrotask.
5. Merge la pasul 1.

Pentru a programa un nou *macrotask*:
- Utilizați `setTimeout(f)` cu întârziere zero.

Acest lucru poate fi folosit pentru a împărți o sarcină mare cu calcule grele în bucăți, pentru ca browserul să poată reacționa la evenimentele utilizatorului și să afișeze progresul între ele.

De asemenea, utilizat în gestionarii de evenimente pentru a programa o acțiune după ce evenimentul este complet gestionat (bubbling done).

Pentru a programa un nou *microtask*
- utilizați `queueMicrotask(f)`.
- De asemenea gestionarii de promisiuni trec prin coada de microtask-uri.

Între microtask-uri nu există gestionare de evenimente de interfață sau de rețea: acestea se execută imediat una după alta.

Astfel se poate dori să folosiți `queueMicrotask` pentru a executa o funcție în mod asincron, dar în cadrul stării mediului.

```smart header="Web Workers"
Pentru calcule lungi și grele care nu ar trebui să blocheze event loop, putem folosi [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

Aceasta este o modalitate de a rula codul într-un alt thread, în paralel.

Web Workers pot face schimb de mesaje cu procesul principal, dar au propriile variabile, și propriul lor event loop.

Web Workers nu au acces la DOM, așa că sunt utili, în principal, pentru calcule, pentru a utiliza mai multe nuclee CPU simultan.
```
