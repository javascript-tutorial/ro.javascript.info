# Metoda modernă "use strict"

Pentru o perioadă lungă de timp, JavaScript a evoluat fără probleme de compatibilitate. Noi caracteristici au fost adăugate limbajului, în timp ce vechile funcționalități nu s-au schimbat.

Acest lucru a avut avantajul de a nu strica niciodată codul existent. Dar dezavantajul era că orice greșeală sau decizie imperfectă, luată de creatorii JavaScript, a rămas blocată în limbaj pentru totdeauna.

Acest aspect a fost valabil până în 2009, când a apărut ECMAScript 5 (ES5). Acesta a adăugat noi caracteristici limbajului și a modificat unele dintre cele existente. Pentru ca vechiul cod să rămână funcțional, majoritatea acestor modificări sunt dezactivate în mod standard. Trebuie să le activați în mod explicit cu o comandă specială: `"use strict"`.

## "use strict"

Comanda arată ca un string ("șir de caractere"): `"use strict"` sau `'use strict'`. Atunci când este amplasată în partea de sus a unui script, întregul script funcționează în mod "modern".

Exemplu:

```js
"use strict";

// acest cod funcționează folosind metoda modernă
...
```

Destul de curând vom învăța functions ("funcții") (o modalitate de a grupa comenzi), așa că putem reține în prealabil că `"use strict"`poate fi pus la începutul unei funcții. Făcând acest lucru, se activează modul strict numai în acea funcție. Dar, de obicei, oamenii îl folosesc pentru întregul script.

````warn header="Asigurați-vă că \"use strict\" este la început"
Vă rugăm să vă asigurați că `"use strict"` se află în partea de sus a scripturilor dumneavoastră, în caz contrar, este posibil ca modul strict să nu fie activat.

Modul strict nu este activat aici:

```js no-strict
alert("some code");
// "use strict" de mai jos este ignorat - trebuie să fie în partea de sus, la începutul scriptului

"use strict";

// modul strict nu este activat
```

Doar comentariile pot apărea deasupra `"use strict"`.
````

```warn header="Nu există nicio modalitate de a anula `use strict`"
Nu există o comandă de tipul `"no use strict"` care să readucă motorul de căutare ("browserul") la vechiul comportament.

Odată ce am activat modul strict, nu mai există cale de întoarcere.
```

## Consola browserului

Atunci când folosiți [developer console](info:devtools) pentru a rula codul, vă rugăm să rețineți că aceasta nu folosește `use strict` în mod implicit.

Uneori, când `use strict` face o diferență, veți obține rezultate incorecte.

Așadar, cum se utilizează de fapt `use strict` în consolă?

În primul rând, puteți încerca să apăsați `key:Shift+Enter` pentru a introduce mai multe linii, și să puneți `use strict` deasupra, astfel:

```js
'use strict'; <Shift+Enter pentru o linie nouă>
//  ...codul tău
<Enter pentru a executa>
```

Funcționează în majoritatea browserelor, mai ales în Firefox și Chrome.

Dacă nu funcționează, de exemplu, într-un browser vechi, există o modalitate inestetică, dar fiabilă de a asigura `use strict`. Puneți-l în acest tip de înveliș:

```js
(function() {
  'use strict';

  // ...codul tău...
})()
```

## Ar trebui să folosim comanda "use strict"?

Întrebarea poate părea banală, dar nu este așa.

Cineva ar putea recomanda să începeți scripturile cu `"use strict"`... Dar știi ce este grozav?

JavaScriptul modern suportă "classes" ("clase") și "modules" ("module") - structuri avansate de limbaj (vom ajunge cu siguranță la ele), care permit `use strict` în mod automat. Astfel, nu este nevoie să adăugăm comanda `"use strict"`, dacă le folosim.

**Deci, deocamdată `"use strict";` este binevenit în partea de sus a scripturilor dumneavoastră. Mai târziu, când tot codul dumneavoastră va cuprinde "classes" și "modules", îl veți putea omite.**

Din acest moment, trebuie să știm despre `use strict` în general.

În capitolele următoare, pe măsură ce vom învăța caracteristicile limbajului de programare, vom vedea diferențele dintre modul strict și cel vechi. Din fericire, nu sunt prea multe și, de fapt, ne fac viața mai ușoară.

Toate exemplele din acest tutorial presupun modul strict, cu excepția cazului în care (foarte rar) se specifică altfel.
