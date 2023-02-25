Prima soluție pe care am putea-o încerca aici este cea recursivă.

Numerele Fibonacci sunt recursive prin definiție:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // va fi extrem de lent!
```

...Dar pentru valori mari ale lui `n` este foarte lent. De exemplu, `fib(77)` poate bloca motorul pentru o perioadă de timp, consumând toate resursele CPU.

Asta pentru că funcția face prea multe subapelări. Aceleași valori sunt reevaluate din nou și din nou.

De exemplu, să vedem o bucată de calcule pentru `fib(5)`:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Aici putem vedea că valoarea lui `fib(3)` este necesară atât pentru `fib(5)` cât și pentru `fib(4)`. Deci `fib(3)` va fi apelat și evaluat de două ori în mod complet independent.

Iată arborele de recursivitate complet:

![fibonacci recursion tree](fibonacci-recursion-tree.svg)

Putem observa în mod clar că `fib(3)` este evaluat de două ori, iar `fib(2)` este evaluat de trei ori. Suma totală a calculelor crește mult mai repede decât `n`, devenind enormă chiar și pentru `n=77`.

Putem optimiza acest lucru prin memorarea valorilor deja evaluate: dacă o valoare de exemplu `fib(3)` este calculată o dată, atunci o putem reutiliza în calculele viitoare.

O altă variantă ar fi să renunțăm la recursivitate și să folosim un algoritm complet diferit bazat pe loop.

În loc să mergem de la `n` în jos la valori mai mici, putem face un loop care pornește de la `1` și `2`, apoi obține `fib(3)` ca sumă a acestora, apoi `fib(4)` ca sumă a două valori anterioare, apoi `fib(5)` și merge în sus și în sus, până când ajunge la valoarea necesară. La fiecare pas trebuie să ne amintim doar două valori anterioare.

Iată pașii noului algoritm în detaliu.

Începutul:

```js
// a = fib(1), b = fib(2), aceste valori sunt prin definiție 1
let a = 1, b = 1;

// obțineți c = fib(3) ca sumă a acestora
let c = a + b;

/* acum avem fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Acum dorim să obținem `fib(4) = fib(2) + fib(3)`.

Să schimbăm variabilele: `a,b` vor obține `fib(2),fib(3)`, iar `c` va obține suma lor:

```js no-beautify
a = b; // acum a = fib(2)
b = c; // acum b = fib(3)
c = a + b; // c = fib(4)

/* acum avem secvența:
   a  b  c
1, 1, 2, 3
*/
```

Următorul pas oferă un alt număr de secvență:

```js no-beautify
a = b; // acum a = fib(3)
b = c; // acum b = fib(4)
c = a + b; // c = fib(5)

/* acum secvența este (încă un număr):
      a  b  c
1, 1, 2, 3, 5
*/
```

...Și așa mai departe până când obținem valoarea necesară. Acest lucru este mult mai rapid decât recursivitatea și nu implică calcule duplicate.

Codul complet:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

Bucla începe cu `i=3`, deoarece prima și a doua valoare a secvenței sunt hard-coded în variabilele `a=1`, `b=1`.

Abordarea se numește [programare dinamică de jos în sus](https://en.wikipedia.org/wiki/Dynamic_programming).
