Folosind un operator de semn de întrebare `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Ți-au permis părinții?');
}
```

Folosind SAU `||` (cea mai scurtă variantă):

```js
function checkAge(age) {
  return (age > 18) || confirm('Ți-au permis părinții?');
}
```

Rețineți că parantezele din jurul `age > 18` nu sunt necesare aici. Ele există pentru o mai bună lizibilitate.
