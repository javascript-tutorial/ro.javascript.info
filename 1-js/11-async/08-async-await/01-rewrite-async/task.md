
# Rescrieți folosind async/await

Rescrieți acest exemplu de cod din capitolul <info:promise-chaining> folosind `async/await` în loc de `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
```
