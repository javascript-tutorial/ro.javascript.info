# Operatori logici

În JavaScript există patru operatori logici: `||` (ORI), `&&` (ȘI), `!` (NU), `??` (Nullish Coalescing). În acest articol vorbim doar despre primi trei, operatorul `??` va fi acoperit în următorul articol.

Chiar dacă sunt denumiți operatori „logici”, aceștia pot fi folosiți pentru valori de orice tip, nu doar pentru cele de tip boolean. Rezultatul acestora putând fi de orice tip. 

Haideți să aflăm mai multe detalii.

## || (ORI)

Simbolul pentru operatorul „ORI” este reprezentat prin două linii verticale.

```js
result = a || b;
```
În programarea clasică, operatorul logic „ORI” este folosit pentru a manipula doar valori de tip boolean. Dacă valoarea unuia dintre argumente este `true`, rezultatul operației va fi `true`, în caz contrar rezultatul va fi `false`.

În JavaScript, acest operator este puțin mai complex, dar mult mai eficient. Pentru început, haideți să vedem ce se întâmplă cu aceste valori de tip boolean. 

Pot fi posibile doar patru combinații logice.

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

După cum putem vedea, rezultat este mereu `true` cu excepția cazului în care ambii operanți au valoarea `false`.

Dacă un operant nu este de tip boolean, acesta este convertit automat pentru evaluare.

De exemplu, numărul `1` este tratat ca fiind `true`, iar numărul `0` este `false`:

```js run
if (1 || 0) { // funcționează asemenea if( true || false )
  alert( 'truthy' );
}
```

De cele mai multe ori, semnul ORI `||` este folosit într-un if statement pentru a testa dacă vreauna dintre condiții este `true`.

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

## ORI "||" identifică prima valoare truthy [#or-finds-the-first-truthy-value]

Logica descrisă mai sus este oarecum cea basic. Haideți să discutăm despre calitățile „extra” din JavaScript.  

Algoritmul extinds funcționează după cum urmează.

Sunt date mai multe valori ale lui ORI.

```js
result = value1 || value2 || value3;
```

Operatorul ORI `||` face următoarele lucruri:

- Evaluzează operanții de la stânga spre dreapta.
- Fiecare operant este convertit într-o valoare boolean. Dacă rezultatul este `true`, execuția este oprită și valoarea originală a acelui operant este returnată.
- Dacă toți operanții au fost evaluați (iar toți erau falși), ultimul operant este returnat.

O valoare este returnată în forma ei originală, fără conversiune.

Cu alte cuvinte, într-un lanț de operatori logici ORI `||` este returnată prima valoare truthy sau ultima dacă nicio valoare truthy nu este identificată.

Spre exemplu:

```js run
alert( 1 || 0 ); // 1 (1 este truthy)

alert( null || 1 ); // 1 (1 este prima valoare truthy)
alert( null || 0 || 1 ); // 1 (prima valoare truthy)

alert( undefined || null || 0 ); // 0 (toate valorile sunt falsy, ultima valoare este returnată)
```

Asta conduce la utilizări mai interesante față de cele calsice în care operatorul ORI compară doar valori pur booleene.

1. **Obținerea primei valori truthy dintr-o listă de variabile sau expresii.**

    Spre exemplu, avem variabilele `firstName`, `lastName` si `nickName`, toate opționale (adică valoarea lor poate fi undefined sau falsy)

    Haideți să folosim operatorul ORI `||` pentru a identifica variabila truthy și să folosim conținutul acesteia (sau `"Anonim"` în caz contrar):

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

    O altă caracteristică a operatorului ORI `||` este așa numita evaluare de tip scurt circuit.

    Aceasta înseamnă că `||` își procesează argumentele până când prima valoare truthy este întâlnită, iar apoi acea valoare este returnată imediat, fără ca celălalt argument să mai fie luat în considerare.

    Importanța acestei caracteristici începe să devină evidentă în momentul în care unul dintre operanți nu conține doar o valoare, ci o expresie care aduce cu sine și un efect advers, cum ar fi atribuirea valorii unei variabile sau invocarea unei funcții. 

    Pentru exemplul de mai jos, doar al doilea mesaj este printat:

    ```js run no-beautify
    *!*true*/!* || alert("Acest mesaj nu este printat!");
    *!*false*/!* || alert("Acest mesaj este printat!");
    ```

    În prima linie, operatorul ORI `||` imediat ce întâlnește valoarea `true` oprește evaluarea, astfel încât metoda `alert` nu este executată. 

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
  alert( 'The time is 12:30' );
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

Regulile de mai sus sunt similare și pentru ORI. Diferența constă în faputl că ȘI are ca rezultat prima valoare *falsy* în timp ce ORI are ca rezultat prima valoare *truthy*.

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

<!-- We can also pass several values in a row. See how the first falsy one is returned: -->
De asemenea, putem oferi mai multe valori în același timp. Observați cum prima valoare falsy este returnată:
<!-- Mai verifică puțin traducerea de mai sus -->

```js run
alert( 1 && 2 && null && 3 ); // null
```

When all values are truthy, the last value is returned:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
````

````warn header="Don't replace `if` with `||` or `&&`"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".

For instance:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.

So we basically have an analogue for:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want `if` and use `&&` if we want AND.
````


## ! (NOT)

The boolean NOT operator is represented with an exclamation sign `!`.

The syntax is pretty simple:

```js
result = !value;
```

The operator accepts a single argument and does the following:

1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.

For instance:

```js run
alert( !true ); // false
alert( !0 ); // true
```

A double NOT `!!` is sometimes used for converting a value to boolean type:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

There's a little more verbose way to do the same thing -- a built-in `Boolean` function:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
