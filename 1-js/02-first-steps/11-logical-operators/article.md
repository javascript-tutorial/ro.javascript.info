# Operatori logici

În JavaScript există patru operatori logici: `||` (OR), `&&` (AND), `!` (NOT), `??` (Nullish Coalescing). Aici vorbim doar despre primii trei, operatorul `??` va fi acoperit în următorul articol.

Chiar dacă sunt denumiți "logici", aceștia pot fi folosiți pentru valori de orice tip, nu doar pentru cele de tip boolean. Rezultatul acestora putând fi de orice tip. 

Haideți să aflăm mai multe detalii.

## || (OR)

Simbolul pentru operatorul "OR" este reprezentat prin două linii verticale.

```js
result = a || b;
```
În programarea clasică, operatorul logic "OR" este folosit pentru a manipula doar valori de tip boolean. Dacă valoarea unuia dintre argumentele acestuia este `true`, rezultatul operației va fi `true`, în caz contrar rezultatul va fi `false`.

În JavaScript, acest operator este puțin mai complex, dar și mult mai eficient. Pentru început, haideți să vedem ce se întâmplă cu aceste valori de tip boolean. 

Pot fi posibile doar patru combinații.

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

După cum putem vedea, rezultat este mereu `true` cu excepția cazului în care ambii operanți au valoarea `false`.

Dacă un operant nu este de tip boolean, acesta este convertit automat pentru a putea fi evaluat.

De exemplu, numărul `1` este `true`, iar numărul `0` este `false`:

```js run
if (1 || 0) { // funcționează asemenea if( true || false )
  alert( 'truthy' );
}
```

De cele mai multe ori, semnul OR `||` este folosit într-un `if` statement pentru a testa dacă vreauna dintre condiții este `true`.

Spre exemplu:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'Biroul este închis.' );
}
```

Putem adăuga mai multe condiții:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'Biroul este închis.' ); // este weekend.
}
```

## OR "||" identifică prima valoare truthy [#or-finds-the-first-truthy-value]

Logica descrisă mai sus este oarecum una de bază. Haideți să discutăm despre calitățile "extra" din JavaScript.  

Algoritmul extins funcționează după cum urmează.

Sunt date mai multe valori ale lui OR.

```js
result = value1 || value2 || value3;
```

Operatorul OR `||` face următoarele lucruri:

- Evaluzează operanții de la stânga spre dreapta.
- Fiecare operant este convertit într-o valoare boolean. Dacă rezultatul este `true`, execuția este oprită și valoarea originală a acelui operant este returnată.
- Dacă toți operanții au fost evaluați (iar toți erau `false`), ultimul operant este returnat.

O valoare este returnată în forma ei originală, fără conversiune.

Cu alte cuvinte, într-un lanț de operatori logici OR `||` este returnată prima valoare truthy sau ultima dacă nicio valoare truthy nu este identificată.

Spre exemplu:

```js run
alert( 1 || 0 ); // 1 (1 este truthy)

alert( null || 1 ); // 1 (1 este prima valoare truthy)
alert( null || 0 || 1 ); // 1 (prima valoare truthy)

alert( undefined || null || 0 ); // 0 (toate valorile sunt falsy, ultima valoare este returnată)
```

Asta conduce la utilizări mai interesante față de cele clasice în care operatorul OR compară doar valori boolean.

1. **Obținerea primei valori truthy dintr-o listă de variabile sau expresii.**

    Spre exemplu, avem variabilele `firstName`, `lastName` și `nickName`, toate opționale (adică valoarea lor poate fi undefined sau falsy)

    Haideți să folosim operatorul OR `||` pentru a identifica variabila truthy și să folosim conținutul acesteia (sau `"Anonim"` în caz contrar):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonim"); // SuperCoder
    */!*
    ```

    Dacă toate variabilele ar fi fost falsy, ar fi fost folosit `"Anonim"`.

2. **Evaluarea de tip scurt circuit.**

    O altă caracteristică a operatorului OR `||` este așa numita evaluare de tip scurt circuit.

    Aceasta înseamnă că `||` își procesează argumentele până când prima valoare truthy este întâlnită, iar apoi acea valoare este returnată imediat, fără ca celălalt argument să mai fie luat în considerare.

    Importanța acestei caracteristici începe să devină evidentă în momentul în care unul dintre operanți nu conține doar o valoare, ci o expresie care aduce cu sine și un efect advers, cum ar fi atribuirea valorii unei variabile sau invocarea unei funcții. 

    Pentru exemplul de mai jos, doar al doilea mesaj este afișat:

    ```js run no-beautify
    *!*true*/!* || alert("Acest mesaj nu este printat!");
    *!*false*/!* || alert("Acest mesaj este printat!");
    ```

    În prima linie, operatorul OR `||` imediat ce întâlnește valoarea `true` oprește evaluarea, astfel încât metoda `alert` nu este executată. 

    Uneori, oamenii folosesc această funcție pentru a executa comenzi doar dacă condiția din partea stângă este falsy.
## && (ȘI)

Operatorul ȘI este reprezentat de două semne ampersand `&&`:

```js
result = a && b;
```

În programarea clasică, operatorul ȘI are ca rezultat `true` dacă ambii operanți sunt truthy și `false` în caz contrar:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Un exemplu cu `if`:

```js run
let hour = 12;
let minute = 30;
                 
if (hour == 12 && minute == 30) {
  alert( 'Este ora 12:30' );
}
```

La fel cum se întâmplă cu operatorul ORI, ȘI poate accepta ca operant orice valoare:

```js run
if (1 && 0) { // evaluat ca true && false
  alert( "nu va funcționa, din cauză că rezultatul este falsy" );
}
```

## ȘI "&&" identifică prima valoare falsy

Sunt date mai multe valori conectate prin operatorul logic ȘI:

```js
result = value1 && value2 && value3;
```

Operatorul ȘI `&&` face următoarele lucruri:

- Evaluează operanții de la stânga la dreapta.
- Convertește fiecare operant într-un boolean. Dacă rezultatul este `false`, procesul este oprit, iar valoarea originală a operantului este returnată.
- Dacă toți operanții au fost evaluați (și toți sunt truthy), ultimul operant este returnat.

Cu alte cuvinte, operatorul ȘI are ca rezultat prima valoare falsy sau ultima valoare dacă niciuna nu este falsy.

Regulile de mai sus sunt similare și pentru ORI. Diferența constă în faptul că ȘI are ca rezultat prima valoare *falsy* în timp ce ORI are ca rezultat prima valoare *truthy*.

Exemple:

```js run
// dacă primul operant este truthy,
// ȘI are ca rezultat cel de al doilea operant:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// dacă primul operant este falsy,
// acesta este rezultatul lui ȘI, iar cel de al doilea este ignorat
alert( null && 5 ); // null
alert( 0 && "orice s-ar întâmpla" ); // 0
```

De asemenea, pot fi folosite mai multe valori simultan. Observați cum prima valoare falsy este returnată:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Dacă toate valorile sunt truthy, ultima dintre ele este returnată:

```js run
alert( 1 && 2 && 3 ); // 3, ultima
```

````smart header="Prioritatea lui ȘI `&&` este mai mare decât cea a lui ORI `||`"
Prioritatea operatorului ȘI `&&` este mai mare față de ce a lui ORI `||`.

Astfel, codul `a && b || c && d` este în esență exact la fel cu folosirea operatorului `&&` între paranteze: `(a && b) || (c && d)`.
````

````warn header="Nu înlocuiți `if` cu `||` sau `&&`"
Uneori, oamenii folosesc operatorul ȘI `&&` pentru a scrie o formă mai scurtă de `if` statement.

De exemplu:

```js run
let x = 1;

(x > 0) && alert( 'Mai mare decât zero!' );
```

Metoda alert din partea dreaptă a lui `&&` ajugne să fie executată doar dacă evaluarea ajunge până la ea. Adică, doar dacă if `(x > 0)` este true.

Astfel echivalentul este:

```js run
let x = 1;

if (x > 0) alert( 'Mai mare decât zero!' );
```

Deși, varianta cu `&&` pare a fi mai scurtă, varianta cu `if` statement este mai evidentă și mai ușor de citit. Așa că, recomandarea noastră este ca fiecare construcție să fie folosită pentru propriul scop: folosim `if` dacă vreum un `if` statement și folosit `&&` dacă avem nevoie de operatorul ȘI.
````


## ! (NU)

Operatorul boolean NU este reprezentat printrun semn de exclamare.

Sintaxa este destul de simplă:

```js
result = !value;
```

Operatorul acceptă un singur argument și face umrătoarele lucruri:

1. Convertește operantul într-un boolean de tipul: `true/false`.
2. Returnează valoarea opusă.

Spre exemplu:

```js run
alert( !true ); // false
alert( !0 ); // true
```

Dublu NU `!!` poate fi folosit uneori pentru a converti o valoare într-un boolean.

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

Adică, primul NU convertește valoare într-un boolean și returnează valoarea opusă, iar cel de al doilea NU inversează valoarea din nou. În final, obținem o conversie de la o valoare la un boolean.

Există o metodă special concepută pentru acest lucru -- o funcție `Boolean` concepută expres pentru acesastă necesitate.

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

Prioritatea lui NU `!` este cea mai mare dintre toți operatorii logici, fiind executat mereu primul, înaintea lui `&&` sau `||`.