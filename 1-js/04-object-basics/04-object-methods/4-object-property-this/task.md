importance: 5

---

# Folosirea "this" în obiect literal

Aici funcția `makeUser` returnează un obiect.

Care este rezultatul accesării proprietății `ref`? De ce?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Care este rezultatul?
```
