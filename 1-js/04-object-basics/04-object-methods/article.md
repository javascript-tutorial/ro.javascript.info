# Metode obiect, "this"

Obiectele sunt de obicei create pentru a reprezenta entități din lumea reală, cum ar fi utilizatorii, comenzile și așa mai departe:

```js
let user = {
  name: "John",
  age: 30
};
```

Iar, în lumea reală, un utilizator poate *acționa*: poate selecta ceva din coșul de cumpărături, se poate autentifica, deconecta etc.

Acțiunile sunt reprezentate în JavaScript prin funcții în proprietăți.

## Exemple de metodă

Pentru început, hai să-l învățăm pe `user` să spună salut:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Salut!");
};
*/!*

user.sayHi(); // Salut!
```

Aici tocmai am folosit o Function Expression pentru a crea o funcție și a o atribui proprietății `user.sayHi` a obiectului.

Apoi o putem apela cu `user.sayHi()`. Utilizatorul acum poate vorbi!

O funcție care este proprietatea unui obiect se numește *metodă*.

Deci, aici avem o metodă `sayHi` a obiectului `user`.

Bineînțeles, am putea folosi o funcție predeclarată ca metodă, astfel:

```js run
let user = {
  // ...
};

*!*
// first, declare
function sayHi() {
  alert("Salut!");
};

// then add as a method
user.sayHi = sayHi;
*/!*

user.sayHi(); // Salut!
```

```smart header="Programare orientată pe obiecte"
Când scriem codul nostru folosind obiecte pentru a reprezenta entități, asta se numește [programare orientată pe obiecte](https://ro.wikipedia.org/wiki/Programare_orientat%C4%83_pe_obiecte), pe scurt: "OOP".

OOP este un lucru mare, o știință interesantă în sine. Cum să alegi entitățile potrivite? Cum să organizezi interacțiunea dintre ele? Aceasta este arhitectură, și există cărți interesante pe acea temă, precum "Design Patterns: Elements of Reusable Object-Oriented Software" de E.Gamma, R.Helm, R.Johnson, J.Vissides sau "Object-Oriented Analysis and Design with Applications" de G.Booch, și altele.
```
### Metoda scurtă

Există o sintaxă mai scurtă pentru metode într-un obiect literal:

```js
// aceste obiecte realizează același lucru

user = {
  sayHi: function() {
    alert("Salut");
  }
};

// Metoda scurtă arată mai bine, nu-i așa?
user = {
*!*
  sayHi() { // la fel ca "sayHi: function(){...}"
*/!*
    alert("Salut");
  }
};
```

După cum s-a demonstrat, putem omite `"function"` și scriem doar `sayHi()`.

În realitate, notațiile nu sunt complet identice. Există diferențe subtile legate de moștenirea obiectelor (care vor fi acoperite ulterior), dar deocamdată nu contează. În aproape toate cazurile, se preferă sintaxa mai scurtă.

## "this" în metode

Este uzual ca o metodă de obiect să aibe nevoie să acceseze o informație stocată în obiect pentru a-și face treaba.

De exemplu, codul din interiorul metodei `user.sayHi()` poate avea nevoie de numele `user`-ului.

**Pentru a accesa obiectul, o metodă poate utiliza cuvântul cheie `this`.**

Valoarea variabilei `this` este obiectul "dinainte de punct", cel folosit pentru a apela metoda.

De exemplu:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" este "obiectul curent"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Aici, în timpul execuției metodei `user.sayHi ()`, valoarea variabilei `this` va fi `user`.

Tehnic, este de asemenea posibilă accesarea obiectului fără `this`, făcându-i referire prin variabila exterioară:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" în loc de "this"
*/!*
  }

};
```

...Însă un astfel de cod nu este de încredere. Dacă decidem să copiem variabila `user` intr-o altă variabilă, de ex. `admin = user` și suprascriem `user` cu altceva, apoi acesta va accesa obiectul greșit.

Acest lucru este demonstrat mai jos:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // duce la o eroare
*/!*
  }

};


let admin = user;
user = null; // suprascrie pentru a face lucrurile evidente

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
```

Dacă am folosi `this.name` în loc de `user.name` în interiorul funcției `alert`, atunci codul ar funcționa.

## "this" nu este bound

În JavaScript, cuvântul cheie "this" se comportă diferit față de alte limbaje de programare. Poate fi folosit în orice funcție, chiar dacă nu este o metodă a unui obiect.

Nu există nici un syntax error în exemplul următor:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

Valoarea variabilei `this` este evaluată în timpul execuției, depinzând de context.

De exemplu, aici aceeași funcție este atribuită la două obiecte diferite și are variabilă "this", diferită în apeluri:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// folosește aceeași funcție în două obiecte
user.f = sayHi;
admin.f = sayHi;
*/!*

// aceste apeluri au this diferit
// "this" în interiorul funcției este obiectul "dinainte de punct"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (punctul sau parantezele pătrate accesează metoda – nu contează)
```

Regula e simplă: dacă `obj.f()` este apelată, atunci `this` este `obj` în timpul apelului funcției `f`. Deci, este fie `user`, fie `admin` în exemplul de mai sus.

````smart header="Apelarea fără obiect: `this == undefined`"
Putem chiar să apelăm funcția fără niciun obiect:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

În acest caz `this` este `undefined` în modul strict. Dacă încercăm să accesăm `this.name`, va fi o eroare.

În mod non-strict valoarea variabilei `this` în astfel de cazuri va fi *obiect global* (`window` într-un browser, vom ajunge la el mai târziu în capitolul [](info:global-object)). Acesta este un comportament istoric pe care îl corectează sintaxa `"use strict"`.

De obicei asemeni call este o eroare de programare. Dacă există `this` în interiorul unei funcții, se asteaptă să fie apelat într-un context de obiect.
````

```smart header="Consecințele detașării variabilei `this`"
Dacă veniți dintr-un alt limbaj de programare, atunci sunteți probabil obișnuit cu ideea de "variabilă `this` atașată", unde metodele definite într-un obiect au întotdeauna variabila `this` care referențiază acel obiect.

În JavaScript `this` este "liber", valoarea lui este evaluată la timpul apelării și nu depinde de locul în care a fost declarată metoda, ci mai degrabă de cine este obiectul "dinaintea punctului".

Conceptul de variabilă `this` evaluată în timpul execuției are atât plusuri cât și minusuri. Pe de o parte, o funcție poate fi reutilizată pentru obiecte diferite. Pe de altă parte, o flexibilitate mai mare lasă loc pentru greșeli.

Aici poziția noastră nu este să judecăm dacă această decizie de proiectare a limbajului este bună sau rea. Vom înțelege cum să lucrăm cu ea, cum să obținem beneficii și cum să ocolim problemele.
```

## Funcțiile săgeată nu au "this"

Funcțiile săgeată sunt speciale: ele nu au `this` "propriu". Dacă facem referire la `this` dintr-o astfel de funție, aceasta este preluată din funcția exterioară "normală".

De exemplu, aici `arrow()` folosește `this` din metoda exterioară `user.sayHi()`:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

Aceasta este o caracteristică specială a funcțiilor săgeată, utilă când de fapt nu dorim să avem `this` separat, ci mai degrabă să o preluăm din contextul exterior. Mai târziu în capitolul <info:arrow-functions> vom intra mai adânc în funcțiile săgeată.


## Rezumat

- Funcțiile care sunt stocate în proprietățile obiectului sunt numite "metode".
- Metodele permit obiectelor să "acționeze" precum `object.doSomething()`.
- Metodele pot face referirea obiectului prin variabila `this`.

Valoarea variabilei `this` este definită în timpul execuției.
- Când o funcție este declarată, poate folosi variabila `this`, dar această `this` nu are valoare decât atunci când funcția este apelată.
- O funcție poate fi copiată între obiecte.
- Când o funcție este apelată cu sintaxa "metodă": `object.method()`, valoarea variabilei `this` din timpul apelării este `object`.

Vă rugăm să notați că funcțiile săgeată sunt speciale: ele nu au `this`. Când `this` este accesat din interiorul unei funcții săgeată, este primit din exterior.
