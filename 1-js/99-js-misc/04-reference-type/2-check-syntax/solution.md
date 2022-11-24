**Eroare**!

Incercați:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // eroare!
```

Mesajul de eroare din majoritatea browserelor nu ne oferă prea multe indicii despre ce a mers greșit.

**Eroarea apare deoarece simbolul ";" lipsește după `user = {...}`.**

Limbajul JavaScript nu adaugă automat un simbol ";" înainte de paranteză `(user.go)()`, deci citește codul ca:

```js no-beautify
let user = { go:... }(user.go)()
```

Apoi, putem vedea, de asemenea, că o astfel de expresie combinată este sintactic un apel al obiectului `{ go: ... }` ca funcție cu argumentul `(user.go)`. Și asta se întâmplă și pe aceeași linie cu `let user`, deci obiectul `user` nu a fost încă definit, de unde și eroarea.

Dacă introducem un simbol ";", totul este în regulă:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Vă rugăm să rețineți că parantezele din jurul `(user.go)` nu fac nimic aici. De obicei ele stabilesc ordinea operațiilor, dar aici punctul `.` funcționează primul oricum, deci nu au niciun efect. Doar chestia cu punctul și virgula contează.

