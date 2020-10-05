**Eroare**!

Incercați:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // eroare!
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Din mesajul de eroare furnizat de majoritatea browserelor nu reiese ce a mers prost.
=======
The error message in most browsers does not give us much of a clue about what went wrong.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md

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

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Rețineți că parantezele din jurul `(user.go)` nu fac nimic aici. De obicei setează ordinea operațiilor, dar aici punctul `.` are oricum precedență, deci nu are niciun efect. Singurul lucru care contează este simbolul ";".
=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md
