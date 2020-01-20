
# Obiecte

Așa cum știm din capitolul <info:types>, în JavaScript există șapte tipuri de date. Șase dintre ele sunt denumite "primitive", pentru că ele conțin numai un singur lucru (fie un string, un număr sau altceva).

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

Luați aminte că, la stânga operatorului `in` trebuie sa fie un *nume de proprietate*. Uzual numele este un șir de caractere între ghilimele.

Dacă omitem ghilimelele, asta ar însemna că o variabilă care conține de fapt numele va fi testată. De exemplu:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, obține numele din key și verifică dacă există această proprietate
```

````smart header="Folosirea lui \"in\" pentru proprietăți care conțin `undefined`"
În mod normal, comparația strictă `"=== undefined"` verifică existența proprietății foarte bine. Există însă un caz unde eșuează, cu toate că operatorul `"in"` funcționează corect.

Se întâmplă atunci când proprietatea există, dar conține `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // este ”undefined”, deci - nu există proprietatea?

alert( "test" in obj ); // true, proprietatea există!
```


In codul de mai sus, proprietatea `obj.test` tehnic există. Deci operatorul `in` funcționează corespunzător.

Situații de genul ăsta apar foarte rar, deoarece `undefined` nu este asignat în mod normal. Cel mai des folosim `null` pentru "unknown" sau valori "empty". Prin urmare operatorul `in` este un element exotic în codul nostru.
````

## Bucla "for..in"

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


### Ordonarea ca un obiect

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

## Copierea prin referință

Una dintre diferențele fundamentale dintre obiecte și primitive este că obiectele sunt stocate și copiate "după referință".

Valorile primitivelor: șiruri, numere, booleane -- sunt atribuite / copiate ca "valoare întreagă".

De exemplu:

```js
let message = "Hello!";
let phrase = message;
```

Ca rezultat avem două variabile independente, fiecare dintre ele stochează șirul `"Hello!"`.

![](variable-copy-value.svg)

Obiectele nu sunt așa.

**O variabilă nu stochează obiectul în sine, ci "adresa lui în memorie", cu alte cuvinte "o referință" la el.**

Mai jos este imaginea obiectului:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Aici, obiectul este stocat undeva în memorie, iar variabila `user` are o "referință" la el.

**Când o variabilă obiect este copiată -- referința este copiată, obiectul nu este duplicat.**

Dacă ne imaginăm obiectul ca un sertar, atunci variabila este o cheie pentru sertar. Copierea unei variabile duplică cheia, dar nu sertarul în sine.

De exemplu:

```js no-beautify
let user = { name: "John" };

let admin = user; // copiază referința
```

Acum avem două variabile, fiecare dintre ele cu referință la același obiect:

![](variable-copy-reference.svg)

Putem utiliza oricare dintre variabile pentru a accesa sertarul și a-i modifica conținutul:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // modificat de referința "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', modificările sunt văzute prin referința "user"
```

Exemplul de mai sus demonstrează ca există doar un obiect. Ca și cum am avea un sertar cu două chei și folosim una dintre ele (`admin`) să-l deschidem. Apoi, dacă mai târziu folosim cealaltă cheie (`user`) putem vedea modificările.

### Compararea prin referință

Operatorii de egalitate `==` și egalitate strictă `===` funcționează la fel și pentru obiecte.

**Două obiecte sunt egale numai dacă ele reprezintă același obiect.**

De exemplu, dacă două variabile fac referire la același obiect, acestea sunt egale:

```js run
let a = {};
let b = a; // copiază referința

alert( a == b ); // true, ambele variabile fac referire la același obiect
alert( a === b ); // true
```

Iar aici, două obiecte independente nu sunt egale, deși ambele sunt goale:

```js run
let a = {};
let b = {}; // două obiecte independente

alert( a == b ); // false
```

Pentru comparații de genul `obj1 > obj2` sau pentru o comparație contra unei primitive `obj == 5`, obiectele sunt convertite la primitive. Vom studia cum funcționează conversia obiectelor în curând, dar pentru a spune adevărul, asemenea comparații rareori sunt necesare si de obicei sunt un rezultat al unei greșeli de programare.

### Obiectul declarat const

Un obiect declarat cu `const` *poate* fi modificat.

De exemplu:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

Poate părea că linia `(*)` va genera o eroare, dar nu, nu este absolut nicio problemă. Asta deoarece `const` fixează doar valoarea lui `user` în sine. Iar aici `user` stochează referința către același obiect tot timpul. Linia `(*)` este *în interiorul* obiectului, și nu realocă `user`-ul.

Atribuirea `const` va genera o eroare dacă încercăm să-i atribuim altceva, de exemplu:

```js run
const user = {
  name: "John"
};

*!*
// Eroare (nu putem reatribui user)
*/!*
user = {
  name: "Pete"
};
```

...Dar dacă am încerca să declarăm constantă o proprietate a obiectului? Astfel încât `user.age = 25` să genereze o eroare. Se poate și asta. Aceste aspecte le vom acoperi în capitolul <info:property-descriptors>.

## Clonarea și contopirea, Object.assign

Așadar, copierea unei variabile obiect creează o referință în plus la același obiect.

Dar dacă avem nevoie să duplicăm un obiect? Să creăm o copie independentă, o clonă?

Bineințeles că se poate, dar este nițel mai dificil, deoarece nu există o funcție incorporată în JavaScript care să facă acest lucru. De fapt, nu prea se folosește. Copierea prin referință este bună de cele mai multe ori.

Dar dacă ne dorim cu adevărat asta, atunci trebuie să creăm un obiect nou și să reproducem structura celui existent, prin iterarea proprietăților sale și copierea acestora la nivel primitiv.

Cum ar fi:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // un nou obiect gol

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// acum clone este o clona independentă
clone.name = "Pete"; // am modificat valoarea lui name

alert( user.name ); // tot John a rămas în obiectul original
```

De asemenea, putem utiliza metoda [Object.assign](mdn:js/Object/assign) pentru asta.

Sintaxa este:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Argumentele `dest`, și `src1, ..., srcN` (pot fi oricâte avem nevoie) sunt obiecte.
- Copiază proprietățile tuturor obiectelor `src1, ..., srcN` în obiectul destinație `dest`. Cu alte cuvinte, proprietățile tuturor argumentelor furnizate de la al doilea încolo sunt copiate în primul. După aceea returnează `dest`.

De exemplu, putem folosi această metodă pentru a contopi mai multe obiecte într-unul singur.
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copiază toate proprietățile din permissions1 și permissions2 în user
Object.assign(user, permissions1, permissions2);
*/!*

// acum user = { name: "John", canView: true, canEdit: true }
```

Dacă obiectul receptor (`user`) are deja aceeași proprietate, aceasta va fi rescrisă:

```js
let user = { name: "John" };

// rescrie name, adaugă isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// acum user = { name: "Pete", isAdmin: true }
```

Putem folosi `Object.assign` pentru a înlocui bucla pentru clonare simplă:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Copiază toate proprietățile obiectului `user` într-un obiect gol și apoi îl returnează. De fapt, la fel ca bucla, dar mai scurt.

Până acum am presupus că toate proprietățile obiectului `user` sunt primitive. Însă proprietățile pot fi referințe către alte obiecte. Ce facem cu ele?

De exemplu:
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

Acum nu mai este suficient să copiem `clone.sizes = user.sizes`, pentru că `user.sizes` este un obiect, și va fi copiat după referință. Deci `clone` și `user` vor partaja același obiect sizes:

Așa:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, același obiect

// user și clone partajează sizes
user.sizes.width++;       // modifică o proprietate într-un loc
alert(clone.sizes.width); // 51, vedem rezultatul în altă parte
```

Pentru a rezolva problema, ar trebui să folosim bucla de clonare care examinează fiecare valoare a lui `user[key]` iar dacă este un obiect să replicheze și structura acestuia. Acest proces se numește "clonare profundă".

<<<<<<< HEAD
Există un algoritm standard pentru clonarea profundă care gestionează cazul de mai sus și cazuri mai complexe, numit [Algoritm de clonare structurată](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data). Pentru a nu reinventa roata, putem folosi o implementare deja funcțională în librăria JavaScript [lodash](https://lodash.com), metoda se numește [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data). In order not to reinvent the wheel, we can use a working implementation of it from the JavaScript library [lodash](https://lodash.com), the method is called [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912



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

Obiectele sunt alocate și copiate prin referință. Cu alte cuvinte, o variabilă nu stochează valoarea obiectului, ci o "referință" (adresă în memorie) pentru valoare. Prin copierea unei asemenea variabile sau prin trecerea ei ca argument al unei funcții, se copiază acea referință, nu și obiectul. Toate operațiunile via referințe copiate (precum adăugare/ștergere proprietăți) sunt efectuate pe același obiect.

Pentru a face o "copie reală" (o clonă) putem folosi `Object.assign` sau  [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

Ceea ce am învățat în acest capitol se numește "obiect simplu", sau doar `Object`.

Există multe alte feluri de obiecte în JavaScript:

- `Array` pentru a stoca colecții ordonate de date,
- `Date` pentru a stoca informații despre dată și timp,
- `Error` pentru a stoca informațiile despre erori.
- ...Și așa mai departe.

Obiectele au caracteristicile lor speciale pe care le vom studia mai târziu. Câteodată oamenii spun ceva de genul "Array type" sau "Date type", dar formal ele nu sunt tipuri proprii , ci aparțin unui singur tip de date "object", pe care îl extind în diferite moduri.

Obiectele în JavaScript sunt foarte puternice. Aici am atins doar suprafața unui subiect care este cu adevărat imens. Vom lucra îndeaproape cu obiectele și vom învăța mai multe despre ele în alte părți ale tutorialului.
