
# Întârzie cu o promisiune

Funcția încorporată `setTimeout` utilizează callback-uri. Creați o alternativă bazată pe promisiuni.

Funcția `delay(ms)` ar trebui să returneze o promisiune. Această promisiune ar trebui să se rezolve după `ms` milisecunde, astfel încât să putem adăuga `.then` la ea, astfel:

```js
function delay(ms) {
  // codul tău
}

delay(3000).then(() => alert('rulează după 3 secunde'));
```
