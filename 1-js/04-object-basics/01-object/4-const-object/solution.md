Bineînțeles, funcționează fără probleme.

Cuvântul `const` protejează numai modificarea variabilei în sine.

Cu alte cuvinte, `user` stochează o referință a obiectului. Și nu poate fi modificată. În schimb, conținutul obiectului se poate modifica.

```js run
const user = {
  name: "John"
};

*!*
// funcționează
user.name = "Pete";
*/!*

// eroare
user = 123;
```
