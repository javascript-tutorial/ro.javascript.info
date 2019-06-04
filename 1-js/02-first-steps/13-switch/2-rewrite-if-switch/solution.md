Primele două verificări sunt transformate în două blocuri `case`. Al treilea test este împărțit în două cazuri:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Observație: instrucțiunea `break` de la sfârșit nu este necesară, dar putem să o adăugăm pentru a pregăti codul pentru viitor.

În viitor este posibil că vom dori să mai adăugăm încă un `case`, de exemplu `case 4`. Dacă uităm să adăugăm un `break` înaintea lui, la sfârșitul blocului `case 3`, vom obține o eroare. Deci avem un fel de auto-asigurare.
