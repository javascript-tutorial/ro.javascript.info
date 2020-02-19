
# Conversia obiectelor la primitive

Ce se întâmplă atunci când obiectele sunt adunate `obj1 + obj2`, scăzute` obj1 - obj2` sau tipărite folosind `alert (obj)`?

În acest caz, obiectele sunt convertite automat în primitive, după care este efectuată operația.

În capitolul <info: tip-conversions> am văzut regulile pentru conversiile numerice, string și booleane ale primitivelor. Dar am lăsat un gol pentru obiecte. Acum, după cum știm despre metode și simboluri, devine posibil să o completăm.

1. Într-un context boolean toate obiectele sunt `true` (adevărate). Există doar conversii numerice și conversii de șiruri.
2. Conversia numerică are loc atunci când scădem obiecte sau aplicăm funcții matematice. De exemplu, obiectele de tip `Date` (ce vor fi studiate în capitolul <info:date>) pot fi scăzute, iar rezultatul  `date1 - date2` este diferența de timp dintre cele două date.
3. În ceea ce privește conversia șirului - se întâmplă de obicei atunci când afișăm un obiect precum `alert (obj)` și în contexte similare.

## ToPrimitive

Putem ajusta conversia la șir și conversia numerică folosind metode speciale de obiect.

Există trei variante de conversie a tipului, așa-numitele "indicii", descrise în [specificație](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string (șir)"`
: Pentru o conversie obiect-la-șir, atunci când efectuăm o operație asupra unui obiect care se așteaptă la un șir, cum ar fi `alert`:

    ```js
    // afișare
    alert(obj);

    // folosind obiectul ca și cheie de proprietate
    anotherObj[obj] = 123;
    ```

`"number (număr)"`
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

`"default (implicit)"`
: Se întâmplă în cazuri rare când operatorul nu este „sigur” la ce tip să se aștepte.

    De exemplu, operatorul binar plus `+` poate funcționa atât cu șiruri (le concatenează) cât și cu numere (le adună), astfel încât atât șirurile cât și numerele se acceptă. Sau când un obiect este comparat cu un șir, număr sau simbol folosind operatorul `==`, este de asemenea neclar ce conversie ar trebui făcută.

    ```js
    // operatorul plus
    let total = car1 + car2;

    // obj == string/number/symbol
    if (user == 1) { ... };
    ```

    Operatorul Mai mare / Mai mic `<>` poate funcționa și cu șiruri și cu numere. Totuși, folosește indiciul "number (număr)", nu "default (implicit)". Asta din motive istorice.

    În practică, toate obiectele încorporate, cu excepția unui caz (obiectul `Date`, îl vom invăța mai târziu) implementează conversia `"default"` în același mod ca `"number"`. Și probabil că ar trebui să facem la fel.

Vă rugăm să rețineți - există doar trei indicii. Este atat de simplu. Nu există niciun indiciu "boolean" (toate obiectele sunt `true` în context boolean) sau orice altceva. Iar dacă tratăm conversia `"default"` și `"number"` la fel, așa cum fac majoritatea obiectelor încorporate, atunci există doar două conversii.

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
  // trebuie să returneze o valoare primitivă
  // hint = oricare dintre "string", "number", "default"
};
```

De exemplu, aici obiectul `user` îl implementează:

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

Metodele `toString` și `valueOf` provin din timpuri străvechi. Ele nu sunt simboluri (simbolurile nu existau cu mult timp în urmă), ci mai degrabă metode "obișnuite" denumite prin șiruri. Acestea oferă o modalitate alternativă de "stil-vechi" pentru a implementa conversia.

Dacă nu există `Symbol.toPrimitive` atunci JavaScript încearcă să le găsească și le încearcă în ordinea:

- `toString -> valueOf` pentru indiciul "string".
- `valueOf -> toString` în caz contrar.

De exemplu, aici `user` face același lucru ca mai sus folosind o combinație de `toString` și `valueOf`:

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

## Return types

Lucrul important de știut despre toate metodele de conversie primitivă este că nu returnează neapărat primitiva "indicată".

Nu există niciun control că `toString()` returnează exact un șir, sau că metoda `Symbol.toPrimitive` returnează un număr pentru un indiciu "number".

Singurul lucru obligatoriu: aceste metode trebuie să returneze o primitivă, nu un obiect.

```smart header="Note istorice"
Din motive istorice, dacă `toString` sau `valueOf` returnează un obiect, nu este o eroare, dar o astfel de valoare este ignorată (ca și cum metoda nu ar exista). Asta deoarece mai demult, în JavaScript nu exista un concept de "eroare" sănătos.

În contrast, `Symbol.toPrimitive` *trebuie* să returneze o primitivă, altfel va exista o eroare.
```

## Operații suplimentare

O instrucțiune care a inițiat conversia preia primitiva și apoi continuă să lucreze cu ea, aplicând conversii suplimentare dacă este necesar.

De exemplu:

- Operațiile matematice, cu excepția plusului binar, convertesc primitiva într-un număr:

    ```js run
    let obj = {
      // toString gestionează toate conversiile în absența altor metode
      toString() {
        return "2";
      }
    };

    alert(obj * 2); // 4, obiectul convertit în primitiva "2", apoi înmulțirea a făcut din aceasta un număr
    ```

- În aceeași situație plusul binar va concatena șirurile:

    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive a returnat string => concatenare)
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

În practică, este suficient să implementăm doar `obj.toString()` ca metodă "catch-all" pentru toate conversiile care returnează o reprezentare "lizibilă pentru om" a unui obiect, în scopuri de depanare sau logare.  
