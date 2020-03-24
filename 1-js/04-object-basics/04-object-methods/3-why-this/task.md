importance: 3

---

# Explicați valoarea variabilei "this"

<<<<<<< HEAD
În codul următor intenționăm să apelăm metoda `user.go()` de 4 ori la rând.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

Însă apelurile `(1)` și `(2)` funcționează diferit de `(3)` și `(4)`. De ce?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```
