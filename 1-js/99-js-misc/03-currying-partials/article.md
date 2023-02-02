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

După cum puteți vedea, implementarea este directă: este vorba doar de două wrappere.

- Rezultatul lui `curry(func)` este un wrapper `function(a)`.
- Atunci când este apelat ca `currySum(1)`, argumentul este salvat în mediul lexical și se returnează un nou wrapper `function(b)`.
- Apoi, acest wrapper este apelat cu `2` ca argument, iar apelul este transmis către `sum` original.

Implementările mai avansate de currying, cum ar fi [_.curry](https://lodash.com/docs#curry) din biblioteca lodash, returnează un wrapper care permite ca o funcție să fie apelată atât în mod normal, cât și parțial:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // folosind _.curry din biblioteca lodash

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially
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

## Advanced curry implementation

In case you'd like to get in to the details, here's the "advanced" curry implementation for multi-argument functions that we could use above.

It's pretty short:

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

Usage examples:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

The new `curry` may look complicated, but it's actually easy to understand.

The result of `curry(func)` call is the wrapper `curried` that looks like this:

```js
// func is the function to transform
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

When we run it, there are two `if` execution branches:

1. If passed `args` count is the same or more than the original function has in its definition (`func.length`) , then just pass the call to it using `func.apply`. 
2. Otherwise, get a partial: we don't call `func` just yet. Instead, another wrapper is returned, that will re-apply `curried` providing previous arguments together with the new ones. 

Then, if we call it, again, we'll get either a new partial (if not enough arguments) or, finally, the result.

```smart header="Fixed-length functions only"
The currying requires the function to have a fixed number of arguments.

A function that uses rest parameters, such as `f(...args)`, can't be curried this way.
```

```smart header="A little more than currying"
By definition, currying should convert `sum(a, b, c)` into `sum(a)(b)(c)`.

But most implementations of currying in JavaScript are advanced, as described: they also keep the function callable in the multi-argument variant.
```

## Summary

*Currying* is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. JavaScript implementations usually both keep the function callable normally and return the partial if the arguments count is not enough.

Currying allows us to easily get partials. As we've seen in the logging example, after currying the three argument universal function `log(date, importance, message)` gives us partials when called with one argument (like `log(date)`) or two arguments (like `log(date, importance)`).  
