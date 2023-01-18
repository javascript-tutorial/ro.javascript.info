importance: 4

---

# Este "else" necesar?

Următoarea funcție returnează `true` dacă parametrul `age` este mai mare decât `18`.

În caz contrar, solicită o confirmare și returnează rezultatul:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Ți-au permis părinții?');
  }
*/!*
}
```

Funcția va funcționa diferit dacă `else` este eliminat?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Ți-au permis părinții?');
*/!*
}
```

Există vreo diferență în comportamentul acestor două variante?
