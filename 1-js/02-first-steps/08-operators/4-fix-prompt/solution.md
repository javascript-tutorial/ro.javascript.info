Motivul este că prompt returnează inputul utilizatorului ca și un șir.
Astfel variable au valorile `"1"` și `"2"` respectiv.

```js run
let a = "1"; // prompt("Primul număr?", 1);
let b = "2"; // prompt("Al doilea număr?", 2);

alert(a + b); // 12
```

Ce ar trebui noi să facem este să convertim șirurile în numere înainte de `+`. De exemplu, folosind `Number()` sau să le adăugam `+` în față.

De exemplu, chiar înainte de `prompt`:

```js run
let a = +prompt("Primul număr?", 1);
let b = +prompt("Al doilea număr?", 2);

alert(a + b); // 3
```

Sau în `alert`:

```js run
let a = prompt("Primul număr?", 1);
let b = prompt("Al doilea număr?", 2);

alert(+a + +b); // 3
```

Folosind atât `+` unar și binar în cel mai recent cod. Arată amuzant, nu-i așa?
