
Acest lucru se datorează faptului că `map.keys()` returnează un iterabil, dar nu o matrice.

Îl putem converti într-un array folosind `Array.from`:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
