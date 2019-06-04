Pentru a obține exact funcționalitatea instrucțiunii `switch`, `if` trebuie să folosească operatorul de egalitate strictă `'==='`.

Pentru șirurile date, merge și egalitatea simplă `'=='`.

```js no-beautify
if (browser == 'Edge') {
  alert("Folosiți Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'OK, suportăm și aceste browsere' );
} else {
  alert( 'Sperăm că această pagină arată bine!' );
}
```

Observație: expresia `browser == 'Chrome' || browser == 'Firefox' …` este împărțită pe mai multe linii pentru a îmbunătăți lizibilitatea.

Totuși, construcția care folosește `switch` este mai curată și mai descriptivă.
