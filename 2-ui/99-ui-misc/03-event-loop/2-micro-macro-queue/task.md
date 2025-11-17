importance: 5

---

<<<<<<< HEAD
# Care va fi ieșirea acestui cod?
=======
# What will be the output of this code?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);
```
