importance: 4

---

# Rescrieți funcția folosind '?' sau '||'

Următoarea funcție returnează `true` dacă parametrul `age` este mai mare decât `18`.

În caz contrar aceasta cere o confirmare și îi returnează rezultatul.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Ți-au permis părinții?');
  }
}
```

Rescrie-l, pentru a efectua la fel, dar fără `if`, într-o singură linie.

Faceți două variante de `checkAge`:

1. Folosind un operator de semn de întrebare `?`
2. Folosind SAU `||`
