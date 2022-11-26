# Conversii de tip

Majoritatea timpului, operatorii si funcțiile convertesc automat valorile date catre tipul corect.

De exemplu, `alert` convertește automat orice valoare catre un șir pentru a o arăta. Operațiile matematice convertesc valorile catre numere.

Există și cazuri unde este nevoie sa convertim explicit o valoare către tipul așteptat. 

```smart header="Not talking about objects yet"
În acest captiol, nu vom acoperi obiectele. Pentru moment vom vorbi doar despre primitive.

Mai târziu, dupa ce vom învăța despre obiecte, în acest capitol <info:object-toprimitive> vom vedea cum se incadrează obiectele.
```

## Conversia unui Șir

Conversia unui șir se întâmplă când avem nevoie de forma de șir a unei valori.

De exemplu, `alert(value)` o face pentru a arăta valoarea.

Totodată, putem apela funcța `String(value)` pentru a converti o valoare către un șir

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // acum valoarea este un "adevărat" șir
alert(typeof value); // șir
*/!*
```

Conversia unui șir este destul de evidentă. Un `false` devine `"false"`, `null` devine `"null"`, etc.

## Conversia Numerică

Conversia numerică se petrece in funcții și expresii matematice automat.

De exemplu, când împărțirea `/` este aplicată non-numerelor:

```js run
alert( "6" / "2" ); // 3, șirurile sunt convertite către numere
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
| `string` | Spațiile goale de la ïnceput și sfârșit sunt eliminate. Daca șirul rămas este gol, rezultatul este `0`. Altfel numărul este "citit" din șir . O eroare transmite `NaN`. |

Exemple:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (eroare la citirea unui numar la "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Va rugăm sa notați faptul că `null` și `undefined` se comportă diferit aici: `null` devine 0, în timp ce `undefined` devine `NaN`.

Cei mai mulți operatori matematici execută o astfel de conversie, vom vedea aceasta in capitolul următor.

## Boolean Conversion
## Conversia Boolean

Conversia boolean este cea mai simplă.

Are loc in operațiile logice (mai tarziu vom cunoaște teste condiționale si alte lucruri similare) dar poate fi executată specific cu o apelare la `Boolean(value)`.

Regula conversiei:

- Valorile care sunt "goale" intuitiv, ca și `0`, un șir gol, `null`, `undefined`, and `NaN`, devin `false`.
- Alte valori devin `true`.

De exemplu:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("salut") ); // true
alert( Boolean("") ); // false
```

````warn header="Please note: the string with zero `\"0\"` is `true`"
Alte limbaje (anume PHP) trateaza `"0"` ca și `false`. Dar in JavaScript, un șir ne-gol este întotdeauna `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spații, de asemenea true (orice șir ne-gol este true)
```
````

## Summary
## Rezumat

The three most widely used type conversions are to string, to number, and to boolean.

**`String Conversion`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`Numeric Conversion`** -- Occurs in math operations. Can be performed with `Number(value)`.

The conversion follows the rules:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | The string is read "as is", whitespaces from both sides are ignored. An empty string becomes `0`. An error gives `NaN`. |

**`Boolean Conversion`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.

Follows the rules:

| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|any other value| `true` |


Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

- `undefined` is `NaN` as a number, not `0`.
- `"0"` and space-only strings like `"   "` are true as a boolean.

Objects aren't covered here. We'll return to them later in the chapter <info:object-toprimitive> that is devoted exclusively to objects after we learn more basic things about JavaScript.
