# Promisiune: then versus catch

Sunt aceste fragmente de cod egale? Cu alte cuvinte, se comportă în același mod în orice circumstanțe, pentru orice funcție gestionar?

```js
promise.then(f1).catch(f2);
```

Versus:

```js
promise.then(f1, f2);
```
