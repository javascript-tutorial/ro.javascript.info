Soluția este de a returna obiectul însuși la fiecare apelare.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().showStep().down().showStep(); // arată 1 apoi 0
```

De asemenea putem scrie câte o singură apelare pe linie. Pentru înlănțuirile lungi este mai lizibil:

```js
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
```
