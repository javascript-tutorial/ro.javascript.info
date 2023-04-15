importance: 5

---

# Chei iterabile

Am dori să obținem o matrice de `map.keys()` într-o variabilă și apoi să aplicăm metode specifice matricei, e.g. `.push`.

Dar acest lucru nu funcționează:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Eroare: keys.push nu este o funcție
keys.push("more");
*/!*
```

De ce? Cum putem corecta codul să facem ca `keys.push` să funcționeze?
