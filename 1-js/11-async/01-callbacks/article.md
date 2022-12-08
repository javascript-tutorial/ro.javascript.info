

# Introducere: callbacks

```warn header="Folosim metode din browser în exemplele de aici"
Pentru a demonstra folosul callback-urilor, a promises și a altor concepte abstracte, vom folosi câteva metode ale browser-ului: mai exact, încărcarea de scripturi și efectuarea de manipulări simple ale documentelor.

Dacă nu sunteți familiarizat cu aceste metode, iar utilizarea lor în exemple este confuză, este posibil să doriți să citiți câteva capitole din [partea următoare](/document) a tutorialului.

Cu toate acestea, vom încerca să clarificăm lucrurile oricum. Nu va fi nimic cu adevărat complex din punct de vedere al browserului.
```

Multe funcții sunt furnizate de mediile gazdă JavaScript care vă permit să planificați acțiuni *asincrone*. Cu alte cuvinte, acțiuni pe care le inițiem acum, dar care se termină mai târziu.

De exemplu, o astfel de funcție este funcția `setTimeout`.

Există și alte exemple de acțiuni asincrone în lumea reală, e.g. încărcarea scripturilor și modulelor (le vom aborda în viitoare capitole).

Aruncați o privire la funcția `loadScript(src)`, care încarcă un script cu `src` dat:

```js
function loadScript(src) {
  // creează un tag <script> și îl atașează la pagină
  // acest lucru face ca scriptul cu src-ul dat să înceapă să se încarce și să ruleze când se termină
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

Inserează în document un nou tag `<script src="…">`, creat dinamic, cu `src`-ul dat. Browserul începe automat să îl încarce și îl execută când este gata.

Putem folosi această funcție astfel:

```js
// încarcă și execută scriptul la ruta dată
loadScript('/my/script.js');
```

Scriptul este executat "asincron", deoarece începe să se încarce acum, dar se execută mai târziu, când funcția s-a terminat deja.

Dacă există oarecare cod sub `loadScript(…)`, acesta nu așteaptă până când se termină încărcarea scriptului.

```js
loadScript('/my/script.js');
// codul de sub loadScript
// nu așteaptă să se termine încărcarea scriptului
// ...
```

Să spunem că trebuie să folosim noul script imediat ce se încarcă. Acesta declară funcții noi și vrem să le executăm.

Dar dacă am face acest lucru imediat după apelul `loadScript(…)`, nu ar funcționa:

```js
loadScript('/my/script.js'); // scriptul are "function newFunction() {…}"

*!*
newFunction(); // nu există o astfel de funcție!
*/!*
```

Firește, browserul probabil că nu a avut timp să încarce scriptul. Până în prezent, funcția `loadScript` nu oferă o modalitate de a urmări finalizarea încărcării. Script-ul se încarcă și în cele din urmă rulează, asta e tot. Dar am dori să știm când se întâmplă acest lucru, pentru a folosi noile funcții și variabile din acel script.

Să adăugăm o funcție `callback` ca al doilea argument pentru `loadScript` care ar trebui să se execute atunci când scriptul se încarcă:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Evenimentul `onload` este descris în articolul <info:onload-onerror#loading-a-script>, practic execută o funcție după ce scriptul este încărcat și executat.

Acum dacă dorim să apelăm funcțiile noi din script, ar trebui să scrim acest lucru în callback:

```js
loadScript('/my/script.js', function() {
  // callback-ul se execută după ce scriptul este încărcat
  newFunction(); // așa că acum funcționează
  ...
});
```

Aceasta este ideea: al doilea argument este o funcție (de obicei anonimă) care se execută atunci când acțiunea este finalizată.

Iată un exemplu executabil cu un script real:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, scriptul ${script.src} este încărcat`);
  alert( _ ); // funcție declarată în scriptul încărcat
});
*/!*
```

Acesta se numește un stil de programare asincronă "bazat pe callback". O funcție care face ceva în mod asincron ar trebui să furnizeze un argument `callback` în care punem funcția să se execute după ce este gata.

Aici am făcut-o în `loadScript`, dar desigur, este o abordare generală.

## Callback în callback

Cum putem încărca două scripturi în mod secvențial: primul și apoi al doilea după el?

Soluția naturală ar fi să punem al doilea apel `loadScript` în interiorul callback-ului, astfel:

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, ${script.src} este încărcat, hai să mai încărcăm unul`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, al doilea script este încărcat`);
  });
*/!*

});
```

După ce `loadScript` extern este finalizat, callback-ul îl inițiază pe cel intern.

Și dacă mai vrem încă un script...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...continuă după ce toate scripturile sunt încărcate
    });
*/!*

  });

});
```

Astfel, fiecare acțiune nouă se află în interiorul unui callback. Acest lucru este bun pentru câteva acțiuni, dar nu este bun pentru multe, așa că vom vedea în curând și alte variante.

## Manipularea erorilor

În exemplele de mai sus nu am luat în considerare erorile. Ce-ar fi dacă încărcarea scriptului eșuează? Callback-ul nostru ar trebui să fie capabil să reacționeze pentru asta.

Iată o versiune îmbunătățită a `loadScript` care urmărește erorile de încărcare:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Eroare la încărcarea scriptului pentru ${src}`));
*/!*

  document.head.append(script);
}
```

Se apelează `callback(null, script)` în cazul unei încărcări reușite și `callback(error)` în caz contrar.

Utilizarea:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // gestionează eroarea
  } else {
    // script încărcat cu succes
  }
});
```

Încă o dată, rețeta pe care am folosit-o pentru `loadScript` este de fapt destul de comună. Se numește stilul "error-first callback".

Convenția este următoarea:
1. Primul argument al `callback` este rezervat pentru o eroare, dacă aceasta apare. Apoi se apelează `callback(err)`.
2. Al doilea argument (și următoarele, dacă este necesar) sunt pentru rezultatul de succes. Apoi se apelează `callback(null, result1, result2…)`.

Astfel, singura funcție `callback` este utilizată atât pentru raportarea erorilor, cât și pentru transmiterea rezultatelor.

## Piramida oșândei

La prima vedere, pare a fi o abordare viabilă a codării asincrone. Și într-adevăr, așa este. Poate pentru unul sau două nested calls arată bine.

Dar pentru mai multe acțiuni asincrone care se succed una după alta, vom avea un cod ca acesta:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...continuă după ce toate scripturile sunt încărcate (*)
  */!*
          }
        });

      }
    });
  }
});
```

În codul de mai sus:
1. Încărcăm `1.js`, apoi dacă nu există nicio eroare...
2. Încărcăm `2.js`, apoi dacă nu există nicio eroare...
3. Încărcăm `3.js`, apoi dacă nu există nicio eroare... facem altceva `(*)`.

Pe măsură ce apelurile devin mai nested, codul devine mai profund și din ce în ce mai dificil de gestionat, mai ales dacă avem cod real în loc de `...` care poate include mai multe bucle, instrucțiuni condiționale și așa mai departe.

Asta se numește uneori "iadul callback-urilor" sau "piramida osândei".

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    });
  }
});
-->

![](callback-hell.svg)

"Piramida" de apeluri nested crește spre dreapta cu fiecare acțiune asincronă. În curând, aceasta scapă de sub control.

Așadar acest mod de codare nu este foarte bun.

Putem încerca să atenuăm problema făcând ca fiecare acțiune să fie o funcție de sine stătătoare, astfel:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continuă după ce toate scripturile sunt încărcate (*)
  }
}
```

Vedeți? Face același lucru și nu mai există nici o suprapunere adâncă, deoarece am făcut din fiecare acțiune un separat top-level function.

Funcționează, dar codul arată ca o foaie de calcul sfâșiată. Este greu de citit și probabil ați observat că trebuie să săriți cu ochii între bucăți în timp ce îl citiți. Acest lucru este incovenient, mai ales dacă cititorul nu este familiarizat cu codul și nu știe unde să sară cu ochii.

De asemenea, funcțiile numite `step*` sunt toate de unică folosință, ele sunt create doar pentru a evita "piramida osândei". Nimeni nu le va refolosi în afara lanțului de acțiuni. Așadar, există un pic de aglomerare a spațiului de nume aici.

Ne-ar plăcea să avem ceva mai bun.

Din fericire, există și alte modalități de a evita astfel de piramide. Una dintre cele mai bune modalități este utilizarea "promisiunilor", descrise în capitolul următor.
