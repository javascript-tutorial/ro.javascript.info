importance: 3

---

<<<<<<< HEAD
# Multiplicați proprietățile numerice cu 2

Creați o funcție `multiplyNumeric(obj)` care multiplică fiecare proprietate a `obj` cu `2`.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

For instance:

```js
// înainte de apelare
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// după apelare
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

Vă rugăm să remarcați că `multiplyNumeric` nu are nevoie să returneze ceva. Ar trebui să modifice obiectul pe loc.

P.S. Folosiți `typeof` pentru a verifica dacă este un număr.
