```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('rulează după 3 secunde'));
```

Vă rugăm să rețineți că în această sarcină `resolve` este apelat fără argumente. Nu returnăm nicio valoare din `delay`, ci doar asigurăm întârzierea.
