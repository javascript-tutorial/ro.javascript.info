importance: 5

---

<<<<<<< HEAD
# Care va fi ieșirea acestui cod?
=======
# What will be the output of this code?
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);
```
