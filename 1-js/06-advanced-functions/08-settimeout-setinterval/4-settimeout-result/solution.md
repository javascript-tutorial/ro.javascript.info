
Orice `setTimeout` va rula numai după ce codul curent s-a terminat.

`i` va fi ultimul: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// să presupunem că timpul de execuție a acestei funcții este >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
