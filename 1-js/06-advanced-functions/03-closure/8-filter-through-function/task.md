importance: 5

---

# Filtrează printr-o funcție

Avem o metodă încorporată `arr.filter(f)` pentru matrici. Aceasta filtrează toate elementele prin intermediul funcției `f`. Dacă returnează `true`, atunci elementul respectiv este returnat în matricea rezultată.

Creați un set de filtre "gata de utilizare":

- `inBetween(a, b)` -- între `a` și `b` sau egal cu ele (inclusiv).
- `inArray([...])` -- în matricea dată.

Modul de utilizare trebuie să fie următorul:

- `arr.filter(inBetween(3,6))` -- selectează numai valorile cuprinse între 3 și 6.
- `arr.filter(inArray([1,2,3]))` -- selectează numai elementele care se potrivesc cu unul dintre membrii din `[1,2,3]`.

De exemplu:

```js
/* ... codul dvs. pentru inBetween și inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

