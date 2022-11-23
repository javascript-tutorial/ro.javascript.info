
# Obiecte

Așa cum știm din capitolul <info:types>, în JavaScript există opt tipuri de date. Șapte dintre ele sunt denumite "primitive", pentru că ele conțin numai un singur lucru (fie un string, un număr sau altceva).

În contrast, obiectele sunt folosite pentru a stoca colecții indexate de date diferite si alte entități complexe. În JavaScript, obiectele pătrund în aproape toate aspectele limbajului. De aceea trebuie să ințelegem obiectele înainte de a intra mai adânc în altă parte.

Un obiect poate fi creat folosind acoladele `{…}` cu o listă opțională de *proprietăți*. O proprietate este o pereche "cheie: valoare", unde `cheie` este un string (denumit si "numele proprietății"), iar `valoare` poate fi orice.

Ne putem imagina un obiect ca fiind un sertar ce conține dosare semnate. Fiecare bucățică de informație este stocată în sertarul ei după `cheie`. Este ușor să găsești un dosar după nume sau să adaugi/îndepărtezi unul.

![](object.svg)

Un obiect gol ("sertar gol") poate fi creat folosind una dintre următoarele sintaxe:

```js
let user = new Object(); // sintaxa "constructor obiect"
let user = {};  // sintaxa "obiect literal"
```

![](object-user-empty.svg)

Uzual se folosesc acoladele `{...}`. Această declarație este denumită  *obiect literal*.

## Literalele și proprietățile

Putem pune imediat câteva proprietăți în `{...}` ca și perechi "cheie: valoare":

```js
let user = {     // un obiect
  name: "John",  // după cheia "name" stocăm valoarea "John"
  age: 30        // dupa cheia "age" stocăm valoarea 30
};
```

O proprietate are o cheie (denumită și "nume" sau "identificator") înainte de semnul două puncte `":"` și o valoare la dreapta semnului.

În obiectul `user`, există două proprietăți:

1. Prima proprietate are numele `"name"` și valoarea `"John"`.
2. A doua are numele `"age"` și valoarea `30`.

Obiectul rezultat `user` poate fi imaginat ca un sertar cu două dosare marcate cu "name" respectiv "age".

![user object](object-user.svg)

Putem adăuga, șterge sau citi dosare din sertar la orice moment.

Valorile proprietăților sunt accesibile folosind notația cu punct.

```js
// citește valorile proprietăților obiectului:
alert( user.name ); // John
alert( user.age ); // 30
```

Valoarea poate avea orice tip. Să adăugăm una de tip `boolean`:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Pentru a șterge o proprietate, putem folosi operatorul `delete`:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Putem folosi de asemenea mai multe cuvinte ca și nume ale proprietăților, dar acestea trebuie sa fie între ghilimele:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // numele proprietăților formate din mai multe cuvinte trebuie să fie între ghilimele
};
```

![](object-user-props.svg)


Ultima proprietate din listă se poate termina cu virgulă:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Aceasta se numește virgulă "de sfârșit" sau "agățatoare". In felul acesta este mai ușor de adăugat/șters/mutat în jurul proprietăților, deoarece toate liniile vor fi  asemănătoare.

## Paranteze pătrate

Accesul la proprietățile formate din mai multe cuvinte nu se poate face cu punct:

```js run
// aceasta va genera o erroare de sintaxă
user.likes birds = true
```

Javascript nu înțelege asta. El crede că ne adresăm la `user.likes` și apoi ne răspunde cu syntax error când vede în mod neașteptat `birds`.

Punctul necesită ca cheia să fie un identifier valid de variabilă. În mod implicit: nu conține spații, nu începe cu numere și nu include caractere speciale (`$` și `_` sunt permise).

Există ca alternativă "notația parantezelor pătrate" care funcționează cu orice fel de șir de caractere:

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

Acum totul este în regulă. De remarcat că șirul de caractere este citat corespunzător (oricare dintre semnele pentru ghilimele se accepta).

Cu parantezele pătrate se poate obține numele proprietății ca rezultat al unei expresii -- as opposed to a literal string -- dintr-o variabilă:

```js
let key = "likes birds";

// la fel ca user["likes birds"] = true;
user[key] = true;
```

Aici, variabila `key` poate fi calculată la timpul rulării sau poate depinde de datele introduse de utilizatori. Dupa aceea o putem folosi pentru a accesa proprietatea. Acest lucru ne oferă o flexibilitate mărită.

De exemplu:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")
```

Notația cu punct nu poate fi folosită în același mod:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Proprietăți calculate

Putem folosi parantezele pătrate intr-un obiect literal atunci când creăm un object. Asta se numește *computed properties*.

Spre exemplu:

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // numele proprietații este luat din variabila fruit
*/!*
};

alert( bag.apple ); // 5 if fruit="apple"
```

Semnificația unei proprietăți calculate este simplă: `[fruit]` inseamnă că numele proprietății trebuie obținut din `fruit`.

Deci, daca un vizitator introduce `"apple"`, `bag` va deveni `{apple: 5}`.

În principiu, are aceeași funcționalitate ca și:
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// obține numele proprietății din variabila fruit
bag[fruit] = 5;
```

...Dar arată mai bine.

Putem folosi expresii mai complexe între parantezele pătrate:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Parantezele pătrate sunt mult mai puternice decât notația cu punct. Ele permit orice fel de nume și de variabile pentru proprietăți, dar sunt mai dificil de scris.

Deci, de cele mai multe ori, când numele proprietăților sunt cunoscute și simple se folosește punctul, iar daca avem nevoie de ceva mai complex, trecem la parantezele pătrate.

## Prescurtare (shorthand) pentru valoarea proprietății

În cod real folosim des variabile existente ca valori pentru numele proprietăților.

De exemplu:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

În exemplul de mai sus, proprietățile au aceleași nume ca variabilele. Cazul de utilizare al creării unei proprietăți dintr-o variabilă este atât de comun, încât există un *shorthand al valorii proprietății* pentru a o face mai scurtă.

In loc de `name:name` putem scrie doar `name`, după cum urmeză:

```js
function makeUser(name, age) {
*!*
  return {
    name, // la fel ca name: name
    age,   // la fel ca age: age
    // ...
  };
*/!*
}
```

Putem folosi atât proprietăți normale, cât și shorthand-uri în același obiect:

```js
let user = {
  name,  // la fel ca name:name
  age: 30
};
```

## Property names limitations

As we already know, a variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. We can't set it to a non-object value:

```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

As we see from the code, the assignment to a primitive `5` is ignored.

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## Property existence test, "in" operator

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true înseamna "nu există proprietatea"
```

Există, de asemenea, un operator special `"in"` pentru așa ceva.

Sintaxa este:
```js
"key" in object
```

Spre exemplu:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age există
alert( "blabla" in user ); // false, user.blabla nu există
```

Luați aminte că, la stânga operatorului `in` trebuie sa fie un *nume de proprietate*. Uzual numele este un șir de caractere între ghilimele.

Dacă omitem ghilimelele, adica o variabilă, ar trebui sa conțină numele actual pe care îl testăm. Spre exemplu:

```js run
let user = { age: 30 };

let key = "age";

alert( *!*key*/!* in user ); // true, property "age" exists
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.

Se întâmplă atunci când proprietatea există, dar conține `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // este ”undefined”, deci - nu există proprietatea?

alert( "test" in obj ); // true, proprietatea există!
```

In codul de mai sus, proprietatea `obj.test` tehnic există. Deci operatorul `in` funcționează corespunzător.

Situații de genul ăsta apar foarte rar, deoarece `undefined` nu este assigned în mod normal. De obicei folosim `null` pentru valori "necunoscute" sau "goale". Prin urmare operatorul `in` este un element exotic în codul nostru.

## Bucla "for..in" [#forin]

Pentru a traversa toate cheile unui obiect, există o formă specială de buclă: `for..in`. Aceasta este complet diferită de construcția buclei `for(;;)` pe care am studiat-o anterior.

Sintaxa:

```js
for (key in object) {
  // execută conținutul pentru fiecare cheie aparținând proprietăților obiectului
}
```

De exemplu, să afișăm toate proprietățile `user`-ului:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // chei
  alert( key );  // name, age, isAdmin
  // valorile cheilor
  alert( user[key] ); // John, 30, true
}
```

De remarcat, ca pentru construcțiile "for", ne este permis să declarăm variabila de buclă în interiorul buclei, precum `let key` de aici.

De asemenea, putem folosi alt nume pentru variabila noastră, în loc de `key`. De exemplu, declarația `"for (let prop in obj)"` este de și ea des folosită.

### Ordonat precum un object

Sunt obiectele ordonate? Cu alte cuvinte, dacă traversăm un obiect, obținem toate proprietățile în aceeași ordine în care au fost adăugate? Ne putem baza pe asta?

Răspunsul scurt este: "ordonate intr-o manieră specială": proprietățile de tip integer sunt sortate, celelalte apar în ordinea creării. Detaliile urmează.

Ca și exemplu, să considerăm un obiect ce conține prefixe telefonice:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

Obiectul poate fi folosit pentru a sugera o listă de opțiuni utilizatorilor. Dacă construim un site pentru audiență germană, atunci probabil dorim ca `49` să fie primul.

Dar dacă rulăm codul, vedem o cu totul altă imagine:

- USA (1) este primul
- apoi Switzerland (41) și așa mai departe.

Prefixele sunt sortate in ordine crescătoare, deoarece sunt de tip integer. Deci vedem `1, 41, 44, 49`.

````smart header="Proprietăți tip Integer? Ce-i aia?"
Termenul "Proprietate integer" de aici, semnifică un string care poate fi convertit în-și-din integer fără nicio modificare.

Deci, "49" este un nume de proprietate de tip integer, deoarece când este transformat într-un integer și înapoi, el rămâne neschimbat. Dar "+49" și "1.2" nu:

```js run
// Math.trunc este o funcție încorporată în limbaj care îndepărtează partea zecimală
alert( String(Math.trunc(Number("49"))) ); // "49", la fel, proprietate de tip integer
alert( String(Math.trunc(Number("+49"))) ); // "49", nu este la fel ca "+49" ⇒ proprietatea nu este de tip integer
alert( String(Math.trunc(Number("1.2"))) ); // "1", nu este la fel ca "1.2" ⇒ proprietatea nu este de tip integer
```
````

...Pe de altă parte, dacă cheile nu sunt de tip integer, atunci ele sunt listate în ordinea creării, de exemplu:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // adaugă incă o proprietate

*!*
// proprietățile non-integer sunt listate în ordinea creării
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Deci pentru a rezolva problema cu prefixele telefonice, putem "trișa" transformând prefixele în non-integer. Adăugarea semnului plus `"+"` înainte de fiecare prefix este suficientă.

Cam așa:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Acum funcționează cum trebuie.

## Rezumat

Obiectele sunt tablouri asociative cu mai multe caracteristici speciale.

Ele stochează proprietăți (perechi cheie-valoare), unde:
- Proprietățile chei trebuie să fie șiruri sau simboluri (de obicei șiruri).
- Valorile pot fi de orice tip.

Pentru a accesa o proprietate putem folosi:
- Notația cu punct: `obj.property`.
- Notația cu paranteze pătrate `obj["property"]`. Parantezele pătrate permit preluarea cheii dintr-o variabilă, precum `obj[varWithKey]`.

Operatori adiționali:
- Pentru a șterge o proprietate: `delete obj.prop`.
- Pentru a verifica dacă o proprietate cu o anumită cheie exista: `"key" in obj`.
- Pentru a itera asupra unui obiect: bucla `for (let key in obj)`.

Ceea ce am învățat în acest capitol se numește "obiect simplu", sau doar `Object`.

Există multe alte feluri de obiecte în JavaScript:

- `Array` pentru a stoca colecții ordonate de date,
- `Date` pentru a stoca informații despre dată și timp,
- `Error` pentru a stoca informațiile despre erori.
- ...Și așa mai departe.

Obiectele au caracteristicile lor speciale pe care le vom studia mai târziu. Câteodată oamenii spun ceva de genul "Array type" sau "Date type", dar formal ele nu sunt tipuri proprii , ci aparțin unui singur tip de date "object", pe care îl extind în diferite moduri.

Obiectele în JavaScript sunt foarte puternice. Aici am atins doar suprafața unui subiect care este cu adevărat imens. Vom lucra îndeaproape cu obiectele și vom învăța mai multe despre ele în alte părți ale tutorialului.
