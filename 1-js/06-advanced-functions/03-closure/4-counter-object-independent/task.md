importance: 5

---

# Obiect contor

Aici se creează un obiect contor cu ajutorul funcției constructor.

Va funcționa? Ce va arăta?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

