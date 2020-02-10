importance: 2

---

# Înlănțuirea

Există un obiect `ladder` (scară) care permite urcarea și coborârea:

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

În acest moment, dacă avem nevoie să facem mai multe apelări în ordine, le putem face astfel:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Modificați codul pentru `up`, `down` și `showStep` pentru a face apelările înlănțuibile, astfel:

```js
ladder.up().up().down().showStep(); // 1
```

Asemenea abordare este utilizată pe scară largă în bibliotecile JavaScript.
