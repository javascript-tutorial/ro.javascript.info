Răspunsul: prima și ultima alertă vor fi executate.

Detalii:

```js run
// Rulează.
// Rezultatul lui -1 || 0 = -1, adevărat
if (-1 || 0) alert("first");

// Nu rulează
// -1 && 0 = 0, fals
if (-1 && 0) alert("second");

// Execută
// Operatorul && are prioritate mai mare decât ||
// deci -1 && va fi executat primul, expresia va deveni:
// null || -1 && 1  ->  null || 1  ->  1
if (null || (-1 && 1)) alert("third");
```
