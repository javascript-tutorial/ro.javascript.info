importance: 4

---

# Calculează factorialul

[Factorialul](https://en.wikipedia.org/wiki/Factorial) unui număr natural este un număr înmulțit cu `"numărul minus unu"`, apoi cu `"numărul minus doi"`, și așa mai departe până la `1`. Factorialul lui `n` se notează cu `n!`.

Putem scrie o definiție a factorialului în felul următor:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Valori ale factorialelor pentru diferite `n`:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Sarcina este de a scrie o funcție `factorial(n)` care să calculeze `n!` folosind apeluri recursive.

```js
alert( factorial(5) ); // 120
```

P.S. Indiciu: `n!` poate fi scris ca `n * (n-1)!` De exemplu: `3! = 3*2! = 3*2*1! = 6`
