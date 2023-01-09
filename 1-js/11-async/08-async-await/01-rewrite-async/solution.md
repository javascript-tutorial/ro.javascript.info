
Notele se află sub cod:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Note:

1. Funcția `loadJson` devine `async`.
2. Toate funcțiile `.then` din interior sunt înlocuite cu `await`.
3. Putem `returna response.json()` în loc să-l așteptăm, astfel:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Apoi codul exterior va trebui să `await` ca promisiunea să se rezolve. În cazul nostru, nu contează.
4. Eroarea aruncată de `loadJson` este gestionată de `.catch`. Nu putem folosi `await loadJson(…)` acolo, pentru că nu suntem într-o funcție `async`.
