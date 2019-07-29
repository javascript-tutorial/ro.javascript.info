importance: 5

---

# Rescrieți instrucțiunea "switch" folosind "if"

Folosind `if..else`, scrieți codul care ar corespunde următorului `switch`:

```js
switch (browser) {
  case 'Edge':
<<<<<<< HEAD
    alert( "Folosiți Edge!" );
=======
    alert( "У вас браузер Edge!" );
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
<<<<<<< HEAD
    alert( 'OK, suportăm și aceste browsere' );
    break;

  default:
    alert( 'Sperăm că această pagină arată bine!' );
=======
    alert( 'Мы поддерживаем и эти браузеры' );
    break;

  default:
    alert( 'Надеемся, что эта страница выглядит хорошо!' );
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
}
```
