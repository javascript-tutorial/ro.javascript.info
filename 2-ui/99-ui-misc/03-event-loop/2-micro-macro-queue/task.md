importance: 5

---

<<<<<<< HEAD
# Care va fi ieșirea acestui cod?
=======
# What will be the output of this code?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);
```
