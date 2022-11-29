
# Re-rezolvați o promisiune?


Care este rezultatul codului de mai jos? 

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
