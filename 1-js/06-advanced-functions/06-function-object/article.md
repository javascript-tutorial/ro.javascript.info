
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

Named Function Expression, sau NFE, este un termen pentru Function Expressions care au un nume.

De exemplu, să luăm o Function Expression obișnuită:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

Și adăugați-i un nume:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Bună ziua, ${who}`);
};
```

Am realizat ceva aici? Care este scopul acelui nume suplimentar `"func"`?

În primul rând, să notăm că avem încă o Function Expression. Adăugarea numelui `"func"` după `function` nu a făcut-o Function Declaration, deoarece aceasta este încă creată ca parte a unei expresii de atribuire.

De asemenea adăugarea unui astfel de nume nu a stricat nimic.

Funcția este în continuare disponibilă ca `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Bună ziua, ${who}`);
};

sayHi("John"); // Bună ziua, John
```

Există două lucruri speciale în legătură cu numele `func`, care sunt motivele pentru acesta:

1. Acesta permite funcției să facă referire la ea însăși în mod intern.
2. Nu este vizibil în afara funcției.

De exemplu, funcția `sayHi` de mai jos se apelează din nou pe sine cu `"Guest"` dacă nu este furnizat `who`:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Bună ziua, ${who}`);
  } else {
*!*
    func("Guest"); // folosește func pentru a se re-apela pe sine însăși
*/!*
  }
};

sayHi(); // Bună ziua, Guest

// Dar acest lucru nu va funcționa:
func(); // Error, func is not defined (nu este vizibil în afara funcției)
```

De ce folosim `func`? Poate doar să folosim `sayHi` pentru apelul nested?


De fapt, în majoritatea cazurilor putem:

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

Problema cu acel cod este că `sayHi` se poate schimba în codul exterior. Dacă în schimb funcția este atribuită unei alte variabile, codul va începe să dea erori:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Bună ziua, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Eroare, apelul nested sayHi nu mai funcționează!
```

Asta se întâmplă deoarece funcția preia `sayHi` din mediul său lexical extern. Nu există un `sayHi` local, așa că se folosește variabila exterioară. Iar în momentul apelului, acea `sayHi` exterioară este `null`.

Numele opțional pe care îl putem pune în Function Expression este menit să rezolve exact acest tip de probleme.

Să-l folosim pentru a ne corecta codul:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Bună ziua, ${who}`);
  } else {
*!*
    func("Guest"); // Acum totul este în regulă
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Bună ziua, Guest (apelul nested funcționează)
```

Acum funcționează, deoarece numele `"func"` este local pentru funcții. Nu este preluat din exterior (și nu este vizibil acolo). Specificația garantează că va face întotdeauna referire la funcția curentă.

Codul exterior are în continuare variabila `sayHi` sau `welcome`. Iar `func` este un "nume de funcție intern", modul în care funcția se poate apela singură în mod fiabil.

```smart header="Nu există așa ceva pentru Function Declaration"
Caracteristica "nume intern" descrisă aici este disponibilă doar pentru Function Expressions, nu și pentru Function Declarations. Pentru Function Declarations, nu există o sintaxă pentru adăugarea unui nume "intern".

Uneori, atunci când avem nevoie de un nume intern fiabil, acesta este motivul pentru a rescrie o Function Declaration sub forma unei Named Function Expression.
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
