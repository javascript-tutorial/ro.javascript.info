importance: 2

---

# Înlănțuirea

<<<<<<< HEAD
Există un obiect `ladder` (scară) care permite urcarea și coborârea:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // arată pasul curent
    alert( this.step );
  }
};
```

<<<<<<< HEAD
În acest moment, dacă avem nevoie să facem mai multe apelări în ordine, le putem face astfel:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Modificați codul pentru `up`, `down` și `showStep` pentru a face apelările înlănțuibile, astfel:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Asemenea abordare este utilizată pe scară largă în bibliotecile JavaScript.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
