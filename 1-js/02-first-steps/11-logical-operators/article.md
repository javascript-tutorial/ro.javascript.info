# Operatori logici

În JavaScript există patru operatori logici: `||` (ORI), `&&` (ȘI), `!` (NU), `??` (Fuzionare nulă). În acest articol vorbim doar despre primi trei, operatorul `??` va fi acoperit în următorul articol.

Chiar dacă sunt denumiți operatori „logici”, aceștia pot fi folosiți pentru valori de orice tip, nu doar pentru cele de tip boolean. Rezultatul acetora putând fi de orice tip. 

Haideți să aflăm mai multe detalii.

## || (ORI)

Simbolul pentru operatorul „ORI” este reprezentat prin două linii verticale.

```js
result = a || b;
```
În programarea clasică, operatorul logic „ORI” este folosit pentru a manipula doar valori de tip boolean. Dacă valoarea unuia dintre argumente acesuita este „adevărat”, rezultatul acelei operații va fi „adevărat”, dacă nu rezultatul va fi „fals”.

În JavaScript, acest operator este puțin mai complicat, dar mult mai eficient. Pentru început, haideți să vedem ce se întâmplă cu aceste valori de tip boolean. 

Pot fi posibile doar patru combinații logice.

```js run
alert( true || true );   // adevărat
alert( false || true );  // adevărat
alert( true || false );  // adevărat
alert( false || false ); // fals
```

După cum putem vedea, rezultat este mereu „adevărat” cu excepția cazului în care ambii operanți au valoarea de „fals”.

Dacă un operant nu este de tip boolean, acesta este convertit automat într-unul pentru evaluare.

De exemplu, numărul „1” este tratat ca fiind „adevărat”, iar numărul „0” este „fals”:

```js run
if (1 || 0) { // funcționează asemenea lui if( adevărat || fals )
  alert( 'efectiv adevărat!' );
}
```

De cele mai multe ori, semnul ORI `||` este folositi într-un if statement pentru a testa dacă vreauna dintre condiții este adevărată.

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

## ORI "||" identifică prima valoare efectiv adevărată [#or-finds-the-first-truthy-value]

Logica descrisă mai sus este oarecum clasică. Haideți să discutăm despre calitățile „extra” din JavaScript.  

Algoritmul extinds funcționează după cum urmează.

Sunt date mai multe valori ale lui ORI.

```js
result = value1 || value2 || value3;
```

Operatorul ORI `||` face următoarele lucruri:

- Evaluzează operanții de la stânga spre dreapta.
- Fiecare operant este convertit într-o valoare de tip boolean. Dacă rezultatul este „adevărat”, execuția se oprește și valoarea originală a acelui operant este returnată.
- Dacă toți operanții au fost evaluați (iar toți erau falși), ultimul operant este returnat.

O valoare este returnată în forma ei originală, fără conversiune.

Cu alte cuvinte, într-un lanț de ORI `||` este returnată prima valoare efectiv adevărată sau ultima dacă nicio valoare efectiv adevărată nu este găsită.

Spre exemplu:

```js run
alert( 1 || 0 ); // 1 (1 este efectiv adevărat)

alert( null || 1 ); // 1 (1 este prima valoare efectiv adevărată)
alert( null || 0 || 1 ); // 1 (prima valoare efectiv adevărată)

alert( undefined || null || 0 ); // 0 (toate valorile sunt efectiv false, este returnată ultima valoare)
```

Asta conduce la o utilizate mai interesantă spre deosebire de un boolean clasic de tip ORI.

1. **Poate fi obținută prima valoare efectiv adevărată dintr-o listă de variabile sau expresii.**

    Spre exemplu, avem variabilele `firstName`, `lastName` si `nickName`, toate opționale (adică pot fi undefined sau pot avea valori efectiv false)

    Hai să folosim operatorul ORI `||` pentru a selecta variabila care conține date și să le facem să apară (sau `"Anonim"` dacă niciuna nu are nicio valoare):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonim"); // SuperCoder
    */!*
    ```

    <!-- If all variables were falsy, `"Anonymous"` would show up. -->
    Dacă toate variabilele ar fi efectiv false, ar apărea textul `"Anonim"`.

2. **Evaulare de tip scurt circuit**

    O altă caracteristică a operatorului ORI `||` este așa numita evaluare de tip scurt circuit.

    Aceasta înseamnă că `||` își procesează argumentele până când prima valoare efectiv adevărată este întâlnită, iar apoi acea valoare este returnată imediat, fără ca celălalt argument să mai fie luat în considera.

    Importanța acestei caracteristici începe să devina evidentă în momentul în care unul dintre operanți nu reprezintă doar o valoare, ci o expresie care aduce cu sine și un efect advers, cum ar fi atribuirea valorii unei variabile sau apelarea unei funcții. 

    Pentru exemplul de mai jos, doar al doilea mesaj este printat:

    ```js run no-beautify
    *!*true*/!* || alert("Acest mesaj nu este printat!");
    *!*false*/!* || alert("Acest mesaj este printat!");
    ```

    În prima linie, operatorul OR `||` imediat ce întâlnește valoarea true oprește evaluarea, astfel încât methoda alert nu este rulată. 

    Uneori, oeamni folosesc această funcție pentru a executa comenzi doar dacă condiția din partea stângă este efectiv falsă.
## && (ȘI)

Operatorul ȘI este reprezentat de două semne de tip ampersand `&&`:

```js
result = a && b;
```

<!-- Până aici trebuie înlocuit true, truthy, false, falsey. -->

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

La fel cum se întâmplă cu operatorul ORI, orice valoare poate fi acceptată ca fiind operantul lui ȘI:

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

<!-- In other words, AND returns the first falsy value or the last value if none were found. -->
Cu alte cuvinte, operatorul ȘI are ca rezultat prima valoare falsy sau ultima valoare dacă nicuna nu este găsită.
<!-- Mai verifică încă odată propoziția de mai sus. Aici am rămas -->

The rules above are similar to OR. The difference is that AND returns the first *falsy* value while OR returns the first *truthy* one.

Examples:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

We can also pass several values in a row. See how the first falsy one is returned:

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
