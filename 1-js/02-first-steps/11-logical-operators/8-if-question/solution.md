<<<<<<< Updated upstream
Răspunsul: prima și ultima alertă vor fi executate.
=======
Răspuns: prima și ultima alertă vor fi executate..
>>>>>>> Stashed changes

Detalii:

```js run
// Rulează.
<<<<<<< Updated upstream
// Rezultatul lui -1 || 0 = -1, adevărat
if (-1 || 0) alert("first");

// Nu rulează
// -1 && 0 = 0, fals
if (-1 && 0) alert("second");

// Execută
// Operatorul && are prioritate mai mare decât ||
// deci -1 && va fi executat primul, expresia va deveni:
=======
// Rezultatul lui -1 || 0 = -1, truthy
if (-1 || 0) alert( 'first' );

// Nu rulează
// -1 && 0 = 0, falsy
if (-1 && 0) alert( 'second' );

// Execută
// Operatorul && are precedence mai mare decât ||
// deci -1 && 1 se execută primul, ceea ce ne dă lanțul:
>>>>>>> Stashed changes
// null || -1 && 1  ->  null || 1  ->  1
if (null || (-1 && 1)) alert("third");
```
