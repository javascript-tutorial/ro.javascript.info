importance: 5

---

# Însumați toate numerele până la cel dat

Scrieți o funcție `sumTo(n)` care calculează suma numerelor `1 + 2 + ... + n`.

De exemplu:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Faceți 3 variante de soluție:

1. Folosind un for loop.
2. Folosind o recursiune, cauza `sumTo(n) = n + sumTo(n-1)` pentru `n > 1`.
3. Folosind formula de [progresie aritmetică](https://en.wikipedia.org/wiki/Arithmetic_progression).

Un exemplu de rezultat:

```js
function sumTo(n) { /*... codul tău ... */ }

alert( sumTo(100) ); // 5050
```

P.S. Care variantă de soluție este cea mai rapidă? Cea mai lentă? De ce?

P.P.S. Putem folosi recursivitatea pentru a număra `sumTo(100000)`?
