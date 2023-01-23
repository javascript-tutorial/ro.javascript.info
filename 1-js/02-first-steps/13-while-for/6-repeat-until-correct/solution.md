```js
let num;

do {
  num = prompt("Introdu un număr mai mare ca 100?", 0);
} while (num <= 100 && num);
```

Bucla `do..while` se repetă până amândouă verificările sunt truthy:

1. Verificarea ca `num <= 100` -- adică, valoarea introdusă încă nu e mai mare ca `100`
2. Verificarea `&& num` e falsă când `num` e fie `null` fie un string gol. Atunci bucla `while` se oprește și ea.

P.S. Dacă `num` e `null` atunci `num <= 100` e `true`, așa că fără a 2-a verificarea bucla nu s-ar mai putea opri decât dacă utilizatorul apasă Anulează. Ambele verificări sunt obligatorii.
