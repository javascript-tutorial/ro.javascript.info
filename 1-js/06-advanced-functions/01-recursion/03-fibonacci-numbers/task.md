importance: 5

---

# Numere Fibonacci

Secvența [numerelor Fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) are formula <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. Cu alte cuvinte, următorul număr este suma celor două numere precedente.

Primele două numere sunt `1`, apoi `2(1+1)`, apoi `3(1+2)`, `5(2+3)` și așa mai departe: `1, 1, 2, 3, 5, 8, 13, 21...`.

Numerele Fibonacci sunt legate de [Golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) și de multe fenomene naturale din jurul nostru.

Scrieți o funcție `fib(n)` care să returneze al `n-lea` număr Fibonacci.

Un exemplu de lucrare:

```js
function fib(n) { /* codul tău */ } }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. Funcția ar trebui să fie rapidă. Apelul la `fib(77)` nu ar trebui să dureze mai mult de o fracțiune de secundă.
