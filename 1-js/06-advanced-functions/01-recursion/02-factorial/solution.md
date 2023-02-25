Prin definiție, un factorial `n!` poate fi scris ca `n * (n-1)!`.

Cu alte cuvinte, rezultatul `factorial(n)` poate fi calculat ca `n` înmulțit cu rezultatul lui `factorial(n-1)`. Iar apelul pentru `n-1` poate coborâ recursiv tot mai jos, tot mai jos, până la `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

Baza recursivității este valoarea `1`. De asemenea putem face ca `0` să fie baza aici, nu contează prea mult, dar oferă încă un pas recursiv:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
