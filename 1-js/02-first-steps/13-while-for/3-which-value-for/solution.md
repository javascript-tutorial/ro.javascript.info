**Răspunsul: de la 0 la 4 în ambele cazuri.**

```js
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Asta se poate deduce ușor din algoritmul lui `for`:

1. Execută o dată `i = 0` înainte a orice altceva (inițializator).
2. Verifică condiția `i < 5`
3. Dacă e `true` -- rulează corpul buclei `alert(i)`, și apoi `i++`

Incrementarea `i++` e separată de verificarea condiției (2). Aceea e pur și simplu altă bucată de cod.

Valoarea returnată după incrementare nu e folosită aici, așadar nu este nici-o diferență între `i++` și `++i`.
