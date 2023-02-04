libs:
  - lodash

---

# Currying

[Currying](https://en.wikipedia.org/wiki/Currying) este o tehnică avansată de lucru cu funcții. Este utilizată nu numai în JavaScript, dar și în alte limbaje.

Currying este o transformare a funcțiilor care transpune o funcție apelabilă ca `f(a, b, c)` în apelabilă ca `f(a)(b)(c)`.

Currying nu apelează o funcție. Pur și simplu o transformă.

Să vedem mai întâi un exemplu, pentru a înțelege mai bine despre ce vorbim, și apoi aplicațiile practice.

Vom crea o funcție ajutătoare `curry(f)` care realizează currying pentru o funcție `f` cu două argumente. Cu alte cuvinte, `curry(f)` pentru `f(a, b)` cu două argumente îl traduce într-o funcție care se execută ca `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) face transformarea currying
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// utilizare
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

După cum puteți vedea, implementarea este directă: este vorba doar de două învelișuri.

- Rezultatul lui `curry(func)` este un înveliș `function(a)`.
- Atunci când este apelat ca `currySum(1)`, argumentul este salvat în mediul lexical și se returnează un nou înveliș `function(b)`.
- Apoi, acest înveliș este apelat cu `2` ca argument, iar apelul este transmis către `sum` original.

Implementările mai avansate de currying, cum ar fi [_.curry](https://lodash.com/docs#curry) din biblioteca lodash, returnează un înveliș care permite ca o funcție să fie apelată atât în mod normal, cât și parțial:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // folosind _.curry din biblioteca lodash

alert( curriedSum(1, 2) ); // 3, încă apelabilă în mod normal
alert( curriedSum(1)(2) ); // 3, apelată parțial
```

## Currying? Pentru ce?

Pentru a înțelege beneficiile, avem nevoie de un exemplu demn din viața reală.

De exemplu, avem funcția de logare `log(date, importance, message)` care formatează și produce informații. În proiectele reale astfel de funcții au multe caracteristici utile cum ar fi trimiterea de loguri prin rețea, aici vom folosi doar `alert`:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Haideți să o facem curry!

```js
log = _.curry(log);
```

După aceea `log` funcționează normal:

```js
log(new Date(), "DEBUG", "ceva debug"); // log(a, b, c)
```

...Dar funcționează și în forma curried:

```js
log(new Date())("DEBUG")("ceva debug"); // log(a)(b)(c)
```

Acum putem realiza cu ușurință o funcție de conveniență pentru logurile curente:

```js
// logNow va fi logul parțial cu primul argument fix
let logNow = log(new Date());

// folosiți-l
logNow("INFO", "mesaj"); // [HH:mm] INFO mesaj
```

Acum `logNow` este `log` cu primul argument fix, cu alte cuvinte "funcție parțial aplicată" sau "parțială" pe scurt.

Putem merge mai departe și să facem o funcție de conveniență pentru logurile curente de debug:

```js
let debugNow = logNow("DEBUG");

debugNow("mesaj"); // [HH:mm] DEBUG mesaj
```

Deci:
1. Nu am pierdut nimic după curry: `log` este încă apelabil în mod normal.
2. Putem genera cu ușurință funcții parțiale, cum ar fi pentru logurile de astăzi.

## Implementarea curry avansată

În cazul în care doriți să intrați în detalii, iată implementarea curry "avansată" pentru funcții cu argumente multiple pe care am putea-o folosi mai sus.

Este destul de scurtă:

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

Exemple de utilizare:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, încă apelabil în mod normal
alert( curriedSum(1)(2,3) ); // 6, curry de la primul argument
alert( curriedSum(1)(2)(3) ); // 6, currying complet
```

Noul `curry` poate părea complicat, dar este de fapt ușor de înțeles.

Rezultatul apelului `curry(func)` este învelișul `curried` care arată astfel:

```js
// func este funcția de transformat
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Când îl rulăm, există două ramuri de execuție `if`:

1. Dacă numărul de `args` transmis este același sau mai mare decât numărul de funcții originale din definiția sa (`func.length`) , atunci doar transmite apelul la aceasta folosind `func.apply`.
2. În caz contrar, obține o parțială: nu apelăm `func` deocamdată. În schimb, este returnat un alt înveliș, care va aplica din nou `curried` furnizând argumentele anterioare împreună cu cele noi.

Apoi, dacă îl apelăm, din nou, vom obține fie un nou parțial (dacă nu sunt suficiente argumente), fie, în final, rezultatul.

```smart header="Numai funcții cu lungime fixă"
Currying necesită ca funcția să aibă un număr fix de argumente.

O funcție care utilizează parametri rest, cum ar fi `f(...args)`, nu poate fi curryată în acest mod.
```

```smart header="Un pic mai mult decât currying"
Prin definiție, currying ar trebui să convertească `sum(a, b, c)` în `sum(a)(b)(c)`.

Dar majoritatea implementărilor de currying în JavaScript sunt avansate, așa cum este descris: ele de asemenea păstrează funcția apelabilă și în varianta cu mai multe argumente.
```

## Summary

*Currying* este o transformare care face `f(a,b,c)` apelabilă ca `f(a)(b)(c)`. De obicei, implementările JavaScript păstrează funcția apelabilă în mod normal și în același timp returnează funcția parțială dacă numărul de argumente nu este suficient.

Currying ne permite să obținem cu ușurință parțiale. După cum am văzut în exemplul de logare, după currying, funcția universală cu trei argumente `log(date, importance, message)` ne oferă parțiale când este apelată cu un singur argument (cum ar fi `log(date)`) sau cu două argumente (cum ar fi `log(date, importance)`).  
