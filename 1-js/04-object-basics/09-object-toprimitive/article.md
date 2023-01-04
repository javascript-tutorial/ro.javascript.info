
# Conversia obiectelor la primitive

Ce se întâmplă atunci când obiectele sunt adunate `obj1 + obj2`, scăzute `obj1 - obj2` sau tipărite folosind `alert(obj)`?

JavaScript nu prea permite să personalizeze cum operatorii lucrează pe obiecte. Spre deosebire de alte limbaje de programare, cum ar fi Ruby sau C++, nu putem implementa o metodă specială de obiect pentru a gestiona o adunare (sau alți operatori).

În cazul unor astfel de operații, obiectele sunt convertite automat în primitive, iar apoi operația este efectuată asupra acestor primitive și are ca rezultat o valoare primitivă.

Aceasta este o limitare importantă, deoarece rezultatul a `obj1 + obj2` nu poate fi un alt obiect!

E.g. nu putem crea obiecte reprezentând vectori sau matrici (sau realizări sau orice altceva), să le adunăm și să ne așteptăm ca rezultat un obiect "însumat". Astfel de realizări arhitecturale sunt automat "în afara discuției".

Așadar, pentru că nu putem face mare lucru aici, nu există matematică cu obiecte în proiectele reale. Atunci când se întâmplă, de obicei, este din cauza unei greșeli de codare.

În acest capitol vom acoperi modul în care un obiect se convertește în primitivă și cum să îl personalizăm.

Avem două scopuri:

1. Ne va permite să înțelegem ce se întâmplă în cazul unor greșeli de codare, atunci când o astfel de operațiune s-a întâmplat accidental.
2. Există excepții, unde astfel de operații sunt posibile și arată bine. E.g. scăderea sau compararea datelor (obiecte `Date`). Le vom întâlni mai târziu.

## Reguli de conversie

În capitolul <info:type-conversions> am văzut regulile pentru conversiile numerice, string și booleane ale primitivelor. Dar am lăsat un gol pentru obiecte. Acum, după cum știm despre metode și simboluri, devine posibil să o completăm.

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
  // iată codul pentru a converti acest obiect într-o primitivă
  // trebuie să returneze o valoare primitivă
  // hint = unul dintre "string", "number", "default"
};
```

Dacă există metoda `Symbol.toPrimitive`, aceasta este utilizată pentru toate indiciile și nu mai sunt necesare alte metode.

De exemplu, aici obiectul `user` o implementează:

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

Dacă nu există `Symbol.toPrimitive`, atunci JavaScript încearcă să găsească metodele `toString` și `valueOf`:

- Pentru indiciul "string": `toString`, iar dacă nu există, atunci `valueOf` (deci `toString` are prioritate pentru conversiile de stringuri).
- Pentru alte indicii: `valueOf`, iar dacă nu există, atunci `toString` (astfel încât `valueOf` are prioritate pentru conversii matematice).

Metodele `toString` și `valueOf` provin din timpuri străvechi. Ele nu sunt simboluri (simbolurile nu existau cu mult timp în urmă), ci mai degrabă metode "obișnuite" cu nume de șir de caractere. Ele oferă o modalitate alternativă "în stil vechi" de a implementa conversia.

Aceste metode trebuie să returneze o valoare primitivă. Dacă `toString` sau `valueOf` returnează un obiect, atunci este ignorată (la fel ca în cazul în care nu ar exista nicio metodă).

În mod implicit, un obiect simplu are următoarele metode `toString` și `valueOf`:

- Metoda `toString` returnează un șir de caractere `"[object Object Object]"`.
- Metoda `valueOf` returnează obiectul în sine.

Iată demonstrația:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Așadar, dacă încercăm să folosim un obiect ca șir de caractere, cum ar fi într-un `alert` sau așa ceva, atunci, în mod implicit, vom vedea `[object Object]`.

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

### A conversion can return any primitive type

Lucrul important de știut despre toate metodele de conversie primitivă este că nu returnează neapărat primitiva "indicată".

Nu se poate controla dacă `toString` returnează exact un șir, sau dacă metoda `Symbol.toPrimitive` returnează un număr pentru un indiciu `"number"`.

Singurul lucru obligatoriu: aceste metode trebuie să returneze o primitivă, nu un obiect.

```smart header="Note istorice"
Din motive istorice, dacă `toString` sau `valueOf` returnează un obiect, nu este o eroare, dar o astfel de valoare este ignorată (ca și cum metoda nu ar exista). Asta deoarece mai demult, în JavaScript nu exista un concept de "eroare" sănătos.

În contrast, `Symbol.toPrimitive` *trebuie* să returneze o primitivă, altfel va exista o eroare.
```

## Alte conversii

După cum știm deja, mulți operatori și funcții efectuează conversii de tip, e.g. înmulțirea `*` convertește operanzii în numere.

Dacă trecem un obiect ca argument, atunci există două etape:
1. Obiectul este convertit într-o primitivă (folosind regulile descrise mai sus).
2. Dacă primitiva rezultată nu este de tipul corect, aceasta este convertită.

De exemplu:

```js run
let obj = {
  // toString se ocupă de toate conversiile în absența altor metode
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

alert(obj + 2); // 22 ("2" + 2), conversia în primitivă a returnat un șir => concatenare
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
