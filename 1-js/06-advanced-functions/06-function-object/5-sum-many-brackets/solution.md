
1. Pentru ca totul să funcționeze *oricum*, rezultatul lui `sum` trebuie să fie o funcție.
2. Funcția respectivă trebuie să păstreze în memorie valoarea curentă între apeluri.
3. Conform sarcinii, funcția trebuie să devină număr atunci când este folosită în `==`. Funcțiile sunt obiecte, deci conversia are loc așa cum este descrisă în capitolul <info:object-toprimitive>, iar noi putem furniza propria noastră metodă care returnează numărul.

Acum codul:

```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Vă rugăm să rețineți că funcția `sum` funcționează de fapt o singură dată. Ea returnează funcția `f`.

Apoi, la fiecare apelare ulterioară, `f` adaugă parametrul său la suma `currentSum` și se returnează pe sine.

**Nu există recursivitate în ultima linie a funcției `f`.**

Iată cum arată recursivitatea:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- apel recursiv
}
```

Și în cazul nostru, returnăm doar funcția, fără să o apelăm:

```js
function f(b) {
  currentSum += b;
  return f; // <-- nu se apelează pe sine, se returnează pe sine
}
```

Acest `f`  va fi folosit în apelul următor, returnându-se din nou pe sine, de câte ori este nevoie. Apoi, atunci când este folosit ca număr sau șir --- `toString` returnează `currentSum`. De asemenea am putea folosi `Symbol.toPrimitive` sau `valueOf` aici pentru conversie.
