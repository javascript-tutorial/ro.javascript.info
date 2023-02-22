# Recursion și stack

Să ne întoarcem la funcții și să le studiem mai în profunzime.

Primul nostru subiect va fi *recursiunea*.

Dacă nu sunteți noi în programare, atunci probabil că vă este familiar și puteți sări peste acest capitol.

Recursiunea este un tipar de programare care este util în situațiile în care o sarcină poate fi împărțită în mod natural în mai multe sarcini de același tip, dar mai simple. Sau atunci când o sarcină poate fi simplificată într-o acțiune ușoară plus o variantă mai simplă a aceleiași sarcini. Sau, după cum vom vedea în curând, pentru a trata anumite structuri de date.

Atunci când o funcție îndeplinește o sarcină, în acest proces poate apela multe alte funcții. Un caz parțial este atunci când o funcție se apelează pe sine *însăși*. Acest lucru se numește *recursiune*.

## Două moduri de a gândi

Pentru a începe cu ceva simplu -- să scriem o funcție `pow(x, n)` care ridică `x` la o putere naturală a lui `n`. Cu alte cuvinte, înmulțește `x` cu el însuși de `n` ori.

```js
pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16
```

Există două moduri de a o implementa.

1. Gândire iterativă: `for` loop:

    ```js run
    function pow(x, n) {
      let result = 1;

      // înmulțește rezultatul cu x de n ori în loop
      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    alert( pow(2, 3) ); // 8
    ```

2. Gândire recursivă: simplificând sarcină și apelânduse pe sine:

    ```js run
    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

    alert( pow(2, 3) ); // 8
    ```

Vă rugăm să observați că varianta recursivă este fundamental diferită.

Atunci când `pow(x, n)` este apelată, execuția se împarte în două ramuri:

```js
              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

1. Dacă `n == 1`, atunci totul este trivial. Se numește *baza* recursiunii, pentru că produce imediat rezultatul cel evident: `pow(x, 1)` egal cu `x`.
2. În caz contrar, putem reprezenta `pow(x, n)` ca și `x * pow(x, n - 1)`. În matematică, am putea scrie <code>x<sup>n</sup> = x * x<sup>n-1</sup></code>. Acesta se numește *un pas recursiv*: transformăm sarcina într-o acțiune mai simplă (multiplicare cu `x`) și un apel mai simplu al aceleiași sarcini (`pow` cu `n` mai mic). Următorii pași o simplifică mai mult și mai mult până când `n` ajunge la `1`.

Putem de asemenea spune că `pow` *se apelează recursiv pe sine* până când `n == 1`.

![recursive diagram of pow](recursion-pow.svg)


De exemplu, pentru a calcula `pow(2, 4)`, varianta recursivă face acești pași:

1. `pow(2, 4) = 2 * pow(2, 3)`
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

Așadar, recursivitatea reduce un apel de funcție la unul mai simplu, și apoi -- la unul și mai simplu, și așa mai departe, până când rezultatul devine evident.

````smart header="Recursiunea este de obicei mai scurtă"
O soluție recursivă este de obicei mai scurtă decât una iterativă.

Aici putem rescrie același lucru folosind operatorul condițional `?` în loc de `if` pentru a face `pow(x, n)` mai consic și totuși foarte ușor de citit:

```js run
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
```
````

Numărul maxim de apeluri nested (inclusiv primul apel) se numește *profunzime de recursiune*. În cazul nostru, acesta va fi exact `n`.

Profunzimea maximă de recursivitate este limitată de motorul JavaScript. Ne putem baza pe faptul că este 10000, unele motoare permit mai mult, dar 100000 este probabil în afara limitei pentru majoritatea acestora. Există optimizări automate care ajută la atenuarea acestui aspect ("tail calls optimizations"), dar acestea nu sunt încă acceptate peste tot și funcționează doar în cazuri simple.

Acest lucru limitează aplicarea recursivității, dar aceasta rămâne totuși foarte largă. Există multe sarcini în care modul recursiv de gândire oferă un cod mai simplu, mai ușor de întreținut.

## Execution context și stack

Acum să examinăm modul în care funcționează apelurile recursive. Pentru aceasta ne vom uita sub capota funcțiilor.

Informațiile despre procesul de execuție a unei funcții în curs de execuție sunt stocate în *execution context* al acesteia.

[Execution context](https://tc39.github.io/ecma262/#sec-execution-contexts) este o structură internă de date care conține detalii despre execuția unei funcții: unde se află acum fluxul de control, variabilele curente, valoarea lui `this` (nu o folosim aici) și alte câteva detalii interne.

Un apel de funcție are asociat exact un context de execuție.

Atunci când o funcție face un apel nested, se întâmplă următoarele:

- Funcția curentă este pusă pe pauză.
- Contextul de execuție asociat acesteia este reținut într-o structură de date specială numită *execution context stack*.
- Se execută apelul nested.
- După ce se termină, vechiul context de execuție este regăsit din stack, iar funcția exterioară este reluată de unde s-a oprit.

Să vedem ce se întâmplă în timpul apelului `pow(2, 3)`.

### pow(2, 3)

La începutul apelului `pow(2, 3)` contextul de execuție va stoca variabilele: `x = 2, n = 3`, fluxul de execuție se află la linia `1` a funcției.

Îl putem schița precum:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, la linia 1 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Asta este când funcția începe să se execute. Condiția `n == 1` este falsy, așa că fluxul continuă în a doua ramură a lui `if`:

```js run
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
*!*
    return x * pow(x, n - 1);
*/!*
  }
}

alert( pow(2, 3) );
```


Variabilele sunt aceleași, dar linia se schimbă, deci contextul este acum:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, la linia 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Pentru a calcula `x * pow(x, n - 1)`, trebuie să facem un subapel la `pow` cu noi argumente `pow(2, 2)`.

### pow(2, 2)

Pentru a efectua un apel nested, JavaScript își amintește contextul de execuție curent în *execution context stack*.

Aici apelăm aceeași funcție `pow`, dar acest lucru nu contează absolut deloc. Procesul este același pentru toate funcțiile:

1. Contextul curent este "reținut" deasupra stack-ului.
2. Noul context este creat pentru subapelare.
3. Când subapelul este terminat -- contextul anterior este săltat din stack, iar execuția sa continuă.

Acesta este context stack când am intrat în subapelul `pow(2, 2)`:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, la linia 1 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, la linia 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Noul context de execuție curent este în partea de sus (cu caractere îngroșate), iar contextele memorate anterior sunt mai jos.

Când terminăm subapelul -- este ușor să reluăm contextul anterior, deoarece acesta păstrează atât variabilele cât și locul exact al codului în care s-a oprit.

```smart
Aici în imagine folosim cuvântul "linie", deoarece în exemplul nostru există un singur subapel în linie, dar în general o singură linie de cod poate conține mai multe subapelări, cum ar fi `pow(...) + pow(...) + somethingElse(…)`.

Deci ar fi mai precis să spunem că execuția se reia "imediat după subapelare".
```

### pow(2, 1)

Procesul se repetă: se face un nou subapel la linia `5`, acum cu argumentele `x=2`, `n=1`.

Se creează un nou context de execuție, iar cel anterior este împins în partea de sus a stack-ului:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 1, la linia 1 }</span>
    <span class="function-execution-context-call">pow(2, 1)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, la linia 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, la linia 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Acum există 2 contexte vechi și 1 în curs de desfășurare pentru `pow(2, 1)`.

### Ieșirea

În timpul execuției lui `pow(2, 1)`, spre deosebire de înainte, condiția `n == 1` este truthy, astfel încât prima ramură din `if` funcționează:

```js
function pow(x, n) {
  if (n == 1) {
*!*
    return x;
*/!*
  } else {
    return x * pow(x, n - 1);
  }
}
```

Nu mai există alte apeluri nested, așa că funcția se termină, returnând `2`.

Deoarece funcția se termină, contextul său de execuție nu mai este necesar, așa că este șters din memorie. Cel anterior este restaurat din vârful stack-ului:


<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, la linia 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, la linia 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Se reia execuția lui `pow(2, 2)`. Ea are rezultatul subapelării `pow(2, 1)`, astfel încât poate termina evaluarea lui `x * pow(x, n - 1)`, returnând `4`.

Apoi se restabilește contextul anterior:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, la linia 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Când se termină, avem un rezultat `pow(2, 3) = 8`.

Adâncimea de recursivitate în acest caz a fost: **3**.

După cum putem vedea din ilustrațiile de mai sus, adâncimea de recursivitate este egală cu numărul maxim de contexte din stack.

Observați cerințele de memorie. Contextele ocupă memorie. În cazul nostru, ridicarea la puterea lui `n` necesită de fapt memorie pentru `n` contexte, pentru toate valorile mai mici ale lui `n`.

Un algoritm bazat pe loop este mai economic pentru memorie:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Iterativul `pow` utilizează un singur context care schimbă `i` și `result` în timpul procesului. Cerințele sale de memorie sunt mici, fixe și nu depind de `n`.

**Orice recursivitate poate fi rescrisă ca un loop. De obicei, varianta loop poate fi făcută mai eficientă.**

...Dar uneori rescrierea nu este trivială, în special atunci când o funcție utilizează diferite subapelări recursive în funcție de condiții și fuzionează rezultatele acestora sau când ramificarea este mai complexă. Iar optimizarea poate fi inutilă și nu merită în totalitate eforturile depuse.

Recursivitatea poate oferi un cod mai scurt, ușor de înțeles și de susținut. Optimizările nu sunt necesare în orice loc, de cele mai multe ori avem nevoie de un cod bun, de aceea este folosit.

## Traversări recursive

O altă aplicație excelentă a recursivității este traversarea recursivă.

Imaginați-vă, că avem o companie. Structura personalului poate fi prezentată ca un obiect:

```js
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};
```

Cu alte cuvinte, o companie are departamente.

- Un departament poate avea o serie de angajați. De exemplu, departamentul `sales` are 2 angajați: John și Alice.
- Sau un departament poate fi împărțit în subdepartamente, cum ar fi `development` care are două ramuri: `sites` și `internals`. Fiecare dintre ele are propriul personal.
- De asemenea este posibil ca atunci când un subdepartament se dezvoltă, să se împartă în subdepartamente (sau echipe).

    De exemplu, în viitor departamentul `sites` se poate împărți în echipe pentru `siteA` și `siteB`. Și acestea, potențial, se pot împărți și mai mult. Asta nu este pe imagine, doar ceva de avut în vedere.

Acum să spunem că dorim o funcție care să obțină suma tuturor salariilor. Cum putem face acest lucru?

O abordare iterativă nu este ușoară, deoarece structura nu este simplă. Prima idee ar putea fi să facem un `for` loop pe `company` cu o subbuclă nested pe departamentele de nivelul 1. Dar apoi avem nevoie de mai multe bucle secundare nested pentru a itera peste personalul din departamentele de al doilea nivel cum ar fi `sites`... Și apoi o altă sub buclă în interiorul acestora pentru departamentele de al treilea nivel care ar putea apărea în viitor? Dacă punem 3-4 subbucle nested în cod pentru a traversa un singur obiect, devine destul de urât.

Să încercăm recursivitatea.

După cum putem vedea, atunci când funcția noastră primește un departament pentru a însuma, există două cazuri posibile:

1. Fie este vorba de un departament "simplu" cu un *array* de persoane -- atunci putem însuma salariile într-un simplu loop.
2. Fie este *un obiect* cu `N` subdepartamente -- atunci putem face `N` apeluri recursive pentru a obține suma pentru fiecare dintre subdepartamente și combina rezultatele.

Primul caz este baza recursivității, cazul trivial, când obținem un array.

Al 2-lea caz, când obținem un obiect, este pasul recursiv. O sarcină complexă este împărțită în subsarcini pentru departamente mai mici. La rândul lor acestea se pot împăsți din nou, dar mai devreme sau mai târziu împărțirea se va termina la (1).

Algoritmul este probabil și mai ușor de citit din cod:


```js run
let company = { // același obiect, comprimat pentru simplificare
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// Funcția care face treaba
*!*
function sumSalaries(department) {
  if (Array.isArray(department)) { // cazul (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // însumează array-ul
  } else { // cazul (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // apelează recursiv pentru subdepartamente, însumează rezultatele
    }
    return sum;
  }
}
*/!*

alert(sumSalaries(company)); // 7700
```

Codul este scurt și ușor de înțeles (sperăm?). Aceasta este puterea recursivității. Funcționează de asemenea pentru orice nivel nested a subdepartamentului.

Iată diagrama de apeluri:

![recursive salaries](recursive-salaries.svg)

Putem vedea cu ușurință principiul: pentru un obiect `{...}` se fac subapeluri, în timp ce array-urile `[...]` sunt "frunzele" din recursion tree, ele dau un rezultat imediat.

Observați că codul folosește caracteristici inteligente pe care le-am mai acoperit:

- Metoda `arr.reduce` explicată în capitolul <info:array-methods> pentru a obține suma array-ului.
- Bucla `for(val of Object.values(obj))` pentru a itera peste valorile obiectului: `Object.values` returnează un array al acestora.


## Structuri recursive

O structură de date recursivă (definită în mod recursiv) este o structură care se reproduce pe sine în părți.

Tocmai am văzut-o în exemplul structurii unei companii de mai sus.

Un *departament* al unei companii este:
- Fie un array de persoane.
- Ori un obiect cu *departamente*.

Pentru dezvoltatorii web există exemple mult mai bine cunoscute: Documentele HTML și XML.

În documentul HTML, un *HTML-tag* poate conține o listă de:
- Bucăți de text.
- Comentarii HTML.
- Alte *tag-uri HTML* (care, la rândul lor, pot conține bucăți de text/comentarii sau alte tag-uri etc).

Aceasta este din nou o definiție recursivă.

Pentru o mai bună înțelegere, vom acoperi încă o structură recursivă numită "Linked list" care ar putea fi o alternativă mai bună pentru array-uri în anumite cazuri.

### Linked list

Imaginați-vă, că dorim să stocăm o listă ordonată de obiecte.

Alegerea naturală ar fi un array:

```js
let arr = [obj1, obj2, obj3];
```

...Dar există o problemă cu array-urile. Operațiile "delete element" și "insert element" sunt costisitoare. De exemplu, operația `arr.unshift(obj)` trebuie să renumere toate elementele pentru a face loc unui nou `obj`, iar dacă array-ul este mare, durează mult. La fel cu `arr.shift()`.

Singurele modificări structurale care nu necesită renumerotare în masă sunt cele care operează la sfârșitul array-ului: `arr.push/pop`. Deci un array poate fi destul de lent pentru cozile mari, atunci când trebuie să lucrăm cu începutul.

Alternativ, dacă avem cu adevărat nevoie de inserție/ștergere rapidă, putem alege o altă structură de date numită [linked list](https://en.wikipedia.org/wiki/Linked_list).

*Elementul linked list* este definit recursiv ca un obiect cu:
- `value`.
- proprietatea `next` care face referire la următorul *element din linked list* sau `null` dacă acesta este sfârșitul.

De exemplu:

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Reprezentarea grafică a listei:

![linked list](linked-list.svg)

Un cod alternativ pentru creare:

```js no-beautify
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
```

Aici putem vedea și mai clar că există mai multe obiecte, fiecare dintre ele având `value` și `next` care indică vecinul. Variabila `list` este primul obiect din lanț, deci urmărind indicatoarele `next` de la ea putem ajunge la orice element.

Lista poate fi ușor împărțită în mai multe părți și ulterior reunită la loc:

```js
let secondList = list.next.next;
list.next.next = null;
```

![linked list split](linked-list-split.svg)

Pentru a se uni:

```js
list.next.next = secondList;
```

Și cu siguranță putem introduce sau elimina elemente în orice loc.

De exemplu, pentru a o prelungi cu o valoare nouă, trebuie să actualizăm capul listei:

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

*!*
// se prelungește noua valoare la listă
list = { value: "new item", next: list };
*/!*
```

![linked list](linked-list-0.svg)

Pentru a elimina o valoare din mijloc, schimbați `next` din cea anterioară:

```js
list.next = list.next.next;
```

![linked list](linked-list-remove-1.svg)

Am făcut ca `list.next` să sară peste `1` la valoarea `2`. Valoarea `1` este acum exclusă din lanț. Dacă nu este stocată în altă parte, ea va fi eliminată automat din memorie.

Spre deosebire de array-uri, nu există o renumerotare în masă, putem rearanja cu ușurință elementele.

Firește, listele nu sunt întotdeauna mai bune decât array-urile. Altfel toată lumea ar folosi numai liste.

The main drawback is that we can't easily access an element by its number. In an array that's easy: `arr[n]` is a direct reference. But in the list we need to start from the first item and go `next` `N` times to get the Nth element.

...But we don't always need such operations. For instance, when we need a queue or even a [deque](https://en.wikipedia.org/wiki/Double-ended_queue) -- the ordered structure that must allow very fast adding/removing elements from both ends, but access to its middle is not needed.

Lists can be enhanced:
- We can add property `prev` in addition to `next` to reference the previous element, to move back easily.
- We can also add a variable named `tail` referencing the last element of the list (and update it when adding/removing elements from the end).
- ...The data structure may vary according to our needs.

## Summary

Terms:
- *Recursion*  is a programming term that means calling a function from itself. Recursive functions can be used to solve tasks in elegant ways.

    When a function calls itself, that's called a *recursion step*. The *basis* of recursion is function arguments that make the task so simple that the function does not make further calls.

- A [recursively-defined](https://en.wikipedia.org/wiki/Recursive_data_type) data structure is a data structure that can be defined using itself.

    For instance, the linked list can be defined as a data structure consisting of an object referencing a list (or null).

    ```js
    list = { value, next -> list }
    ```

    Trees like HTML elements tree or the department tree from this chapter are also naturally recursive: they have branches and every branch can have other branches.

    Recursive functions can be used to walk them as we've seen in the `sumSalary` example.

Any recursive function can be rewritten into an iterative one. And that's sometimes required to optimize stuff. But for many tasks a recursive solution is fast enough and easier to write and support.
