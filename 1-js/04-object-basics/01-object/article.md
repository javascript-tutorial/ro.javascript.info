
# Obiecte

Așa cum știm din capitolul <info:types>, în JavaScript există șapte tipuri de date. Șase dintre ele sunt denumite "primitive", pentru că ele conțin numai un singur lucru (fie un string, un număr sau altceva).

În contrast, obiectele sunt folosite pentru a stoca colecții indexate de date diferite si alte entități complexe. În JavaScript, obiectele pătrund în aproape toate aspectele limbajului. De aceea trebuie să ințelegem obiectele înainte de a intra mai adânc în altă parte.

Un obiect poate fi creat folosind acoladele `{…}` cu o listă opțională de *proprietăți*. O proprietate este o pereche "cheie: valoare", unde `cheie` este un string (denumit si "numele proprietății"), iar `valoare` poate fi orice.

Ne putem imagina un obiect ca fiind un dosar ce conține documente semnate. Fiecare bucățică de informație este stocată în dosarul ei după `cheie`. Este ușor să găsești un document după nume sau să adaugi/îndepărtezi un document.

![](object.svg)

Un obiect gol ("dosar gol") poate fi creat folosind una dintre următoarele sintaxe:

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

Obiectul rezultat `user` poate fi imaginat ca un dosar cu două documente marcate cu "name" respectiv "age".

![user object](object-user.svg)

Putem adăuga, șterge sau citi documente din dosar la orice moment.

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

Asta deorece cheia trebuie să fie un identificator valid pentru o variabilă, adică: fără spații și alte limitări.

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

Putem folosi parantezele pătrate intr-un obiect literal. Asta se numește *proprietate calculată*.

De exemplu:

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



````smart header="Cuvintele rezervate sunt permise ca nume de proprietăți"
O variabilă nu poate avea un nume identic cu unul dintre cuvintele rezervate limbajului precum "for", "let", "return" etc.

În schimb, pentru o proprietate a unui obiect nu există o astfel de restricție. Orice nume este bun:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Practic, orice nume este permis, însă există unul special: `"__proto__"` care primește un tratament preferențial din motive istorice. De exemplu, nu îl putem seta la o valoare non-obiect:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], nu a funcționat cum ne-am așteptat
```

După cum vedem din cod, atribuirea către o primitivă `5` este ignorată.

Acest lucru poate deveni o sursă de bug-uri și chiar vulnerabilități dacă intenționăm să stocăm perechi cheie-valoare arbitrare într-un obiect și să permitem unui vizitator să specifice cheile.

În acest caz vizitatorul poate alege `__proto__` ca și cheie, iar logica de atribuire va fi stricată (după cum se arată mai sus).

Există o modalitate, pe care o vom acoperi mai târziu, de a face obiectele să trateze `__proto__` ca pe o proprietate obișnuită, dar mai întâi trebuie să știm mai multe despre obiecte.

Există, de asemenea, o altă structură de date [Map](info:map-set), pe care o vom învăța în capitolul <info:map-set>, care acceptă chei arbitrare.
````


## Prescurtare (shorthand) pentru valoarea proprietății

În cod real folosim des variabile existente ca valori pentru numele proprietăților.

De exemplu:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
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
    age   // la fel ca age: age
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

## Verificarea existenței

O caracteristică notabilă a obiectelor este posibilitatea accesării oricărei proprietăți. Nu va fi nicio eroare dacă proprietatea nu există! Accesarea unei proprietăți inexistente doar returnează `undefined`. Oferă un mod foarte comun de a testa dacă proprietatea există -- de a o obține și a o compara cu undefined:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true înseamna "nu există proprietatea"
```

Există, de asemenea, un operator special `"in"` pentru a verifica existența unei proprietăți.

Sintaxa este:
```js
"key" in object
```

De exemplu:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age există
alert( "blabla" in user ); // false, user.blabla nu există
```

Luați aminte că, la stânga operatorului `in` trebuie sa fie un *nume de proprietate*. Usual este un sir caractere între ghilimele.

Daca omitem ghilimelele, asta ar însemna că o variabilă care conține de fapt numele va fi testată. De exemplu:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, takes the name from key and checks for such property
```

````smart header="Using \"in\" for properties that store `undefined`"
Usually, the strict comparison `"=== undefined"` check the property existance just fine. But there's a special case when it fails, but `"in"` works correctly.

It's when an object property exists, but stores `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!
```


In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` is usually not assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.
````

## The "for..in" loop

To walk over all keys of an object, there exists a special form of the loop: `for..in`. This is a completely different thing from the `for(;;)` construct that we studied before.

The syntax:

```js
for (key in object) {
  // executes the body for each key among object properties
}
```

For instance, let's output all properties of `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
```

Note that all "for" constructs allow us to declare the looping variable inside the loop, like `let key` here.

Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.


### Ordered like an object

Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?

The short answer is: "ordered in a special fashion": integer properties are sorted, others appear in creation order. The details follow.

As an example, let's consider an object with the phone codes:

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

The object may be used to suggest a list of options to the user. If we're making a site mainly for German audience then we probably want `49` to be the first.

But if we run the code, we see a totally different picture:

- USA (1) goes first
- then Switzerland (41) and so on.

The phone codes go in the ascending sorted order, because they are integers. So we see `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
The "integer property" term here means a string that can be converted to-and-from an integer without a change.

So, "49" is an integer property name, because when it's transformed to an integer number and back, it's still the same. But "+49" and "1.2" are not:

```js run
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
```
````

...On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

*!*
// non-integer properties are listed in the creation order
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

So, to fix the issue with the phone codes, we can "cheat" by making the codes non-integer. Adding a plus `"+"` sign before each code is enough.

Like this:

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

Now it works as intended.

## Copying by reference

One of the fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

For instance:

```js
let message = "Hello!";
let phrase = message;
```

As a result we have two independent variables, each one is storing the string `"Hello!"`.

![](variable-copy-value.svg)

Objects are not like that.

**A variable stores not the object itself, but its "address in memory", in other words "a reference" to it.**

Here's the picture for the object:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Here, the object is stored somewhere in memory. And the variable `user` has a "reference" to it.

**When an object variable is copied -- the reference is copied, the object is not duplicated.**

If we imagine an object as a cabinet, then a variable is a key to it. Copying a variable duplicates the key, but not the cabinet itself.

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // copy the reference
```

Now we have two variables, each one with the reference to the same object:

![](variable-copy-reference.svg)

We can use any variable to access the cabinet and modify its contents:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

The example above demonstrates that there is only one object. As if we had a cabinet with two keys and used one of them (`admin`) to get into it. Then, if we later use the other key (`user`) we would see changes.

### Comparison by reference

The equality `==` and strict equality `===` operators for objects work exactly the same.

**Two objects are equal only if they are the same object.**

For instance, if two variables reference the same object, they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though both are empty:

```js run
let a = {};
let b = {}; // two independent objects

alert( a == b ); // false
```

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are necessary very rarely and usually are a result of a coding mistake.

### Const object

An object declared as `const` *can* be changed.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

It might seem that the line `(*)` would cause an error, but no, there's totally no problem. That's because `const` fixes only value of `user` itself. And here `user` stores the reference to the same object all the time. The line `(*)` goes *inside* the object, it doesn't reassign `user`.

The `const` would give an error if we try to set `user` to something else, for instance:

```js run
const user = {
  name: "John"
};

*!*
// Error (can't reassign user)
*/!*
user = {
  name: "Pete"
};
```

...But what if we want to make constant object properties? So that `user.age = 25` would give an error. That's possible too. We'll cover it in the chapter <info:property-descriptors>.

## Cloning and merging, Object.assign

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. Actually, that's rarely needed. Copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent clone
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Arguments `dest`, and `src1, ..., srcN` (can be as many as needed) are objects.
- It copies the properties of all objects `src1, ..., srcN` into `dest`. In other words, properties of all arguments starting from the 2nd are copied into the 1st. Then it returns `dest`.

For instance, we can use it to merge several objects into one:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the receiving object (`user`) already has the same named property, it will be overwritten:

```js
let user = { name: "John" };

// overwrite name, add isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```

We also can use `Object.assign` to replace the loop for simple cloning:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

It copies all properties of `user` into the empty object and returns it. Actually, the same as the loop, but shorter.

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use the cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data). In order not to reinvent the wheel, we can use a working implementation of it from the JavaScript library [lodash](https://lodash.com), the method is called [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).



## Summary

Objects are associative arrays with several special features.

They store properties (key-value pairs), where:
- Property keys must be strings or symbols (usually strings).
- Values can be of any type.

To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow to take the key from a variable, like `obj[varWithKey]`.

Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object. All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` or  [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

What we've studied in this chapter is called a "plain object", or just `Object`.

There are many other kinds of objects in JavaScript:

- `Array` to store ordered data collections,
- `Date` to store the information about the date and time,
- `Error` to store the information about an error.
- ...And so on.

They have their special features that we'll study later. Sometimes people say something like "Array type" or "Date type", but formally they are not types of their own, but belong to a single "object" data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
