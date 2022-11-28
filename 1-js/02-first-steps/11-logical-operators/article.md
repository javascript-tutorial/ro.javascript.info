# Operatorii logici

<<<<<<< Updated upstream
Există 4 operatori logici în JavaScript: `||` (OR), `&&` (AND), `!` (NOT), `??` (Nullish Coalescing). În acest articol vom vorbi despre primii trei, urmând ca de `??` să discutăm în următorul articol.
=======
Există 4 operatori logici în JavaScript: `||` (OR), `&&` (AND), `!` (NOT), `??` (Nullish Coalescing).  În acest articol vom vorbi despre primii trei, urmând ca de `??` ă discutăm în următorul articol.
>>>>>>> Stashed changes

Deși sunt numiți "logici", pot fi folosiți cu valori de orice tip, nu numai de tip boolean. De asemenea, rezultatul lor poate fi de orice tip.

Să intrăm mai în detaliu.

## || (OR)

Operatorul "OR" este reprezentat de două linii verticale.

```js
result = a || b;
```

<<<<<<< Updated upstream
În programarea clasică, OR este menit să manipuleze doar valorile de tip boolean. Dacă unul dintre argumentele sale este `true`, atunci va returna `true`, altfel va returna `false`.

În JavaScript, acest operatorul este mult mai puternic. Dar pentru început , să vedem ce se întamplă cu valorile de tip boolean.
=======
n programarea clasică, OR este menit să manipuleze doar valorile de tip boolean. Dacă unul dintre argumentele sale este `true`, atunci va returna `true`, altfel va returna `false`.

În JavaScript, acest operator este mult mai puternic. Dar pentru început , să vedem ce se întamplă cu valorile de tip boolean.
>>>>>>> Stashed changes

Există patru posibile combinații logice:

```js run
<<<<<<< Updated upstream
alert(true || true); // adevărat
alert(false || true); // adevărat
alert(true || false); // adevărat
alert(false || false); // fals
```

După cum putem vedea, rezultatul este mereu `true` cu excepția cazului în care ambii operatori vor fi `false`.
=======
alert( true || true );   // adevărat
alert( false || true );  // adevărat
alert( true || false );  // adevărat
alert( false || false ); // fals
```

După cum putem vedea, rezultatul este mereu  `true` u excepția cazului în care ambii operatori vor fi  `false`.
>>>>>>> Stashed changes

Dacă un operator nu este de tip boolean, va fi convertit mai întâi în tipul boolean pentru a fi evaluat.

De exemplu, numărul `1` este considerat ca fiind `true`, iar numarul `0` ca fiind `false`:

```js run
<<<<<<< Updated upstream
if (1 || 0) {
	// works just like if( true || false )
	alert("truthy!");
}
```

De cele mai multe ori , OR `||` este folosit în afirmațiile `if` pentru a testa dacă oricare dintre condițiile date sunt `true`.
=======
if (1 || 0) { // funcționează exact ca if( true || false )
  alert( 'truthy!' );
}
```

De cele mai multe ori , OR  `||` este folosit în afirmațiile `if` pentru a testa dacă oricare dintre condițiile date sunt `true`.
>>>>>>> Stashed changes

De exemplu:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

Putem să îî dam și mai multe condiții:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
	alert("The office is closed."); // pentru că este weekend
}
```

<<<<<<< Updated upstream
## OR "||" găsește prima valoare adevărată [#or-finds-the-first-truthy-value]
=======
##OR "||" găsește prima valoare adevărată[#or-finds-the-first-truthy-value]
>>>>>>> Stashed changes

Logica explicată mai sus este ceva clasic. Acum, să trecem la caracteristicele mai "extra" ale JavaScript.

Algoritmul extins funcționează după cum urmează.

Dacă se compară mai multe valori cu ajutorul OR:

```js
result = value1 || value2 || value3;
```

<<<<<<< Updated upstream
Operatoul OR `||` face următoarele:

- Evaluează operatorii de la stânga la dreapta.
- Modifică fiecare operator în cel de tip boolean. Dacă rezultatul este `true`, se oprește și returnează valoarea originală a operatorului .
- Dacă toți operatorii au fost evaluați(i.e. toți sunt `false`), va fi returnat ultimul operator.
=======
Operatoul OR`||` face următoarele:

- Evaluează operatorii de la stânga la dreapta.
- Modifică fiecare operator în cel de tip boolean. Dacă rezultatul este `true`, se oprește și returnează valoarea originală a operatorului .
- Dacă toți operatorii au fost evaluați (i.e. toți sunt `false`), va fi returnat ultimul operator.
>>>>>>> Stashed changes

O valoare va fi returnată în forma sa originală, fără conversie.
Cu alte cuvinte, o expresie care conține OR `||` returnează prima valoare adevarată sau ultima valoare dacă nu a fost gasită nici o valoare adevarată.

<<<<<<< Updated upstream
De exemplu:

```js run
alert(1 || 0); // 1 (1 este adevărat)

alert(null || 1); // 1 (1 este prima valoare adevărată)
alert(null || 0 || 1); // 1 (prima valoare adevărată)

alert(undefined || null || 0); // 0 (toate false, returnează ultima valoare)
=======
O valoare va fi returnată în forma sa originală, fără conversie. Cu alte cuvinte, o expresie care conține OR `||`  returnează prima valoare adevarată sau ultima valoare dacă nu a fost gasită nici o valoare adevarată.

De exemplu:

```js run
alert( 1 || 0 ); // 1 (1 este truthy)

alert( null || 1 ); // 1 (1 este prima valoare truthy)
alert( null || 0 || 1 ); // 1 (prima valoare truthy)

alert( undefined || null || 0 ); // 0 (toate falsy, returnează ultima valoare)
>>>>>>> Stashed changes
```

Comparând cu "pure, classical, boolean-only OR", aceasta deține o funcționalitate mai mare.

<<<<<<< Updated upstream
1. **Obținerea primei valori adevărate dintr-o listă de variabile sau dintr-o expresie**

   De exemplu, avem următoarele variabile `firstName`, `lastName` și `nickName`, toate opționale (i.e. pot fi undefined sau pot avea valori false).

   Vom folosi OR `||` pentru a o alege și arăta pe cea care este definită. (sau `"Anonymous"` daca nu este nici una definită):
=======

1. **Obținerea primei valori adevărate dintr-o listă de variabile sau dintr-o expresie**

    De exemplu, avem următoarele variabile `firstName`, `lastName` și `nickName` toate opționale (i.e. pot fi undefined sau pot avea valori falsy).

    Vom folosi OR `||` entru a o alege și arăta pe cea care este definită. (sau `"Anonymous"` daca nu este nici una definită):
>>>>>>> Stashed changes

   ```js run
   let firstName = "";
   let lastName = "";
   let nickName = "SuperCoder";

   *!*
   alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
   */!*
   ```

<<<<<<< Updated upstream
   Dacă toate variabilele sunt false, atunci `"Anonymous"` va apărea.

2. **Short-circuit evaluation.**

   O altă utilizare a operatorului OR `||` este așa numita evaluare "short-circuit".

   Aceasta înseamnă ca `||` procesează toate argumentele pâna ce găsește prima valoare adevărată, aceasta fiind returnată imediat.

   Această utilizare devine importantă daca un operator nu este doar o valoare, ci o expresie cu efect secundar, cum ar fi atribuirea variabilelor sau chemarea unei funcții.

   În exemplul de mai jos, va fi printat cel de al doilea mesaj:
=======
    Dacă toate variabilele sunt falsy, atunci `"Anonymous"` va apărea.

2. **Short-circuit evaluation.**

    O altă utilizare a operatorului OR  `||`  este așa numita evaluare "short-circuit".

    Aceasta înseamnă ca `||` procesează toate argumentele pâna ce găsește prima valoare adevărată, aceasta fiind returnată imediat.

    Această utilizare devine importantă daca un operator nu este doar o valoare, ci o expresie cu efect secundar, cum ar fi atribuirea variabilelor sau chemarea unei funcții.

    În exemplul de mai jos, va fi printat cel de al doilea mesaj:
>>>>>>> Stashed changes

   ```js run no-beautify
   *!*true*/!* || alert("not printed");
   *!*false*/!* || alert("printed");
   ```

<<<<<<< Updated upstream
   în prima line , operatorul OR `||` oprește evaluarea imediat cum vede `true`, `alert` nu va rula.

   Uneori, oamenii folosesc această utilitate pentru a executa comenzi doar dacă condiția din stângă este falsă.
=======
   în prima line , operatorul OR  `||` oprește evaluarea imediat cum vede `true`, `alert`nu va rula.

   Uneori, oamenii folosesc această utilitate pentru a executa comenzi doar dacă condiția din stângă este falsy.
>>>>>>> Stashed changes

## && (AND)

Operatorul AND operator este reprezentat de două ampersands `&&`:

```js
result = a && b;
```

<<<<<<< Updated upstream
În programarea clasică, AND returnează `true` dacă ambii operatori sunt adevărați și `false` dacă nu sunt:
=======
În programarea clasică, AND returnează `true` dacă ambii operatori sunt adevărați și  `false` dacă nu sunt:
>>>>>>> Stashed changes

```js run
alert(true && true); // adevărat
alert(false && true); // fals
alert(true && false); // fals
alert(false && false); // fals
```

Un exemplu cu `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
	alert("The time is 12:30");
}
```

La fel ca și la operatorul OR, orice valoare este acceptată:

```js run
<<<<<<< Updated upstream
if (1 && 0) {
	// evaluată ca și true && false
	alert("won't work, because the result is falsy");
=======
if (1 && 0) { // evaluată ca  true && false
  alert( "won't work, because the result is falsy" );
>>>>>>> Stashed changes
}
```

## AND "&&" găsește prima valoare falsă

<<<<<<< Updated upstream
=======
## AND "&&" găsește prima valoare falsy

>>>>>>> Stashed changes
Dacă avem mai multe valori:

```js
result = value1 && value2 && value3;
```

<<<<<<< Updated upstream
Operatorul AND `&&` face următoarele:

- Evaluează operatorii de la stânga la dreapta.
- Convertește fiecare operator în unul de tipul boolean. Dacă rezultatul este `false`, se oprește și returnează valoarea originală a operatorului.
- Dacă toți operatorii au fost evaluați (i.e. toți sunt adevărați), va fi returnat ultimul operator.

Cu alte cuvinte, AND returnează prima valoare falsă sau ultima valoare dacă nu a fost găsita nici una falsă.

Regulile sunt asemănătoare cu cele de la OR. Diferența o face faptul că AND returnează prima valoare _falsy_ pe când OR returnează prima valoare _truthy_.
=======
Operatorul AND `&&` face următoarele:  

- Evaluează operatorii de la stânga la dreapta.
- Convertește fiecare operator în unul de tipul boolean. Dacă rezultatul este`false`,se oprește și returnează valoarea originală a operatorului.
-Dacă toți operatorii au fost evaluați (i.e. toți sunt truthy), va fi returnat ultimul operator.

Cu alte cuvinte, AND returnează prima valoare falsă sau ultima valoare dacă nu a fost găsita nici una falsă.

Regulile sunt asemănătoare cu cele de la OR. Diferența o face faptul că AND returnează prima valoare *falsy* pe când OR returnează prima valoare *truthy*.
>>>>>>> Stashed changes

Exemple:

```js run
<<<<<<< Updated upstream
// dacă primul operator este adevărat,
// AND returnează al doilea operator:
alert(1 && 0); // 0
alert(1 && 5); // 5

// dacă primul operator este fals,
// AND îl returnează. Al doilea operator este ignorat
alert(null && 5); // null
alert(0 && "no matter what"); // 0
```

Dacă avem mai multe valori într-un șir, va fi returnată prima valoare falsă.
=======
// dacă primul operator este truthy,
// AND returnează al doilea operator:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// dacă primul operator este falsy,
// AND îl returnează. Al doilea operator este ignorat
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

Dacă avem mai multe valori într-un șir, va fi returnată prima valoare falsy.
>>>>>>> Stashed changes

```js run
alert(1 && 2 && null && 3); // null
```

<<<<<<< Updated upstream
Când toate valorile sunt adevărate, va fi returnată ultima valoare.

```js run
alert(1 && 2 && 3); // 3, ultimul
```

````smart header="Prioritatea lui `&&`este mai mare față de OR`||`" Operatorul AND `&&`are prioritate mai mare față de operatorul OR`||`.

Codul `a && b || c && d` este același chiar dacă expresiile `&&` ar fi în paranteză: `(a && b) || (c && d)`.

`````

````warn header="Nu înlocui `if` cu `||` sau `&&`"
Uneori, oamenii folosesc operatorul AND `&&` ca o prescurtare de a scrie `if`.

=======
Când toate valorile sunt truthy, va fi returnată ultima valoare.

```js run
alert( 1 && 2 && 3 ); // 3, ultimul
```

````smart header="Precedence `&&` este mai mare decât OR `||`"
 Operatorul AND `&&` are precedence mai mare față de OR `||`.

Codul  `a && b || c && d`  este același chiar dacă expresiile `&&` ar fi în paranteză: `(a && b) || (c && d)`.
````

````warn header="Nu înlocui `if` cu `||` sau `&&`"
Uneori, oamenii folosesc operatorul AND `&&` ca o prescurtare de a scrie `if`.

>>>>>>> Stashed changes
De exemplu:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

Acțiunea din partea dreaptă a operatorului `&&` va fi executată doar dacă evaluarea va ajunge în acel punct. Doar dacă, if `(x > 0)` este adevărat.

Practic, avem o analogie pentru:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

Deși , varianta cu `&&` ar fi mai scurtă , `if`  este mult mai evident și mai ușor de citit. Așa că noi recomandăm să folosiți fiecare pentru scopul său `if` dacă vrem `if` și `&&` dacă dorim AND.
<<<<<<< Updated upstream
`````

## ! (NOT)

Operatorul boolean NOT este reprezentat de semnul exclamării `!`.
=======
````


## ! (NOT)

Operatorul boolean NOT este reprezentat de semnul exclamării  `!`.
>>>>>>> Stashed changes

Sintaxa este destul de simplă:

```js
result = !value;
```

Operatorul acceptă doar un singur argument și face următoarele:

1. Convertește operatorul în tipul: `true/false`.
2. Returnează valoarea inversă.

De exemplu:

```js run
alert(!true); // fals
alert(!0); // adevărat
```

Dublu NOT `!!` este folosit uneori pentru a converti o valoare în una de tip boolean:

```js run
alert(!!"non-empty string"); // adevărat
alert(!!null); // fals
```

Primul NOT convertește valoarea în tipul boolean și returnează valoarea inversă, iar cel de al doilea NOT o inversează din nou. La final, avem value-to-boolean conversion.

<<<<<<< Updated upstream
Există o metodă mai indirectă pentru a face același lucru-- a built-in `Boolean` function:
=======
xistă o metodă mai indirectă pentru a face același lucru-- a built-in `Boolean` function:
>>>>>>> Stashed changes

```js run
alert(Boolean("non-empty string")); // adevărat
alert(Boolean(null)); // fals
```

<<<<<<< Updated upstream
Prioritatea lui `!` este mai mare decât a celorlalți operatori logici, deci va fi întotdeauna executată prima, înainte de `&&` sau `||`.
=======
 Precedența lui NOT `!` este cea mai mare dintre toți operatorii logici, deci întotdeauna se va executa prima, înainte de  `&&` și `||`.
>>>>>>> Stashed changes
