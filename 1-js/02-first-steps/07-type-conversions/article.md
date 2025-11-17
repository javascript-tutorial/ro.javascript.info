# Conversii de tip

Majoritatea timpului, operatorii si funcțiile convertesc automat valorile date către tipul corect.

De exemplu, `alert` convertește automat orice valoare către un șir pentru a o arăta. Operațiile matematice convertesc valorile în numere.

De asemenea există și cazuri unde este nevoie să convertim explicit o valoare către tipul așteptat. 

<<<<<<< HEAD
```smart header="Nu vorbim despre obiecte încă"
În acest captiol, nu vom acoperi obiectele. Pentru moment vom vorbi doar despre primitive.
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now, we'll just be talking about primitives.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Mai târziu, dupa ce vom învăța despre obiecte, în acest capitol <info:object-toprimitive> vom vedea cum se incadrează obiectele.
```

## Conversia unui Șir

Conversia unui șir se întâmplă când avem nevoie de forma de șir a unei valori.

De exemplu, `alert(value)` o face pentru a arăta valoarea.

Totodată putem apela funcția `String(value)` pentru a converti o valoare într-un șir

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // acum valoarea este un șir(string?): "adevărat"
alert(typeof value); // șir
*/!*
```

Conversia unui șir este în mare parte evidentă. Un `false` devine `"false"`, `null` devine `"null"`, etc.

## Conversia Numerică

<<<<<<< HEAD
Conversia numerică se petrece în funcții și expresii matematice automat.
=======
Numeric conversion in mathematical functions and expressions happens automatically.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

De exemplu, când împărțirea `/` este aplicată non-numerelor:

```js run
alert( "6" / "2" ); // 3, șirurile sunt convertite în numere
```

Putem folosi funcția `Number(value)` pentru a converti explicit o `value` către un număr.

```js run
let str = "123";
alert(typeof str); // șir

let num = Number(str); // devine un număr 123

alert(typeof num); // număr
```

Conversia explicită de obicei este cerută când citim o valoarea dintr-o sursă bazată pe un șir ca și un formular text dar așteaptă un număr să fie inclus.

Dacă șirul nu este un număr valid, rezultatul acestei conversii este `NaN`. De exemplu:

```js run
let age = Number("un șir arbitrar in locul unui număr");

alert(age); // NaN, conversie eșuată
```

Regulile conversiei numerice:

| Valoare |  Devine... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
<<<<<<< HEAD
| `string` | Spațiile goale de la ïnceput și sfârșit sunt eliminate. Dacă șirul rămas este gol, rezultatul este `0`. Altfel numărul este "citit" din șir. O eroare transmite `NaN`. |
=======
| `string` | Whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Exemple:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (eroare la citirea unui număr la "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Va rugăm să notați faptul că `null` și `undefined` se comportă diferit aici: `null` devine 0, în timp ce `undefined` devine `NaN`.

Cei mai mulți operatori matematici execută o astfel de conversie, vom vedea aceasta în capitolul următor.

## Boolean Conversion
## Conversia Boolean

Conversia boolean este cea mai simplă.

Are loc în operațiile logice (mai târziu vom întâlni teste condiționale și alte lucruri similare) dar poate de asemenea fi executată specific cu o apelare la `Boolean(value)`.

Regula conversiei:

- Valorile care sunt "goale" intuitiv, ca și `0`, un șir gol, `null`, `undefined`, și `NaN`, devin `false`.
- Alte valori devin `true`.

De exemplu:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("salut") ); // true
alert( Boolean("") ); // false
```

````warn header="Please note: the string with zero `\"0\"` is `true`"
Alte limbaje (anume PHP) tratează `"0"` ca și `false`. Dar în JavaScript, un șir ne-gol este întotdeauna `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spații, de asemenea true (orice șir ne-gol este true)
```
````

## Rezumat

Cele mai des folosite tipuri de conversii sunt la șir, la numere, și la boolean

**`Conversia Șirului`** -- Apare când afișăm ceva. Poate fi executată cu `String(value)`. Conversia la șir este de obicei destul de evidentă pentru valori primitive.

**`Conversia Numerică`** -- Apare în operațiile matematice. Poate fi executată cu `Number(value)`.

Conversia urmează regulile:

| Valoare |  Devine... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
<<<<<<< HEAD
| `string` | Șirul este citit "așa cum este", spațiile goale din ambele părți sunt ignorate. Un șir gol devine `0`. O eroare transmite `NaN`. |
=======
| `string` | The string is read "as is", whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from both sides are ignored. An empty string becomes `0`. An error gives `NaN`. |
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

**`Conversia Boolean`** -- Apare în operațiile logice. Poate fi executată cu `Boolean(value)`.

Urmează regulile:

| Valoare |  Devine... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|orice altă valoare| `true` |


Majoritatea acestor reguli sunt ușor de înțeles și memorat. Excepțiile notabile unde oamenii fac greșeli de obicei sunt:

- `undefined` este `NaN` ca și număr, nu `0`.
- `"0"` și șirurile mono-spațiale ca și `"   "` sunt adevărate ca și boolean.

Obiectele nu sunt acoperite aici. Ne vom întoarce la ele mai târziu în capitolul <info:object-toprimitive> ce este devotat exclusiv obiectelor după ce învățăm mai multe lucruri elementare despre JavaScript.

