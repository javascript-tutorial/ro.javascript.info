
# Obiectul  funcției, NFE

După cum știm deja, o funcție în JavaScript este o valoare.

Fiecare valoare în JavaScript are un tip. Ce tip are o funcție?

În JavaScript, funcțiile sunt obiecte.

Un mod bun de a ne imagina funcțiile este ca "obiecte de acțiune" apelabile. Putem nu doar să le apelăm, ci și să le tratăm ca pe niște obiecte: să adăugăm/eliminăm proprietăți, să le transmitem prin referință etc.


## Proprietatea "name"

Obiectele funcție conțin câteva proprietăți utilizabile.

De exemplu, numele unei funcții este accesibil sub forma proprietății "name":

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

Ceea ce este oarecum amuzant, logica de atribuire a numelui este inteligentă. De asemenea îi atribuie numele corect unei funcții chiar dacă aceasta este creată fără nume, și apoi este atribuită imediat:

```js run
let sayHi = function() {
  alert("Salut");
};

alert(sayHi.name); // sayHi (există un nume!)
```

De asemenea funcționează și în cazul în care atribuirea se face printr-o valoare implicită:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (funcționează!)
}

f();
```

În specificație, această trăsătură se numește "nume contextual". Dacă funcția nu oferă unul, atunci acesta este dedus din context într-o atribuire.

Metodele obiectelor au și ele nume:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Totuși nu există magie. Există cazuri în care nu există nicio modalitate de a afla numele corect. În acest caz, proprietatea name este goală, ca aici:

```js run
// funcție creată în interiorul unui array
let arr = [function() {}];

alert( arr[0].name ); // <șir gol>
// motorul nu are cum să stabilească numele corect, așa că nu există niciunul
```

În practică, însă, majoritatea funcțiilor au un nume.

## Proprietatea "length"

Există o altă proprietate încorporată "length" care returnează numărul de parametri ai funcției, de exemplu:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Aici putem vedea că parametrii rest nu sunt numărați.

Proprietatea `length` este uneori utilizată pentru [introspecție](https://en.wikipedia.org/wiki/Type_introspection) în funcțiile care operează pe alte funcții.

De exemplu, în codul de mai jos funcția `ask` acceptă o `question` pentru a întreba și un număr arbitrar de funcții `handler` pentru a fi apelate.

Odată ce un utilizator le oferă răspunsul, funcția apelează handlerii. Putem trece două tipuri de handlers:

- O funcție cu zero argumente, care este apelată doar atunci când utilizatorul dă un răspuns pozitiv.
- O funcție cu argumente, care este apelată în oricare caz și care returnează un răspuns.

Pentru a apela `handler` în mod corect, examinăm proprietatea `handler.length`.

Ideea este că avem o sintaxă handler simplă, fără argumente pentru cazurile pozitive (varianta cea mai frecventă), dar suntem capabili să suportăm și handlere universale:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// pentru răspuns pozitiv, ambii gestionari sunt apelați
// pentru răspuns negativ, doar al doilea
ask("Întrebare?", () => alert('Ai spus da'), result => alert(result));
```

Acesta este un caz particular al așa-numitului [polimorfism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) -- tratarea argumentelor diferit în funcție de tipul lor sau, în cazul nostru în funcție de `length`. Ideea are o utilizare în bibliotecile JavaScript.

## Proprietăți custom

De asemenea putem adăuga proprietăți proprii.

Aici adăugăm proprietatea `counter` pentru a urmări numărul total de apeluri:

```js run
function sayHi() {
  alert("Salut");

  *!*
  // să numărăm de câte ori se execută
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // valoare inițială

sayHi(); // Salut
sayHi(); // Salut

alert( `Apelat de ${sayHi.counter} ori` ); // Apelat de 2 ori
```

```warn header="O proprietate nu este o variabilă"
O proprietate atribuită unei funcții precum `sayHi.counter = 0`  *nu* definește o variabilă locală `counter` în interiorul ei. Cu alte cuvinte, o proprietate `counter` și o variabilă `let counter` sunt două lucruri fără legătură.

Putem trata o funcție ca pe un obiect, putem stoca proprietăți în ea, dar acest lucru nu are niciun efect asupra execuției sale. Variabilele nu sunt proprietăți ale funcțiilor și viceversa. Acestea sunt doar lumi paralele.
```

Proprietățile funcțiilor pot înlocui closures uneori. De exemplu, putem rescrie exemplul funcției counter din capitolul <info:closure> pentru a folosi o proprietate de funcție:

```js run
function makeCounter() {
  // în loc de:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

Acum `count` este stocat direct în funcție, nu în mediul său Lexical Environment.

Este mai bine sau mai rău decât utilizarea unui closure?

Principala diferență este că dacă valoarea lui `count` trăiește într-o variabilă exterioară, atunci codul extern nu o poate accesa. Doar funcțiile nested o pot modifica. Iar dacă este legată de o funcție, atunci un astfel de lucru este posibil:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Așadar alegerea implementării depinde de obiectivele noastre.

## Named Function Expression

Named Function Expression, or NFE, is a term for Function Expressions that have a name.

For instance, let's take an ordinary Function Expression:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

And add a name to it:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

Did we achieve anything here? What's the purpose of that additional `"func"` name?

First let's note, that we still have a Function Expression. Adding the name `"func"` after `function` did not make it a Function Declaration, because it is still created as a part of an assignment expression.

Adding such a name also did not break anything.

The function is still available as `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

There are two special things about the name `func`, that are the reasons for it:

1. It allows the function to reference itself internally.
2. It is not visible outside of the function.

For instance, the function `sayHi` below calls itself again with `"Guest"` if no `who` is provided:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // use func to re-call itself
*/!*
  }
};

sayHi(); // Hello, Guest

// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)
```

Why do we use `func`? Maybe just use `sayHi` for the nested call?


Actually, in most cases we can:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
```

That happens because the function takes `sayHi` from its outer lexical environment. There's no local `sayHi`, so the outer variable is used. And at the moment of the call that outer `sayHi` is `null`.

The optional name which we can put into the Function Expression is meant to solve exactly these kinds of problems.

Let's use it to fix our code:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Now all fine
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
```

Now it works, because the name `"func"` is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function.

The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", the way for the function to can call itself reliably.

```smart header="There's no such thing for Function Declaration"
The "internal name" feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an "internal" name.

Sometimes, when we need a reliable internal name, it's the reason to rewrite a Function Declaration to Named Function Expression form.
```

## Summary

Functions are objects.

Here we covered their properties:

- `name` -- the function name. Usually taken from the function definition, but if there's none, JavaScript tries to guess it from the context (e.g. an assignment).
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.


So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.
