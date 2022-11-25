# Ramificare condiționată: if, '?'

Uneori, trebuie să efectuăm acțiuni diferite în funcție de condiții diferite.

Pentru a face asta, putem folosi acest `if` și operatorul condițional `?`, care se mai numește și operatorul "semn de întrebare".

## Instrucțiunea "if"

Instrucțiunea `if(...)` evaluează o condiție între paranteze și, dacă rezultatul este `true`, execută un bloc de cod.

De exemplu:

```js run
let year = prompt('În ce an a fost publicată specificația ECMAScript-2015?', '');

*!*
if (year == 2015) alert( 'Ai dreptate!' );
*/!*
```

În exemplul de mai sus, condiția este o simplă verificare a egalității (`year == 2015`), dar poate fi mult mai complexă.

Dacă vrem să executăm mai mult de o instrucțiune, trebuie să înfășurăm blocul nostru de cod în interiorul unor acolade:

```js
if (year == 2015) {
  alert( "Este corect!" );
  alert( "Ești atât de deștept!" );
}
```

Vă recomandăm să vă înfășurați blocul de cod cu acolade `{}` de fiecare dată când folosiți o instrucțiune `if`, chiar dacă există doar o singură instrucțiune de executat. Procedând astfel se îmbunătățește lizibilitatea.

## Conversia boolean

Instrucțiunea `if (...)` evaluează expresia din paranteze și convertește rezultatul în boolean.

Să ne reamintim regulile de conversie din capitolul <info:type-conversions>:

- Un număr `0`, un string gol `""`, `null`, `undefined` și `NaN` devin toate `false`. Din acest motiv, ele sunt numite valori "falsy".
- Alte valori devin `true`, de aceea se numesc "truthy".

Așadar, codul din această condiție nu se va executa niciodată:

```js
if (0) { // 0 este falsy
  ...
}
```

...și în interiorul acestei condiții -- întotdeauna va fi așa:

```js
if (1) { // 1 este truthy
  ...
}
```

Putem de asemenea să transmitem o valoare boolean pre-evaluată la `if`, astfel:

```js
let cond = (year == 2015); // egalitatea se evaluează la true sau false

if (cond) {
  ...
}
```

## Clauza "else"

Instrucțiunea `if` poate conține un bloc opțional "else". Acesta se execută atunci când condiția este falsy.

De exemplu:
```js run
let year = prompt('În ce an a fost publicată specificația ECMAScript-2015?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // orice valoare cu excepția 2015
}
```

## Mai multe condiții: "else if"

Uneori, ne-ar place să testăm mai multe variante ale unei condiții. Clauza `else if` ne permite să facem asta.

De exemplu:

```js run
let year = prompt('În ce an a fost publicată specificația ECMAScript-2015?', '');

if (year < 2015) {
  alert( 'Prea devreme...' );
} else if (year > 2015) {
  alert( 'Prea târziu' );
} else {
  alert( 'Exact!' );
}
```

În codul de mai sus, JavaScript verifică mai întâi `year < 2015`. Dacă este falsy, trece la următoarea condiție `year > 2015`. Dacă și aceasta este falsy, afișează ultimul `alert`.

Pot fi mai multe blocuri `else if`. Ultimul `else` este opțional.

## Operatorul condițional '?'

Uneori, trebuie să atribuim o variabilă care depinde de o condiție.

De exemplu:

```js run no-beautify
let accessAllowed;
let age = prompt('Câți ani ai?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Așa-numitul operator "condițional" sau "semn de întrebare" ne lasă să facem asta într-un mod mai scurt și simplu.

Operatorul este reprezentat de un semn de întrebare `?`. Uneori se numește "ternary", deoarece operatorul are trei operanzi. De fapt este singurul și unicul operator din JavaScript care are atât de mulți.

Sintaxa este:
```js
let result = condition ? value1 : value2;
```

Se evaluează `condition`: dacă este truthy atunci se returnează `value1`, altfel -- `value2`.

De exemplu:

```js
let accessAllowed = (age > 18) ? true : false;
```

Din punct de vedere tehnic, putem omite parantezele din jurul lui `age > 18`. Operatorul semn de întrebare are o precedență scăzută, deci se execută după comparația `>`.

Acest exemplu va face același lucru ca și cel precedent:

```js
// operatorul de comparație "age > 18" se execută oricum primul
// (nu este nevoie să îl punem între paranteze)
let accessAllowed = age > 18 ? true : false;
```

Dar parantezele fac codul mai ușor de citit, așa că vă recomandăm să le folosiți.

````smart
În exemplul de mai sus, puteți evita utilizarea operatorului semn de întrebare deoarece comparația în sine returnează `true/false`:

```js
// același
let accessAllowed = age > 18;
```
````

## Multiple '?'

O secvență de operatori de semne de întrebare `?` poate returna o valoare care depinde de mai mult de o condiție.

De exemplu:
```js run
let age = prompt('Vârsta?', 18);

let message = (age < 3) ? 'Bună, dragă!' :
  (age < 18) ? 'Bună!' :
  (age < 100) ? 'Salutări!' :
  'Ce vârstă neobișnuită!';

alert( message );
```

Ar putea fi dificil la început să înțelegem ce se întâmplă. Dar după o privire mai atentă, putem vedea că este doar o secvență obișnuită de teste:

1. Primul semn de întrebare verifică dacă `age < 3`.
2. Dacă este adevărat -- se returnează `'Bună, puiule!'`. În caz contrar, continuă spre expresia de după două puncte '":"', verificând `age < 18`.
3. Dacă este adevărat -- returnează `'Bună!'`. În caz contrar, continuă cu expresia de după următoarele două puncte '":"', verificând `age < 100`.
4. Dacă acest lucru este adevărat -- returnează `'Salutări!'`. În caz contrar, continuă cu expresia de după ultimele două puncte '":"', returnând `'Ce vârstă neobișnuită!'`.

Iată cum arată acest lucru folosind `if..else`:

```js
if (age < 3) {
  message = 'Bună, puiule!';
} else if (age < 18) {
  message = 'Bună!';
} else if (age < 100) {
  message = "Salutări!";
} else {
  message = "Ce vârstă neobișnuită!";
}
```

## Utilizarea netradițională a lui "?"

Uneori semnul de întrebare `?` este folosit ca înlocuitor pentru `if`:

```js run no-beautify
let company = prompt('Ce companie a creat JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Corect!') : alert('Greșit.');
*/!*
```

În funcție de condiția `company == 'Netscape'`, prima sau a doua expresie de după `?` se execută și afișează o alertă.

Aici nu atribuim un rezultat unei variabile. În schimb, executăm un cod diferit în funcție de condiție.

**Nu este recomandat să folosim operatorul semn de întrebare în acest mod.**

Notația este mai scurtă decât instrucțiunea echivalentă `if`, ceea ce îi atrage pe unii programatori. Dar este mai puțin lizibilă.

Iată același cod folosind `if` pentru comparație:

```js run no-beautify
let company = prompt('Ce companie a creat JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Corect!');
} else {
  alert('Greșit.');
}
*/!*
```

Ochii noștri scanează codul pe verticală. Blocurile de cod care se întind pe câteva linii sunt mai ușor de înțeles decât un set de instrucțiuni lung și orizontal.

Scopul operatorului cu semnul întrebării `?` este de a returna o valoare sau alta în funcție de condiția sa. Vă rugăm să îl folosiți exact pentru acest lucru. Folosiți `if` atunci când trebuie să executați diferite branșe de cod.
