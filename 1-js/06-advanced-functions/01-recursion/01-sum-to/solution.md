Soluția folosind un loop:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

Soluția folosind recursivitatea:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

Soluția folosind formula: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. Firește, formula este cea mai rapidă soluție. Ea folosește doar 3 operații pentru orice număr `n`. Matematica ajută!

Varianta cu bucle este a doua în ceea ce privește viteza. Atât în varianta recursivă cât și în varianta loop adunăm aceleași numere. Dar recursivitatea implică apeluri nested și gestionare de execution stack. Și asta necesită resurse, deci este mai lent.

<<<<<<< HEAD
P.P.S. Unele motoare suportă optimizarea "tail call": dacă un apel recursiv este chiar ultimul din funcție, fără alte calcule efectuate, atunci funcția exterioară nu va trebui să reia execuția, astfel încât motorul nu trebuie să își amintească contextul de execuție. Asta elimină povara asupra memoriei. Dar dacă motorul JavaScript nu acceptă optimizarea tail call (majoritatea nu o fac), va apărea o eroare: maximum stack size exceeded, deoarece există de obicei o limitare a dimensiunii totale din stack.
=======
P.P.S. Some engines support the "tail call" optimization: if a recursive call is the very last one in the function, with no other calculations performed, then the outer function will not need to resume the execution, so the engine doesn't need to remember its execution context. That removes the burden on memory. But if the JavaScript engine does not support tail call optimization (most of them don't), there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
