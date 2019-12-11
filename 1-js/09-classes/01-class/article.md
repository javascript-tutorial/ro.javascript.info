
# Sintaxă de bază a claselor

```quote author="Wikipedia"
In programarea orientată obiect, o clasă este un code template pentru crearea de obiecte, pentru a furniza valori inițiale variabileleor membre ale clasei și de a implementa comportamentul acesteia(funcții membre și metode).
```

În practică, avem destul de des nevoia de a crea multe obiecte de același tip, precum useri, bunuri sau orice altceva.

Așa cum știm deja din capitolul <info:constructor-new>, `new function` ne poate ajuta cu asta.

În schimb in JavaScript de astăzi, există o metodă de constructie a claselor mult mai avansată, ce introduce noi caracteristici grozave ce sunt folositoare în programarea orientată obiect.

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
let user = new User("John");
user.sayHi();
```

Atunci când `new User("John")` este apelat:
1. Un nou obiect este creat.
2. `constructor` rulează cu argumentele primite și atribuie `this.name` acestuia.

...După acestea, putem apela metode ale obiectelor precum `user.sayHi()`.


```warn header="Fără virgule între metodele claselor"
O greșeala comună pentru dezvoltatorii începători este să folosească virgule între metodele clasei, ceea ce rezultă în erori de sintaxă.

Notația de aici nu trebuie să fie confundată cu object literals. În cadrul unei clase, nu sunt necesare virgule.
```

## Ce este o clasă?

Deci, ce exact este o `clasă`? Nu este o entitate cu totul nouă la nivel de limbaj, așa cum s-ar putea crede.

Haideți să dezvăluim magia ei și să vedem cu adevărat despre ce este o clasă. O să începem să înțelegem multe aspecte complexe ale acesteia.

În JavaScript, o clasă este un fel de funcție.

Uite, spre exemplu:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// dovadă: User este o funcție
*!*
alert(typeof User); // funcție
*/!*
```

Ce face constructorul `class User {...}` mai exact este:

1. Crează o funcție denumită `User`, ce devine rezultatul unei declarări a clasei. Codul funcției este preluat din metoda `constructor` (se presupune faptul că e goală dacă nu declarăm o astfel de metodă).
2. Conține metode ale clasei, precum `sayHi`, în `User.prototype`.

După acestea, pentru obiectele `new User`, când apelăm o metodă, aceasta este chemată din prototip, exact cum a fost descris în capitolul <info:function-prototype>. Astfel, obiectele au acces la metodele definite în clasă.

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

// Metodele se află în User.prototype, e.g:
alert(User.prototype.sayHi); // alert(this.name);

// sunt exact două metode în prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Nu doar sugar syntax

Câteodată oamenii spun că `class` este sugar syntax (sintaxă proiectată într-o manieră în care este mai ușor de citit, dar care nu introduce nimic nou), pentru că am putea să declarăm o clasă și fără sintaxa implicită, în felul următor:

```js run
// Rescrierea clasei User cu funcții pure

// 1. Crează o funcție constructor
function User(name) {
  this.name = name;
}

// orice funcție prototip are o proprietate constructor în mode implicit
// astfel că noi nu trebuie să o creăm.

// 2. Adaugă metoda la prototip
User.prototype.sayHi = function() {
  alert(this.name);
};

// Mod de folosire:
let user = new User("John");
user.sayHi();
```
Rezultatul definiției este aproape același. Deci, există întreadevăr motive pentru care `class` poate să fie considerat ca și sugar syntax pentru a definii un constructor împreună cu metodele prototipului.

Cu toate acestea, există diferențe importante.

1. În primul rând, o funcție creadtă de `class` este marcată de o proprietate internă specială `[[FunctionKind]]:"classConstructor"`. Atlfel, nu este în totalitate același lucru cu crearea manuală a acesteia

    Spre deosebire de o funcție simplă, constructorul unei clasei trebuie să fie apelat cu `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // funcție
    User(); // Eroare: Constructorul clasei User nu poate să fie invocat fără termenul 'new'
    ```

    De asemenea, o reprezentare a șirului de caractere a unui constructor de clasă în engine-ul JavaScript începe cu "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```

2. Metodele claselor sunt non-enumerabile.
    Definiția unei clase setează fanionul `enumerable` ca fiind `false` pentru toate metodele din `"prototype"`.

    Asta este foarte bine, pentru că daca am folosi `for..in` peste un obiect, nu am vrea toate metodele clasei acestuia.

3. Clasele folosesc întotdeauna `use strict`.
    Tot codul din interiorul constructorului clasei este în mod automat in stric mode.
    Tot codul din cadrul constructorului clasei este automatc in strict mode.

În plus, sintaxa `class` aduce mult mai multe caracteristici pe care o să le explorăm în curând.

## Expresia Clasei

Exact ca și funcțiile, clasele pot să fie definite în interiorul alte expresii, pot să fie trimise dintr-o parte în alta, returnare, alocate etc.

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

alert(MyClass); // eroare, numele MyClass nu este vizibil în afara clasei
```


Putem chiar să facem clasele dinamice "la cerere", în felul următor:

```js run
function makeClass(phrase) {
  // declară o clasă și o returnează
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Crează o nouă clasă
let User = makeClass("Salut");

new User().sayHi(); // Salut
```


## Getters/setters, other shorthands

Exact ca și literal objects, clasele pot include getteri/setter, generatori, proprietăți computed etc.

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

let user = new User("John");
alert(user.name); // John

user = new User(""); // Numele este prea scurt
```

Declararea clasei crează getteri și setter în `User.prototype`, exact așa:

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

Aici este un exemplu cu o proprietate computed folosită între paranteze `[...]`:

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

Pentru o metodă generator, similar, o precedăm cu `*`.

## Proprietățile clasei

```warn header="Browserele vechi pot avea nevoie de polyfill"
Proprietațile la nivel de clasă sunt o adiție recentă.
```

În exemplul de mai sus, `User` avea doar metode. Hai să adăugam o proprietate:

```js run
class User {
*!*
  name = "Anonim";
*/!*

  sayHi() {
    alert(`Salut, ${this.name}!`);
  }
}

new User().sayHi();
```

Proprietatea `name` nu este introdusă în `User.prototype`. În schimb, aceasta este creată de `new` înainte de apelarea constructorului, it's the property of the object itself.

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

`MyClass` este tehnic o funcție (cea pe care o furnizăm ca și `constructor`), în timp ce metodele, getteri și setteri sunt trecuți în `MyClass.prototype`.

În următoarele capitole o să învățăm mai multe despre clase, printre care o să învătăm despre moșternie și alte caracteristici ale acestora.
