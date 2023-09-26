Există mulți algoritmi pentru aceast exercițiu.

Hai să folosim o buclă imbricată (nested loop):

```js
Pentru fiecare i din interval {
  verifică dacă i are un divizor de la 1 la i
  dacă da => numărul nu este prim
  dacă nu => numărul este prim, afișează-l
}
```

Codul folosind o etichetă:

```js run
let n = 10;

următorulNrPrim:
for (let i = 2; i <= n; i++) { // pentru fiecare i...

  for (let j = 2; j < i; j++) { // caută un divizor..
    if (i % j == 0) continue următorulNrPrim; // nu e prim, treci la următorul i
  }

  alert( i ); // e prim
}
```

Aici există foarte multe oportunități de optimizare. De exemplu, am putea căuta divizorii de la `2` la radical din `i`. În orice caz, dacă vrem să fim extrem de eficienți pentru intervale mari, trebuie să schimbăm abordarea și să ne bazăm pe matematică avansată și algoritmi complecși precum [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve), etc.
