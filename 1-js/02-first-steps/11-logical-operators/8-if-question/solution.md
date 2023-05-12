Răspuns: primul și al treilea vor fi afișate.

Detalii:

```js run
// Este executat.
// Rezultatul dintre -1 || 0 = -1, truthy
if (-1 || 0) alert( 'primul' );

// Nu este executat
// -1 && 0 = 0, falsy
if (-1 && 0) alert( 'al doilea' );

// Este executat
// Oparatorul && are o primoritate mai mare decât ||
// așadar -1 && 1 este exuctat mai întâi, dând lanțul următor:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'al treilea' );
```

