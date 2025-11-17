
# Conversia obiectelor la primitive

Ce se întâmplă atunci când obiectele sunt adunate `obj1 + obj2`, scăzute `obj1 - obj2` sau tipărite folosind `alert(obj)`?

<<<<<<< HEAD
JavaScript nu vă permite să personalizați modul în care operatorii lucrează pe obiecte. Spre deosebire de alte limbaje de programare, cum ar fi Ruby sau C++, nu putem implementa o metodă specială de obiect pentru a gestiona o adunare (sau alți operatori).
=======
JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

În cazul unor astfel de operații, obiectele sunt convertite automat în primitive, iar apoi operația este efectuată asupra acestor primitive și are ca rezultat o valoare primitivă.

<<<<<<< HEAD
Aceasta este o limitare importantă: rezultatul lui `obj1 + obj2` (sau altă operație matematică) nu poate fi un alt obiect!
=======
That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

E.g. nu putem crea obiecte reprezentând vectori sau matrici (sau realizări sau orice altceva), să le adunăm și să ne așteptăm ca rezultat un obiect "însumat". Astfel de realizări arhitecturale sunt automat "în afara discuției".

<<<<<<< HEAD
Așadar, pentru că nu putem face mare lucru aici, nu există matematică cu obiecte în proiectele reale. Atunci când se întâmplă, de obicei, este din cauza unei greșeli de codare.
=======
So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

În acest capitol vom acoperi modul în care un obiect se convertește în primitivă și cum să îl personalizăm.

Avem două scopuri:

1. Ne va permite să înțelegem ce se întâmplă în cazul unor greșeli de codare, atunci când o astfel de operațiune s-a întâmplat accidental.
2. Există excepții, unde astfel de operații sunt posibile și arată bine. E.g. scăderea sau compararea datelor (obiecte `Date`). Le vom întâlni mai târziu.

## Reguli de conversie

În capitolul <info:type-conversions> am văzut regulile pentru conversiile numerice, string și booleane ale primitivelor. Dar am lăsat un gol pentru obiecte. Acum, după cum știm despre metode și simboluri, devine posibil să o completăm.

<<<<<<< HEAD
1. Într-un context boolean toate obiectele sunt `true` (adevărate). Există doar conversii numerice și conversii de șiruri.
2. Conversia numerică are loc atunci când scădem obiecte sau aplicăm funcții matematice. De exemplu, obiectele de tip `Date` (ce vor fi studiate în capitolul <info:date>) pot fi scăzute, iar rezultatul  `date1 - date2` este diferența de timp dintre cele două date.
3. În ceea ce privește conversia șirului -- se întâmplă de obicei atunci când afișăm un obiect precum `alert(obj)` și în contexte similare.

Putem implementa singuri conversia șirurilor de caractere și a numerelor, folosind metode de obiect speciale.

Acum să intrăm în detalii tehnice, pentru că este singura modalitate de a acoperi subiectul în profunzime.

## Hints

Cum decide JavaScript ce conversie să aplice?

Există trei variante de conversie de tip, care se întâmplă în diverse situații. Acestea se numesc "indicii", așa cum sunt descrise în [specificație](https://tc39.github.io/ecma262/#sec-toprimitive):
=======
1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.

Now let's get into technical details, because it's the only way to cover the topic in-depth.

## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

`"string"`
: Pentru o conversie obiect-la-șir, atunci când efectuăm o operație asupra unui obiect care se așteaptă la un șir, cum ar fi `alert`:

    ```js
    // afișare
    alert(obj);

    // folosind obiectul ca și cheie de proprietate
    anotherObj[obj] = 123;
    ```

`"number"`
: Pentru o conversie obiect-la-număr, ca atunci când facem matematică:

    ```js
    // conversie explicită
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;
    ```

<<<<<<< HEAD
    Majoritatea funcțiilor matematice încorporate includ, de asemenea, o astfel de conversie.
=======
    Most built-in mathematical functions also include such conversion.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

`"default"`
: Se întâmplă în cazuri rare când operatorul nu este „sigur” la ce tip să se aștepte.

<<<<<<< HEAD
    De exemplu, operatorul binar plus `+` poate funcționa atât cu șiruri (le concatenează) cât și cu numere (le adună), deci atât șirurile cât și numerele se acceptă. Așadar dacă un plus binar obține un obiect ca argument, acesta folosește indiciul `"default"` pentru a-l converti.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

    De asemenea, dacă un obiect este comparat folosind `==` cu un șir, un număr sau un simbol, nu este clar ce conversie ar trebui efectuată, deci se utilizează indiciul `"default"`.

    ```js
    // binary plus utilizează indiciul "default".
    let total = obj1 + obj2;

    // obj == number utilizează indiciul "default"
    if (user == 1) { ... };
    ```

    Operatorii de comparație mai mare și mai mic, cum ar fi `<` `>`, pot funcționa atât cu șiruri cât și cu numere. Totuși, ei folosesc indiciul `"number"`, nu `"default"`. Asta din motive istorice.

<<<<<<< HEAD
În practică însă, lucrurile sunt puțin mai simple.

Toate obiectele încorporate cu excepția unui singur caz (obiectul `Date`, îl vom învăța mai târziu), implementează conversia `"default"` în același mod ca și `"number"`. Și probabil că ar trebui să facem la fel.

Totuși, este important să cunoaștem toate cele 3 indicații, în curând vom vedea de ce.
=======
In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

**Pentru a face conversia, JavaScript încearcă să găsească și să apeleze trei metode obiect:**

<<<<<<< HEAD
1. Apelează `obj[Symbol.toPrimitive](indiciu)` - metoda cu cheia simbolică `Symbol.toPrimitive` (simbol de sistem), dacă o astfel de metodă există,
2. În caz contrar, dacă indiciul este `"string"`
    - încearcă să apeleze `obj.toString()` sau `obj.valueOf()`, oricare dintre ele există.
3. Altfel dacă indiciul este `"number"` sau `"default"`
    - încearcă să apeleze `obj.valueOf()` sau `obj.toString()`, oricare dintre ele există.
=======
1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

## Symbol.toPrimitive

Să începem de la prima metodă. Există un simbol încorporat numit `Symbol.toPrimitive` care ar trebui utilizat pentru a denumi metoda de conversie, astfel:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // iată codul pentru a converti acest obiect într-o primitivă
  // trebuie să returneze o valoare primitivă
  // indiciu = unul dintre "string", "number", "default"
};
```

Dacă există metoda `Symbol.toPrimitive`, aceasta este utilizată pentru toate indiciile, și nu mai sunt necesare alte metode.

De exemplu, aici obiectul `user` o implementează:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`indiciu: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversii demo:
alert(user); // indiciu: string -> {name: "John"}
alert(+user); // indiciu: number -> 1000
alert(user + 500); // indiciu: default -> 1500
```

<<<<<<< HEAD
După cum putem vedea din cod, obiectul `user` devine un șir autodescriptiv sau o sumă de bani în funcție de conversie. Metoda unică `user[Symbol.toPrimitive]` gestionează toate cazurile de conversie.
=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

## toString/valueOf

Dacă nu există `Symbol.toPrimitive`, atunci JavaScript încearcă să găsească metodele `toString` și `valueOf`:

<<<<<<< HEAD
- Pentru indiciul "string": apelează metoda `toString`, și dacă nu există sau dacă returnează un obiect în loc de o valoare primitivă, atunci apelează `valueOf` (deci `toString` are prioritate pentru conversiile de șiruri).
- Pentru alte indicii: apelează `valueOf`, iar dacă acesta nu există sau dacă returnează un obiect în loc de o valoare primitivă, atunci apelează `toString` (deci `valueOf` are prioritate pentru matematică).
=======
- For the `"string"` hint: call `toString` method, and if it doesn't exist or if it returns an object instead of a primitive value, then call `valueOf` (so `toString` has the priority for string conversions).
- For other hints: call `valueOf`, and if it doesn't exist or if it returns an object instead of a primitive value, then call `toString` (so `valueOf` has the priority for maths).
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Metodele `toString` și `valueOf` provin din timpuri străvechi. Ele nu sunt simboluri (simbolurile nu existau cu mult timp în urmă), ci mai degrabă metode "obișnuite" cu nume de șiruri. Ele oferă o modalitate alternativă "în stil vechi" de a implementa conversia.

Aceste metode trebuie să returneze o valoare primitivă. Dacă `toString` sau `valueOf` returnează un obiect, atunci este ignorată (la fel ca în cazul în care nu ar exista nicio metodă).

În mod implicit, un obiect simplu are următoarele metode `toString` și `valueOf`:

- Metoda `toString` returnează un șir `"[object Object]"`.
- Metoda `valueOf` returnează obiectul în sine.

Iată demonstrația:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Așadar, dacă încercăm să folosim un obiect ca șir de caractere, cum ar fi într-un `alert` sau așa ceva, atunci vom vedea în mod implicit `[object Object]`.

Valoarea implicită `valueOf` este menționată aici doar de dragul completării, pentru a evita orice confuzie. După cum puteți vedea, acesta returnează obiectul în sine, deci este ignorat. Nu mă întrebați de ce, aceea este din motive istorice. Deci putem presupune că nu există.

Haideți să implementăm aceste metode pentru a personaliza conversia.

De exemplu, aici `user` face același lucru ca mai sus, folosind o combinație de `toString` și `valueOf` în loc de `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  bani: 1000,

  // pentru indiciu="string"
  toString() {
    return `{nume: "${acest.nume}"}`;
  },

  // pentru indiciu="number" sau "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

După cum putem vedea, comportamentul este același cu cel din exemplul precedent cu `Symbol.toPrimitive`.

Deseori ne dorim un singur loc "catch-all" care să se ocupe de toate conversiile primitive. În acest caz, putem implementa doar `toString`, astfel:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

În absența metodelor `Symbol.toPrimitive` și `valueOf`, `toString` va gestiona toate conversiile primitive.

### O conversie poate returna orice tip primitiv

Lucrul important de știut despre toate metodele de conversie primitivă este că nu returnează neapărat primitiva "indicată".

<<<<<<< HEAD
Nu se poate controla dacă `toString` returnează exact un șir, sau dacă metoda `Symbol.toPrimitive` returnează un număr pentru un indiciu `"number"`.
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Singurul lucru obligatoriu: aceste metode trebuie să returneze o primitivă, nu un obiect.

```smart header="Note istorice"
Din motive istorice, dacă `toString` sau `valueOf` returnează un obiect, nu este o eroare, dar o astfel de valoare este ignorată (ca și cum metoda nu ar exista). Asta deoarece în vremuri străvechi nu exista un concept de "eroare" bun în JavaScript.

<<<<<<< HEAD
În contrast, `Symbol.toPrimitive` *trebuie* să returneze o primitivă, altfel va exista o eroare.
=======
In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```

## Alte conversii

După cum știm deja, mulți operatori și funcții efectuează conversii de tip, e.g. înmulțirea `*` convertește operanzii în numere.

<<<<<<< HEAD
Dacă transmitem un obiect ca argument, atunci există două etape de calcul:
1. Obiectul este convertit într-o primitivă (folosind regulile descrise mai sus).
2. Dacă este necesar pentru calcule ulterioare, primitivul rezultat este de asemenea convertit.
=======
If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If necessary for further calculations, the resulting primitive is also converted.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

De exemplu:

```js run
let obj = {
  // toString gestionează toate conversiile în absența altor metode
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, obiect convertit în primitivul "2", apoi înmulțirea l-a transformat în număr
```

1. Înmulțirea `obj * 2` convertește mai întâi obiectul în primitivă (care este un șir de caractere `"2"`).
2. Apoi `"2" * 2` devine `2 * 2` (șirul este convertit în număr).

Binary plus va concatena șiruri de caractere în aceeași situație, deoarece acceptă cu plăcere un șir de caractere:

```js run
let obj = {
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj + 2); // 22 ("2" + 2), conversia în primitivă a returnat un șir => concatenare
=======
alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```

## Sumar

Conversia obiect-la-primitivă este apelată automat de multe funcții și operatori încorporați care așteaptă ca valoare o primitivă.

<<<<<<< HEAD
Există trei tipuri (indicii) ale acesteia:
- `"string"` (pentru `alert` sau altă instrucțiune care are nevoie de un șir)
- `"number"` (pentru matematică)
- `"default"` (câțiva operatori, de obicei obiectele îl implementează în același mod ca și `"number"`.)

Specificația descrie explicit ce operator folosește ce indiciu.
=======
There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Algoritmul de conversie este:

<<<<<<< HEAD
1. Apelează `obj[Symbol.toPrimitive](indiciu)` dacă metoda există,
2. În caz contrar, dacă indiciul este `"string"`
    - încearcă să apeleze `obj.toString()` sau `obj.valueOf()`, oricare dintre ele există.
3. Altfel dacă indiciul este `"number"` sau `"default"`
    - încearcă să apeleze `obj.valueOf()` sau `obj.toString()`, oricare dintre ele există.

Toate aceste metode trebuie să returneze o primitivă pentru a funcționa (dacă sunt definite).

În practică, este adesea suficient să implementăm doar `obj.toString()` ca metodă "catch-all" pentru conversiile de șiruri care ar trebui să returneze o reprezentare "lizibilă pentru oameni" a unui obiect, în scopuri de logare sau de depanare. 
=======
1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
