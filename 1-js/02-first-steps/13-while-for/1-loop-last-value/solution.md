Răspunsul: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Fiecare iterație descrește valoarea lui `i` cu `1`. Verificarea `while(i)` oprește iterația atunci când `i = 0`.

Așadar, pașii buclei formează următoarea secvență ("buclă desfășurată"):

```js
let i = 3;

alert(i--); // afișează 3, descrește valoarea lui i la 2

alert(i--) // afișează 2, descrește valoarea lui i la 1

alert(i--) // afișează 1, descrește valoarea lui i la 0

// gata, verificarea while(i) oprește bucla
```
