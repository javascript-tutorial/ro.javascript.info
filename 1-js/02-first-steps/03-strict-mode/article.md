# Modul modern, "use strict"

Pentru o perioadă lungă de timp, JavaScript a evoluat fără probleme de compatibilitate. Noi caracteristici au fost adăugate limbajului în timp ce vechile funcționalități nu s-au schimbat.

Acest lucru a avut avantajul de a nu strica niciodată codul existent. Dar dezavantajul a fost că orice greșeală sau o decizie imperfectă luată de creatorii JavaScript a rămas blocată în limbaj pentru totdeauna.

Așa a fost cazul până în 2009 când a apărut ECMAScript 5 (ES5). Acesta a adăugat noi caracteristici limbajului și a modificat unele dintre cele existente. Pentru ca vechiul cod să rămână funcțional, majoritatea acestor modificări sunt dezactivate în mod implicit. Trebuie să le activați în mod explicit cu o directivă specială: `"use strict"`.

## "use strict"

Directiva arată ca un șir: `"use strict"` sau `'use strict'`. Atunci când este situată în partea de sus a unui script, întregul script funcționează în mod "modern".

De exemplu:

```js
"use strict";

// acest cod funcționează în modul modern
...
```

Destul de curând vom învăța funcții (o modalitate de a grupa comenzi), deci să reținem în prealabil că `"use strict"` poate fi pus la începutul unei funcții. Făcând acest lucru activează modul strict numai în acea funcție. Dar de obicei oamenii îl folosesc pentru întregul script.

````warn header="Asigurați-vă că \"use strict\" este în partea de sus, la început"
Vă rugăm să vă asigurați că `"use strict"` se află în partea de sus a scripturilor vostre, în caz contrar este posibil ca modul strict să nu fie activat.

Modul strict nu este activat aici:

```js no-strict
alert("some code");
// "use strict" de mai jos este ignorat - trebuie să fie în partea de sus, la începutul scriptului

"use strict";

// modul strict nu este activat
```

Doar comentariile pot apărea deasupra `"use strict"`.
````

```warn header="Nu este nicio modalitate de a anula `use strict`"
Nu există o directivă ca `"no use strict"` care să readucă motorul la vechiul comportament.

Odată ce intrăm în modul strict, nu mai există cale de întoarcere.
```

## Consola browserului

Atunci când folosiți [developer console](info:devtools) pentru a rula codul, vă rugăm să rețineți că aceasta nu folosește `use strict` în mod implicit.

Uneori, când `use strict` face o diferență, veți obține rezultate incorecte.

Așadar, cum se utilizează de fapt `use strict` în consolă?

În primul rând, puteți încerca să apăsați `key:Shift+Enter` pentru a introduce mai multe linii, și să puneți `use strict` deasupra, astfel:

```js
'use strict'; <Shift+Enter pentru o linie nouă>
//  ...codul tău
<Enter pentru a rula>
```

Funcționează în majoritatea browserelor, mai ales în Firefox și Chrome.

Dacă nu funcționează, de exemplu într-un browser vechi, există o modalitate inestetică, dar fiabilă de a asigura `use strict`. Puneți-l în acest tip de înveliș:

```js
(function() {
  'use strict';

  // ...codul tău aici...
})()
```

## Ar trebui să folosim "use strict"?

Întrebarea poate părea evidetă, dar nu este așa.

Cineva ar putea recomanda a începe scripturile cu `"use strict"`... Dar știi ce este grozav?

JavaScriptul modern suportă "classes" și "modules" - structuri avansate de limbaj (vom ajunge cu siguranță la ele), care activează `use strict` automat. Astfel nu este nevoie să adăugăm directiva `"use strict"`, dacă le folosim.

**Deci, deocamdată `"use strict";` este un oaspete binevenit în partea de sus a scripturilor tale. Mai târziu, când tot codul tău va cuprinde "classes" și "modules", îl vei putea omite.**

Din acest moment, trebuie să știm despre `use strict` în general.

În capitolele următoare, pe măsură ce învățăm caracteristicile limbajului de programare, vom vedea diferențele dintre modul strict și cel vechi. Din fericire, nu sunt prea multe și ele ne fac de fapt viața mai ușoară.

Toate exemplele din acest tutorial presupun modul strict dacă nu (foarte rar) se specifică altfel.
