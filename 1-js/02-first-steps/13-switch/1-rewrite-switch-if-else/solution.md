Pentru a obține exact funcționalitatea instrucțiunii `switch`, `if` trebuie să folosească operatorul de egalitate strictă `'==='`.

Pentru șirurile date, merge și egalitatea simplă `'=='`.

```js no-beautify
<<<<<<< HEAD
if (browser == 'Edge') {
  alert("Folosiți Edge!");
=======
if(browser == 'Edge') {
  alert("У вас браузер Edge!");
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
<<<<<<< HEAD
  alert( 'OK, suportăm și aceste browsere' );
} else {
  alert( 'Sperăm că această pagină arată bine!' );
=======
  alert( 'Мы поддерживаем и эти браузерыo' );
} else {
  alert( 'Надеемся, что эта страница выглядит хорошо!' );
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
}
```

Observație: expresia `browser == 'Chrome' || browser == 'Firefox' …` este împărțită pe mai multe linii pentru a îmbunătăți lizibilitatea.

Totuși, construcția care folosește `switch` este mai curată și mai descriptivă.
