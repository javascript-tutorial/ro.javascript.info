Pentru ca a doua paranteză să funcționeze, prima trebuie să returneze o funcție.

Astfel:

```js run
function sum(a) {

  return function(b) {
    return a + b; // preia "a" din mediul lexical exterior
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

