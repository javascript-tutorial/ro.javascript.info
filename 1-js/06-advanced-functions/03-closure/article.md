
# Sfera variabilei, closure

JavaScript este un limbaj foarte orientat spre funcții. Acesta ne oferă o mare libertate. O funcție poate fi creată în orice moment, transmisă ca argument unei alte funcții, și ulterior apelată dintr-un cu totul alt loc din cod.

Știm deja că o funcție poate accesa variabile din afara ei (variabile "exterioare").

Dar ce se întâmplă dacă variabilele exterioare se schimbă de la crearea unei funcții? Va primi funcția valorile mai noi sau pe cele vechi?

Și dacă o funcție este transmisă ca argument și apelată dintr-un alt loc din cod, va avea acces la variabilele exterioare din noul loc?

Haideți să ne extindem cunoștințele pentru a înțelege aceste scenarii și altele mai complexe.

```smart header="Vom vorbi despre variabilele `let/const` aici"
În JavaScript, există 3 moduri de a declara o variabilă: `let`, `const` (cele moderne) și `var` (rămășița trecutului).

- În acest articol vom folosi variabilele `let` în exemple.
- Variabilele, declarate cu `const`, se comportă la fel, așa că acest articol se referă și la `const`.
- Vechiul `var` are câteva diferențe notabile, acestea vor fi acoperite în articolul <info:var>.
```

## Blocuri de cod

Dacă o variabilă este declarată în interiorul unui bloc de cod `{...}`, ea este vizibilă doar în interiorul acelui bloc.

De exemplu:

```js run
{
  // face o treabă cu variabile locale care nu ar trebui să fie văzute în exterior

  let message = "Bună ziua"; // vizibil doar în acest bloc

  alert(message); // Bună ziua
}

alert(message); // Error: message is not defined
```

Putem folosi acest lucru pentru a izola o bucată de cod care își face propria sarcină, cu variabile care îi aparțin doar ei:

```js run
{
  // afișează mesajul
  let message = "Bună ziua";
  alert(message);
}

{
  // afișează un alt mesaj
  let message = "La revedere";
  alert(message);
}
```

````smart header="Ar exista o eroare fără blocuri"
Vă rugăm să notați că, fără blocuri separate ar exista o eroare, dacă am folosi `let` cu numele variabilei existente:

```js run
// arată mesajul
let message = "Bună ziua";
alert(message);

// arată un alt mesaj
*!*
let message = "La revedere"; // Error: variable already declared
*/!*
alert(message);
```
````

Pentru `if`, `for`, `while` și așa mai departe, variabilele declarate în `{...}` sunt de asemenea vizibile doar în interior:

```js run
if (true) {
  let phrase = "Bună ziua!";

  alert(phrase); // Bună ziua!
}

alert(phrase); // Error, no such variable!
```

Aici, după ce `if` se termină, `alert` de mai jos nu va vedea `phrase`, de unde și eroarea.

Asta este grozav, deoarece ne permite să creăm variabile locale de bloc, specifice unei ramuri `if`.

Același lucru este valabil și pentru buclele `for` și `while`:

```js run
for (let i = 0; i < 3; i++) {
  // variabila i este vizibilă doar în interiorul acestui for
  alert(i); // 0, apoi 1, apoi 2
}

alert(i); // Eroare, nu există o astfel de variabilă
```

Vizual, `let i` se află în afara lui `{...}`. Dar construcția `for` este specială aici: variabila, declarată în interiorul ei, este considerată parte a blocului.

## Funcții imbricate

O funcție este numită "imbricată" atunci când este creată în interiorul altei funcții.

Acest lucru este posibil cu ușurință în JavaScript.

Îl putem folosi pentru a ne organiza codul, astfel:

```js
function sayHiBye(firstName, lastName) {

  // funcție helper imbricată pentru utilizat mai jos
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Bună ziua, " + getFullName() );
  alert( "La revedere, " + getFullName() );

}
```

Aici funcția *imbricată* `getFullName()` este făcută pentru conveniență. Aceasta poate accesa variabilele exterioare și astfel poate returna numele complet. Funcțiile imbricate sunt destul de frecvente în JavaScript.

Ceea ce este mult mai interesant, o funcție imbricată poate fi returnată: fie ca o proprietate a unui nou obiect ori ca un rezultat de sine stătător. Acesta poate fi apoi utilizat în altă parte. Indiferent unde, aceasta are în continuare acces la aceleași variabile exterioare.

Mai jos, `makeCounter` creează funcția "counter" care returnează următorul număr la fiecare invocare:

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

În ciuda faptului că sunt simple, variantele ușor modificate ale acestui cod au utilizări practice, de exemplu, ca [generator de numere aleatoare](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) pentru a genera valori aleatoare pentru testele automate.

Cum funcționează acest lucru? Dacă vom crea mai multe counters, vor fi ele independente? Ce se întâmplă cu variabilele aici?

Înțelegerea unor astfel de lucruri este excelentă pentru cunoștințele generale despre JavaScript și benefică pentru scenarii mai complexe. Așadar haideți să aprofundăm puțin.

## Mediu Lexical

```warn header="Aici sunt dragoni!"
Explicația tehnică aprofundată se găsește în cele ce urmează.

În măsura în care aș dori să evit detaliile low-level ale limbajului, orice înțelegere fără ele ar fi insuficientă și incompletă, așa că pregătiți-vă.
```

Pentru claritate, explicația este împărțită în mai mulți pași.

### Pasul 1. Variabile

În JavaScript, fiecare funcție care rulează, blocul de cod `{...}`, și scriptul ca întreg au un obiect intern (ascuns) asociat, cunoscut sub numele de *Mediu Lexical*.

Obiectul Lexical Environment este constituit din două părți:

1. *Environment Record* -- un obiect care stochează toate variabilele locale ca proprietăți ale acestuia (și alte informații, cum ar fi valoarea lui `this`).
2. O referință la *mediul lexical extern*, cel asociat cu codul extern.

**O "variabilă" este doar o proprietate a obiectului intern special, `Environment Record`. "A obține sau a modifica o variabilă" înseamnă "a obține sau a modifica o proprietate a acelui obiect".**

În acest cod simplu fără funcții, există un singur Mediu Lexical:

![lexical environment](lexical-environment-global.svg)

Acesta este așa-numitul Mediu Lexical *global*, asociat cu întregul script.

În imaginea de mai sus, dreptunghiul reprezintă Environment Record (stocare de variabile) iar săgeata reprezintă referința exterioară. Mediul Lexical global nu are o referință externă, de aceea săgeata indică `null`.

Pe măsură ce codul începe să se execute și continuă, Mediul Lexical se modifică.

Iată un cod puțin mai lung:

![mediu lexical](closure-variable-phrase.svg)

Dreptunghiurile din partea dreaptă demonstrează cum se modifică Mediul Lexical global în timpul execuției:

1. La pornirea scriptului, Mediul Lexical este prepopulat cu toate variabilele declarate.
    - Inițial, acestea se află în starea "Uninitialized". Aceasta este o stare internă specială, ceea ce înseamnă că motorul știe despre variabilă, dar nu poate fi referențiată până când nu este declarată cu `let`. Este aproape la fel ca și cum variabila nu ar exista.
2. Apoi apare definiția `let phrase`. Nu există încă o atribuire, deci valoarea ei este `undefined`. Putem folosi variabila din acest punct încolo.
3. Lui `phrase` i se atribuie o valoare.
4. `phrase` își schimbă valoarea.

Totul pare simplu deocamdată, nu?

- O variabilă este o proprietate a unui obiect intern special, asociată blocului/funcției/scriptului în curs de execuție.
- Lucrul cu variabilele înseamnă de fapt lucrul cu proprietățile acelui obiect.

```smart header="Mediul Lexical este un obiect din specificație"
"Mediul Lexical" este un obiect din specificație: el există doar "teoretic" în [specificația limbajului](https://tc39.es/ecma262/#sec-lexical-environments) pentru a descrie modul în care funcționează lucrurile. Nu putem obține acest obiect în codul nostru și să-l manipulăm direct.

De asemenea motoarele JavaScript îl pot optimiza, pot renunța la variabilele nefolosite pentru a economisi memorie și pot efectua alte trucuri interne, atâta timp cât comportamentul vizibil rămâne cel descris.
```

### Pasul 2. Function Declaration

O funcție este de asemenea o valoare, la fel ca o variabilă.

**Diferența este că o Function Declaration este instantaneu complet inițializată.**

Atunci când este creat un Mediu Lexical, o Function Declaration devine imediat o funcție gata de utilizare (spre deosebire de `let`, care este inutilizabilă până la declarație).

De aceea putem utiliza o funcție, declarată ca Function Declaration, chiar înainte de declarația propriu-zisă.

De exemplu, iată care este starea inițială a mediului lexical global atunci când adăugăm o funcție:

![](closure-function-declaration.svg)

Firește, acest comportament se aplică numai la Function Declaration, nu și la Function Expression în care atribuim o funcție unei variabile, cum ar fi `let say = function(name)...`.

### Pasul 3. Mediul Lexical interior și exterior

Atunci când rulează o funcție, la începutul apelului, se creează automat un nou mediu lexical pentru a stoca variabilele locale și parametrii apelului.

De exemplu, pentru `say("John")`, acesta arată astfel (execuția se află la linia marcată cu o săgeată):

<!--
    ```js
    let phrase = "Bună ziua";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Bună ziua, John
    ```-->

![](lexical-environment-simple.svg)

În timpul apelului funcției avem două medii lexicale: cel intern (pentru apelul funcției) și cel extern (global):

- Mediul Lexical intern corespunde execuției curente a lui `say`. Acesta are o singură proprietate: `name`, argumentul funcției. Am apelat `say("John")`, deci valoarea lui `name` este `"John"`.
- Mediul Lexical exterior este Mediul Lexical global. Acesta conține variabila `phrase` și funcția în sine.

Mediul Lexical intern are o referință la cel `extern`.

**Când codul vrea să acceseze o variabilă -- se caută mai întâi Mediul Lexical interior, apoi cel exterior, apoi cel mai exterior și așa mai departe până la cel global.**

Dacă o variabilă nu este găsită nicăieri, este o eroare în modul strict (fără `use strict`, o atribuire la o variabilă inexistentă creează o nouă variabilă globală, pentru compatibilitate cu codul vechi).

În acest exemplu căutarea se desfășoară după cum urmează:

- Pentru variabila `name`, `alert` din `say` o găsește imediat în Mediul Lexical intern.
- Când vrea să acceseze `phrase`, atunci nu există `phrase` la nivel local, așa că urmărește referința la Mediul Lexical exterior și o găsește acolo.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### Pasul 4. Returnarea unei funcții

Să ne întoarcem la exemplul `makeCounter`.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

La începutul fiecărui apel `makeCounter()`, se creează un nou obiect Lexical Environment, pentru a stoca variabilele pentru această execuție `makeCounter`.

Astfel avem două Medii Lexicale imbricate, la fel ca în exemplul de mai sus:

![](closure-makecounter.svg)

Ceea ce este diferit este că, în timpul execuției `makeCounter()`, este creată o mică funcție imbricată de o singură linie: `return count++`. Nu o executăm încă, ci doar o creăm.

Toate funcțiile își amintesc Mediul Lexical în care au fost create. Tehnic, nu există nici o magie aici: toate funcțiile au o proprietate ascunsă numită `[[Environment]]`, care păstrează referința spre Mediul Lexical în care a fost creată funcția:

![](closure-makecounter-environment.svg)

Astfel, `counter.[[Environment]]` are referință spre Mediul Lexical `{count: 0}`. Așa este cum funcția își amintește unde a fost creată, indiferent unde este apelată. Referința `[[Environment]]` este setată o singură dată și pentru totdeauna la momentul creării funcției.

Ulterior, când `counter()` este apelat, un nou Mediu Lexical este creat pentru apel, iar referința exterioară a Mediului său Lexical este preluată din `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Acum, atunci când codul din interiorul lui `counter()` caută variabila `count`, caută mai întâi în propriul său Mediu Lexical (gol, deoarece nu există variabile locale acolo), apoi în Mediul Lexical al apelului exterior `makeCounter()`, unde o găsește și o modifică.

**O variabilă este actualizată în Mediul Lexical în care trăiește.**

Iată care este starea după execuție:

![](closure-makecounter-nested-call-2.svg)

Dacă apelăm `counter()` de mai multe ori, variabila `count` va fi mărită la `2`, `3` și așa mai departe, în același loc.

```smart header="Closure"
Există un termen general de programare "closure", pe care dezvoltatorii ar trebui în general să-l cunoască.

Un [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) este o funcție care își amintește variabilele exterioare și le poate accesa. În unele limbaje, acest lucru nu este posibil, sau o funcție trebuie scrisă într-un mod special pentru a face acest lucru să se întâmple. Dar așa cum s-a explicat mai sus, în JavaScript, toate funcțiile sunt în mod natural closures (există o singură excepție, care va fi abordată în <info:new-function>).

Adică: ele își amintesc automat unde au fost create cu ajutorul unei proprietăți ascunse `[[Environment]]`, iar apoi codul lor poate accesa variabilele exterioare.

Atunci când, la un interviu, un dezvoltator frontend primește o întrebare despre "ce este un closure?", un răspuns valid ar fi o definiție a closure-ului și o explicație că toate funcțiile din JavaScript sunt closure-uri, și poate câteva cuvinte în plus despre detalii tehnice: proprietatea `[[Environment]]` și cum funcționează Mediile Lexicale.
```

## Colectarea gunoiului

De obicei, un Mediu Lexical este eliminat din memorie împreună cu toate variabilele după ce se termină apelul funcției. Acest lucru se datorează faptului că nu mai există referințe la acesta. Ca orice obiect JavaScript, este păstrat în memorie doar atât timp cât este accesibil.

Cu toate acestea, dacă există o funcție imbricată care este încă accesibilă după terminarea unei funcții, atunci aceasta are proprietatea `[[Environment]]` care face referire la Mediul Lexical.

În acel caz Mediul Lexical este încă accesibil chiar și după terminarea funcției, deci rămâne în viață.

De exemplu:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] stochează o referință la Mediul Lexical
// al apelului f() corespunzător
```

Vă rugăm să notați că, dacă `f()` este apelat de multe ori, iar funcțiile rezultate sunt salvate, atunci toate obiectele corespunzătoare Mediului Lexical vor fi de asemenea păstrate în memorie. În codul de mai jos, toate cele 3:

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// 3 funcții în matrice, fiecare dintre ele are legătură cu Mediul Lexical
// de la execuția corespunzătoare f()
let arr = [f(), f(), f()];
```

Un obiect Lexical Environment moare atunci când devine inaccesibil (la fel ca orice alt obiect). Cu alte cuvinte, acesta există doar atât timp cât există cel puțin o funcție imbricată care face referire la el.

În codul de mai jos, după ce funcția imbricată este eliminată, Mediul Lexical care o înconjoară (și prin urmare `value`) este curățat din memorie:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // cât timp există funcția g, valoarea rămâne în memorie

g = null; // ...și acum memoria este curățată
```

### Optimizări în viața reală

După cum am văzut, în teorie cât timp o funcție este activă, toate variabilele exterioare sunt de asemenea păstrate.

Dar în practică, motoarele JavaScript încearcă să optimizeze acest lucru. Ele analizează utilizarea variabilelor și dacă este evident din cod că o variabilă exterioară nu este utilizată -- aceasta este eliminată.

**Un efect secundar important în V8 (Chrome, Edge, Opera) este că o astfel de variabilă va deveni indisponibilă în depanare.**

Încercați să rulați exemplul de mai jos în Chrome cu Instrumente de dezvoltare deschise.

Când se întrerupe, în consolă tastați `alert(value)`.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // în consolă: tastați alert(value); Nu există o astfel de variabilă!
  }

  return g;
}

let g = f();
g();
```

După cum ați putut vedea -- nu există o astfel de variabilă! În teorie, ar trebui să fie accesibilă, dar motorul a optimizat-o.

Acest lucru poate duce la probleme de depanare amuzante (dacă nu ar fi atât de consumatoare de timp). Una dintre ele -- putem vedea o variabilă exterioară cu același nume în locul celei așteptate:

```js run global
let value = "Surpriză!";

function f() {
  let value = "cea mai apropiată valoare";

  function g() {
    debugger; // în consolă: tastați alert(value); Surpriză!
  }

  return g;
}

let g = f();
g();
```

Această caracteristică a V8 este bine de știut. Dacă faceți depanare cu Chrome/Edge/Opera, mai devreme sau mai târziu o veți întâlni.

Nu este o eroare a depanatorului, ci mai degrabă o caracteristică specială a V8. Poate că va fi schimbată cândva. Puteți oricând să o verificați rulând exemplele de pe această pagină.
