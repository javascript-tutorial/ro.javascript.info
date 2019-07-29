# Instrucțiunea "switch"

O instrucțiune `switch` poate înlocui mai multe teste `if`.

Reprezintă un mod mai descriptiv de a compara o valoare cu mai multe variante.

## Sintaxă

Instrucțiunea `switch` are unul sau mai multe blocuri `case` și un bloc opțional `default`.

Ea arată în felul următor:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- Valoarea variabilei `x` este comparată prin egalitate strictă cu valoarea din primul `case` (adică, `value1`), apoi cu a doua valoare (`value2`) și așa mai departe.
- Dacă găsește egalitate într-unul din cazuri, `switch` începe să execute codul începând cu `case` corespunzător, până la cel mai apropiat `break` (sau până la sfârșitul instrucțiunii `switch`).
- Dacă niciun caz nu satisface egalitatea, codul din blocul `default` este executat, dacă acest bloc există.

## Un exemplu

Un exemplu de `switch` (codul executat este evidențiat):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Prea mic' );
    break;
*!*
  case 4:
    alert( 'Exact!' );
    break;
*/!*
  case 5:
    alert( 'Prea mare' );
    break;
  default:
    alert( "Nu știu astfel de valori" );
}
```

Aici, `switch` începe să compare `a` cu valoarea din primul `case`, adică `3`. Egalitatea nu este îndeplinită.

Urmează `4`. Acesta se potrivește, deci execuția începe de la `case 4` până la cel mai apropiat `break`.

**Dacă instrucțiunea `break` lipsește, execuția continuă cu următorul bloc `case` fără a mai face vreo verificare.**

Un exemplu fără `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Prea mic' );
*!*
  case 4:
    alert( 'Exact!' );
  case 5:
    alert( 'Prea mare' );
  default:
    alert( "Nu știu astfel de valori" );
*/!*
}
```

În exemplul de mai sus vom vedea execuția în secvență a trei `alert`:

```js
alert( 'Exact!' );
alert( 'Prea mare' );
alert( "Nu știu astfel de valori" );
```

````smart header="Orice expresie poate fi un argument pentru `switch/case`"
Atât `switch`, cât și `case` permit expresii arbitrare.

De exemplu:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("acesta merge, deoarece +a este 1, exact cât este și b+1");
    break;
*/!*

  default:
    alert("asta nu merge");
}
```
Aici, `+a` este evaluat la `1`, care este comparat cu `b + 1` în `case` și codul corespunzător este executat.
````

## Grupări de "case"

Mai multe instrucțiuni `case` care partajează același cod pot fi grupate.

De exemplu, dacă vrem să executăm același cod pentru `case 3` și `case 5`:

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('Corect!');
    break;

*!*
<<<<<<< HEAD
  case 3:                    // (*) două cazuri grupate
=======
  case 3: // (*) grouped two cases
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
  case 5:
    alert('Greșit!');
    alert("De ce nu urmezi un curs de matematică?");
    break;
*/!*

  default:
    alert('Acest rezultat e ciudat. Pe bune.');
}
```

Acum, atât `3` cât și `5` arată același mesaj.

Posibilitatea de a "grupa" cazuri este un efect secundar al modului în care funcționează `switch/case` fără `break`. Execuția blocului `case 3` începe de la linia marcată `(*)` și continuă în `case 5`, pentru că nu există niciun `break`.

## Tipul contează

Să accentuăm faptul că egalitatea este întotdeauna strictă. Valorile trebuie să fie de același tip pentru a avea o potrivire.

De exemplu, să considerăm codul:

```js run
let arg = prompt("Introduceți o valoare?");
switch (arg) {
  case '0':
  case '1':
    alert( 'Unu sau zero' );
    break;

  case '2':
    alert( 'Doi' );
    break;

  case 3:
    alert( 'Nu se execută niciodată!' );
    break;
  default:
    alert( 'Valoare necunoscută' );
}
```

1. Pentru `0`, `1`, primul `alert` este executat.
2. Pentru `2` se execută al doilea `alert`.
3. Dar pentru `3`, rezultatul instrucțiunii `prompt` este șirul `"3"`, care nu este strict egal `===` cu numărul `3`, deci am obținut cod mort pentru `case 3`! Blocul `default` va fi executat în acest caz.
