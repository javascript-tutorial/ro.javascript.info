
# Sintaxă de bază a claselor

```quote author="Wikipedia"
In programarea orientată obiect, o clasă este un program extensibil code-template pentru crearea de obiecte, pentru a furniza valori inițiale variabilelor membre ale clasei și de a implementa comportamentul acesteia(funcții membre și metode).
```

În practică, avem destul de des nevoia de a crea multe obiecte de același tip, precum useri, bunuri sau orice altceva.

Așa cum știm deja din capitolul <info:constructor-new>, `new function` ne poate ajuta cu asta.

Dar in JavaScript-ul modern, există o metodă de constructie a claselor mai avansată, care introduce noi caracteristici grozave ce sunt folositoare în object-oriented programming.

## Sintaxa "class"

Sintaxa de bază este:
```js
class MyClass {
  // Metodele clasei
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Apoi folosim `new MyClass()` pentru a crea un obiect cu toate metodele listate în clasă.

Metoda `constructor()` este apelată automat de către `new`, astfel încât putem inițializa un obiect acolo.

De exemplu:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Mod de folosire:
let user = new User("Ion");
user.sayHi();
```

Atunci când `new User("Ion")` este apelat:
1. Un nou obiect este creat.
2. `constructor`-ul rulează cu argumentul primit și îi atribuie `this.name` acestuia.

...După aceasta, putem apela metode ale obiectelor precum `user.sayHi()`.


```warn header="Fără virgule între metodele claselor"
O greșeala comună pentru dezvoltatorii începători este să folosească virgule între metodele clasei, ceea ce rezultă în erori de sintaxă.

Notația de aici nu trebuie să fie confundată cu object literals. În cadrul unei clase, nu sunt necesare virgule.
```

## Ce este o clasă?

Deci, ce exact este o `clasă`? Nu este o entitate cu totul nouă la nivel de limbaj, așa cum s-ar putea crede.

Haideți să dezvăluim magia ei și să vedem cu adevărat ce este defapt o clasă. Asta ne va ajuta să-i înțelegem multe aspecte complexe.

În JavaScript, o clasă este un fel de funcție.

Aici, aruncă o privire:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// dovadă: User este o funcție
*!*
alert(typeof User); // function
*/!*
```

Ce face constructorul `class User {...}` cu adevărat este:

1. Crează o funcție denumită `User`, ce devine rezultatul unei declarări a clasei. Codul funcției este preluat din metoda `constructor` (se presupune faptul că e goală dacă nu declarăm o astfel de metodă).
2. Conține metode ale clasei, precum `sayHi`, în `User.prototype`.

După ce obiectul `new User` este creat, când îi apelăm metoda, aceasta este luată din prototip, exact cum a fost descris în capitolul <info:function-prototype>. Deci obiectul are acces la metodele din clasă.

Putem ilustra rezultatul declarației lui `class User` ca și:

![](class-user.svg)

Iată codul pentru a-l introspecta:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// clasa este o funcție
alert(typeof User); // funcție

// ...sau, mai precis, metoda constructor
alert(User === User.prototype.constructor); // true

// Metodele sunt în User.prototype, e.g:
alert(User.prototype.sayHi); // codul din metoda sayHi

// sunt exact două metode în prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Nu doar un syntactic sugar

Câteodată oamenii spun că `class` este un "syntactic sugar" (sintaxă care este concepută ca să facă lucrurile mai ușor de citit, dar care nu introduc nimic nou), pentru că am putea de fapt să declarăm același lucru și fără să folosim cuvântul cheie `class` deloc:

```js run
// Rescrierea clasei User cu funcții pure

// 1. Crează o funcție constructor
function User(name) {
  this.name = name;
}

// o funcție prototip deține proprietatea "constructor" în mod implicit,
// deci nu trebuie să o creăm.

// 2. Adaugă metoda la prototip
User.prototype.sayHi = function() {
  alert(this.name);
};

// Mod de folosire:
let user = new User("Ion");
user.sayHi();
```

Rezultatul acestei definiții este cam același. Așadar, există într-adevăr motive pentru care `class` poate fi considerat un syntactic sugar pentru a defini un constructor împreună cu metodele prototipului său.

Totuși, există diferențe importante.

1. În primul rând, o funcție creată de `class` este etichetată printr-o proprietate internă specială `[[IsClassConstructor]]: true`. Deci nu este în totalitate același lucru precum crearea manuală a acesteia.

    Limbajul verifică această proprietate într-o varietate de locuri. De exemplu, spre deosebire de o funcție obișnuită, aceasta trebuie să fie apelată cu `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

    De asemenea, o reprezentare a șirului de caractere a unui constructor de clasă în engine-ul JavaScript începe cu "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
    There are other differences, we'll see them soon.

2. Metodele claselor sunt non-enumerabile.
    Definiția unei clase setează fanionul `enumerable` ca fiind `false` pentru toate metodele din `"prototype"`.

    Asta este foarte bine, pentru că daca am folosi `for..in` peste un obiect, nu am vrea toate metodele clasei acestuia.

3. Clasele folosesc întotdeauna `use strict`.
    Tot codul din interiorul constructorului clasei este în mod automat in stric mode.
    Tot codul din cadrul constructorului clasei este automatc in strict mode.

În plus, sintaxa `class` aduce mult mai multe caracteristici pe care o să le explorăm în curând.

## Class Expression

La fel ca și funcțiile, clasele pot fi definite în interiorul altei expresii, transmise dintr-o parte în alta, returnate, atribuite, etc.

Aici este un exemplu de expresie a unei clase.

```js
let User = class {
  sayHi() {
    alert("Salut");
  }
};
```

Similar cu Named Function Expressions, expresile clasei pot avea și ele nume.

Daca o expresie a unei clase are un nume, aceasta este vizibil doar în interiorul clasei:

```js run
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // Numele MyClass este vizibil doar în interioriul clasei
  }
};

new User().sayHi(); // funcționează, afișează definiția lui MyClass

alert(MyClass); // error, MyClass name isn't visible outside of the class
```

Putem chiar să facem clasele dinamice "la cerere", în felul următor:

```js run
function makeClass(phrase) {
  // declară o clasă și o returnează
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Crează o nouă clasă
let User = makeClass("Salut");

new User().sayHi(); // Salut
```


## Getters/setters

La fel ca literal objects, clasele pot include getters/setters, computed properties etc.

Aici este un exemplu pentru `user.name` implementat folosind`get/set`:

```js run
class User {

  constructor(name) {
    // invocă setterul
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Numele este prea scurt");
      return;
    }
    this._name = value;
  }

}

let user = new User("Ion");
alert(user.name); // Ion

user = new User(""); // Numele este prea scurt
```
Tehnic, o astfel de declarație de clasă funcționează prin crearea de getters și setters în `User.prototype`.

## Computed names [...]

Iată un exemplu de un nume folosind parantezele prin computed method `[...]`:

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

Astfel de caracteristici sunt ușor de reținut, deoarece seamănă cu cele ale obiectelor literale.

## Câmpuri de clasă

```warn header="Este posibil ca browserele vechi să aibă nevoie de un polyfill"
Câmpurile de clasă sunt o adăugare recentă a limbajului.
```

Anterior, clasele noastre aveau doar metode.

"Class fields" este o sintaxă care permite adăugarea oricăror proprietăți.

De exemplu, să adăugăm proprietatea `name` la `class User`:

```js run
class User {
*!*
  name = "Ion";
*/!*

  sayHi() {
    alert(`Salut, ${this.name}!`);
  }
}

new User().sayHi(); // Salut, Ion!
```

Așadar, scrim doar " = " în declarație, și asta este tot.

Diferența importantă a câmpurilor de clasă este că acestea sunt setate pe obiecte individuale, nu pe `User.prototype`:

```js run
class User {
*!*
  nume = "Ion";
*/!*
}

let user = new User();
alert(user.name); // Ion
alert(User.prototype.name); // undefined
```

De asemenea, putem atribui valori folosind expresii mai complexe și apeluri de funcții:

```js run
class User {
*!*
  name = prompt("Nume, vă rog?", "Ion");
*/!*
}

let user = new User();
alert(user.name); // Ion
```


### Realizarea de metode bound cu class fields

După cum s-a demonstrat în capitolul <info:bind> funcțiile din JavaScript au un `this` dinamic. Acesta depinde de contextul apelului.

Astfel dacă o metodă obiect este transmisă și apelată în alt context, `this` nu va mai fi o referință la obiectul său.

De exemplu, acest cod va afișa `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("salut");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

Problema se numește "pierderea lui `this`".

Există două abordări pentru a o rezolva, așa cum se discută în capitolul <info:bind>:

1. Treceți o funcție wrapper, cum ar fi `setTimeout(() => button.click(), 1000)`.
2. Bind la metodă de obiect, e.g în constructor.

Câmpurile de clasă oferă o altă sintaxă, destul de elegantă:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("salut");

setTimeout(button.click, 1000); // salut
```

Câmpul de clasă `click = () => {...}` este creat pentru fiecare obiect în parte, există o funcție separată pentru fiecare obiect `Button`, cu `this` în interiorul ei făcând referire la acel obiect. Putem trece `button.click` oriunde, iar valoarea lui `this` va fi întotdeauna corectă.

Acest lucru este deosebit de util în mediul browser, pentru event listeners.

## Sumar

Sintaxa de bază a unei clase arată în felul următor:

```js
class MyClass {
  prop = value; // proprietate

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // metodă

  get something(...) {} // metodă getter 
  set something(...) {} // metodă setter

  [Symbol.iterator]() {} // metodă cu computed name (symbol aici)
  // ...
}
```

`MyClass` este tehnic o funcție (cea pe care o furnizăm ca `constructor`), în timp ce metodele, getters și setters sunt scrise în `MyClass.prototype`.

În următoarele capitole o să învățăm mai multe despre clase, printre care o să învătăm despre moșternie și alte caracteristici ale acestora.
