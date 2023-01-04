
# Conversia obiectelor la primitive

Ce se întâmplă atunci când obiectele sunt adunate `obj1 + obj2`, scăzute `obj1 - obj2` sau tipărite folosind `alert(obj)`?

JavaScript doesn't exactly allow to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle an addition (or other operators).

In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value.

That's an important limitation, as the result of `obj1 + obj2` can't be another object!

E.g. we can't make objects representing vectors or matrices (or achievements or whatever), add them and expect a "summed" object as the result. Such architectural feats are automatically "off the board".

So, because we can't do much here, there's no maths with objects in real projects. When it happens, it's usually because of a coding mistake.

In this chapter we'll cover how an object converts to primitive and how to customize it.

We have two purposes:

1. It will allow us to understand what's going on in case of coding mistakes, when such an operation happened accidentally.
2. There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (`Date` objects). We'll come across them later.

## Conversion rules

În capitolul <info: tip-conversions> am văzut regulile pentru conversiile numerice, string și booleane ale primitivelor. Dar am lăsat un gol pentru obiecte. Acum, după cum știm despre metode și simboluri, devine posibil să o completăm.

1. Într-un context boolean toate obiectele sunt `true` (adevărate). Există doar conversii numerice și conversii de șiruri.
2. Conversia numerică are loc atunci când scădem obiecte sau aplicăm funcții matematice. De exemplu, obiectele de tip `Date` (ce vor fi studiate în capitolul <info:date>) pot fi scăzute, iar rezultatul  `date1 - date2` este diferența de timp dintre cele două date.
3. În ceea ce privește conversia șirului - se întâmplă de obicei atunci când afișăm un obiect precum `alert (obj)` și în contexte similare.

We can fine-tune string and numeric conversion, using special object methods.

There are three variants of type conversion, that happen in various situations.

They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):

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

`"default"`
: Se întâmplă în cazuri rare când operatorul nu este „sigur” la ce tip să se aștepte.

    De exemplu, operatorul binar plus `+` poate funcționa atât cu șiruri (le concatenează) cât și cu numere (le adună), deci atât șirurile cât și numerele se acceptă. Așadar dacă un plus binar obține un obiect ca argument, acesta folosește indiciul `"default"` pentru a-l converti.

    De asemenea dacă un obiect este comparat folosind `==` cu un șir, un număr sau un simbol, nu este clar ce conversie ar trebui efectuată, deci se utilizează indiciul `"default"`.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    Operatorii de comparație mai mare și mai mic, cum ar fi `<` `>`, pot funcționa atât cu șiruri cât și cu numere. Totuși, ei folosesc indiciul `"number"`, nu `"default"`. Asta din motive istorice.

    În practică însă, nu trebuie să ne amintim aceste detalii particulare, deoarece toate obiectele built-in cu excepția unui singur caz (obiectul `Date`, îl vom învăța mai târziu) implementează conversia `"default"` în același mod ca și `"number"`. Și noi putem face la fel.

```smart header="No `\"boolean\"` hint"
Please note -- there are only three hints. It's that simple.

There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.
```

**Pentru a face conversia, JavaScript încearcă să găsească și să apeleze trei metode obiect:**

1. Apelează `obj[Symbol.toPrimitive](indiciu)` - metoda cu cheia simbolică `Symbol.toPrimitive` (simbol de sistem), dacă o astfel de metodă există,
2. În caz contrar, dacă indiciul este `"string"`
    - încearcă `obj.toString()` și `obj.valueOf()`, oricare dintre ele există.
3. Altfel, dacă indiciul este `"number"` sau `"default"`
    - încearcă `obj.valueOf()` și `obj.toString()`, oricare dintre ele există.

## Symbol.toPrimitive

Să începem de la prima metodă. Există un simbol încorporat numit `Symbol.toPrimitive`  care ar trebui utilizat pentru a denumi metoda de conversie, astfel:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // trebuie să returneze o valoare primitivă
  // hint = unul dintre "string", "number", "default"
};
```

If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed.

For instance, here `user` object implements it:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](indiciu) {
    alert(`indiciu: ${indiciu}`);
    return indiciu == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// demo conversie:
alert(user); // indiciu: string -> {name: "John"}
alert(+user); // indiciu: number -> 1000
alert(user + 500); // indiciu: default -> 1500
```

După cum putem vedea din cod, obiectul `user` devine un șir autodescriptiv sau o sumă de bani în funcție de conversie. Metoda unică `user[Symbol.toPrimitive]` gestionează toate cazurile de conversie.


## toString/valueOf

If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the "string" hint: `toString`, and if it doesn't exist, then `valueOf` (so `toString` has the priority for string conversions).
- For other hints: `valueOf`, and if it doesn't exist, then `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // pentru indiciu="string"
  toString() {
    return `{name: "${this.name}"}`;
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

### A conversion can return any primitive type

Lucrul important de știut despre toate metodele de conversie primitivă este că nu returnează neapărat primitiva "indicată".

Nu se poate controla dacă `toString` returnează exact un șir, sau dacă metoda `Symbol.toPrimitive` returnează un număr pentru un indiciu `"number"`.

Singurul lucru obligatoriu: aceste metode trebuie să returneze o primitivă, nu un obiect.

```smart header="Note istorice"
Din motive istorice, dacă `toString` sau `valueOf` returnează un obiect, nu este o eroare, dar o astfel de valoare este ignorată (ca și cum metoda nu ar exista). Asta deoarece mai demult, în JavaScript nu exista un concept de "eroare" sănătos.

În contrast, `Symbol.toPrimitive` *trebuie* să returneze o primitivă, altfel va exista o eroare.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.

De exemplu:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## Rezumat

Conversia obiect-la-primitivă este apelată automat de multe funcții și operatori încorporați care așteaptă ca valoare o primitivă.

Există trei tipuri (indicii) ale acesteia:
- `"string (șir)"` (pentru `alert` sau altă instrucțiune care are nevoie de un șir)
- `"number (număr)"` (pentru matematică)
- `"default (implicit)"` (câțiva operatori)

Specificația descrie explicit ce operator folosește ce indiciu. Există foarte puțini operatori care "nu știu la ce să se aștepte" și folosesc indiciuul `"default"`. De obicei, pentru obiectele încorporate, indiciuul `"default"` în același mod ca `"number"`, astfel încât, în practică, ultimele două sunt adesea îmbinate între ele.

Algoritmul de conversie este:

1. Apelează `obj[Symbol.toPrimitive](hint)` dacă metoda există,
2. În caz contrar, dacă indiciul este `"string"`
    - încearcă `obj.toString()` și `obj.valueOf()`, oricare dintre ele există.
3. Altfel, dacă indiciul este `"number"` sau `"default"`
    - încearcă `obj.valueOf()` și `obj.toString()`, oricare dintre ele există.

În practică, este adesea suficient să implementăm doar `obj.toString()` ca metodă "catch-all" pentru conversiile de șiruri care ar trebui să returneze o reprezentare "lizibilă pentru oameni" a unui obiect, în scopuri de logare sau de depanare. 

În ceea ce privește operațiile matematice, JavaScript nu oferă o modalitate de a le "suprascrie" cu ajutorul metodelor, deci proiectele din viața reală le folosesc rareori pe obiecte.
