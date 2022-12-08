Răspunsul scurt este: **nu, nu sunt egale**:

Diferența este dacă se întâmplă o eroare în `f1`, atunci aceasta este gestionată de `.catch` aici:

```js run
promise
  .then(f1)
  .catch(f2);
```

...Dar nu aici:

```js run
promise
  .then(f1, f2);
```

Asta pentru că o eroare este transmisă în josul lanțului, iar în a doua bucată de cod nu există un lanț sub `f1`.

Cu alte cuvinte, `.then` transmite rezultatele/erorile către următorul `.then/catch`. Deci în primul exemplu, există un `catch` mai jos, iar în al doilea nu există, deci eroarea nu este gestionată.
