**Eroare**!

Incercați:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // eroare!
```

Din mesajul de eroare furnizat de majoritatea browserelor nu reiese ce a mers prost.

**Eroarea apare deoarece semicolonul ";" lipsește după `user = {...}`.**

Limbajul JavaScript nu adaugă automat un semicolon înainte de paranteză `(user.go)()`, deci citește codul ca:

```js no-beautify
let user = { go:... }(user.go)()
```

Apoi, putem vedea, de asemenea, că o astfel de expresie combinată este sintactic un apel al obiectului `{ go: ... }` ca funcție cu argumentul `(user.go)`. Și asta se întâmplă și pe aceeași linie cu `let user`, deci obiectul `user` nu a fost încă definit, de unde și eroarea.

Dacă introducem un semicolon, totul este în regulă:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Rețineți că parantezele din jurul `(user.go)` nu fac nimic aici. De obicei setează ordinea operațiilor, dar aici punctul `.` are oricum precedență, deci nu are niciun efect. Singurul lucru care contează este semicolonul.
