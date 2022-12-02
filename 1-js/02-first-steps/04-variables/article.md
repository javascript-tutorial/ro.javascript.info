`# Variabile

În cea mai mare parte a timpului, o aplicație JavaScript are nevoie să lucreze cu informații. Aici sunt două example:
1. Un magazin online -- informația ar putea include bunurile vândute și un coș de cumpărături.
2. O aplicație de chat -- informația ar putea include utilizatori, mesaje, și mult mai multe.

Variabilele sunt folosite pentru a stoca această informație.

## O variabilă

O [variabilă](https://en.wikipedia.org/wiki/Variable_(computer_science)) este un "spațiu de stocare numit" pentru date. Putem folosi variabile pentru a stoca bunuri, visitatori, și alte date.

Pentru a crea o variabilă în JavaScript, folosim termenul`let` .

Declarația de mai jos crează (în alte cuvinte: *declară*) o variabilă cu numele "message":

```js
let message;
```

Acum, putem pune niște date în aceasta folosind operatorul de alocare `=`:

```js
let message;

*!*
message = 'Bună'; // stochează șirul 'Hello' în variabila numită mesaj
*/!*
```

Șirul este acum salvat în zona de memorie asociată cu variabila. Putem să o accesăm folosind numele variabilei:

```js run
let message;
message = 'Bună!';

*!*
alert(message); // arată conținutul variabilei
*/!*
```

Ca să fim conciși, putem să combinăm declarația variabilei și desemnarea ei într-o singură linie:

```js run
let message = 'Bună!'; // definește variabila și îi asignează valoarea

alert(message); // Bună!
```

De asemenea putem declara multiple variabile într-o singură linie:

```js no-beautify
let user = 'John', age = 25, message = 'Bună';
```

Asta ar putea să apară mai scurt, dar nu recomandăm. De dragul unei lizibilități mai bune, te rugăm să folosești o singură linie de variabilă.

Varianta pe mai multe linii este puțin mai lungă, dar mai ușor de citit:

```js
let user = 'John';
let age = 25;
let message = 'Bună';
```

Unele persoane definesc, de asemenea, multiple variabile în acest stil pe mai multe linii:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Bună';
```

...Sau chiar în "prima-virgulă" ca stil:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Bună';
```

Technic, toate aceste variante fac același lucru. Deci, este o problemă de preferință personală și de estetică..

````smart header="`var` instead of `let`"
În transcrieri mai vechi, ai putea găsi de asemenea un alt termen: `var` în loc de `let`:

```js
*!*var*/!* message = 'Bună';
```

Termenul `var` este *aproape* la fel ca și `let`. Declară de asemenea o variabilă, dar într-un mod ușor diferit, de "școală-veche".

Există diferențe subtile între `let` și `var`, dar nu contează pentru noi acum. O să le acoperim în detaliu în capitolul <info:var>.
````

## O analogie din viața reală

Putem înțelege ușor conceptul de "variabilă" dacă ne-o imaginăm drept o "cutie" pentru date, cu un abțibild cu nume unic pe ea.

De exemplu, variabila `message` poate fi imaginată drept o cutie cu eticheta `"mesaj"` cu valoarea `"Bună!"` în ea:

![](variable.svg)

Putem pune orice valoare în cutie.

De asemenaea o putem schimba de câte ori vrem:
```js run
let message;

message = ''Bună!';

message = 'Lume!'; // valoare schimbată

alert(message);
```

Când valoarea este schimbată, data veche este stearsă din variabilă:

![](variable-change.svg)

De asemenea putem declara două variabile și copia datele din una în cealaltă..

```js run
let hello = ''Buna lume!!';

let message;

*!*
// copiază 'Bună lume' din bună în mesaj
message = hello;
*/!*

// acum cele două variabile conțin aceleași date
alert(hello); // Bună lume!
alert(message); // Bună lume!
```

````warn header="Declaring twice triggers an error"
O viariabilă ar trebui declarată o singură dată.

O repetare a declarației a aceleași variabile este o eroare:

```js run
let message = "Acesta";

// 'let' repetat duce la o eroare
let message = "Acesta"; // SyntaxError: 'message' a fost deja declarat
```
Deci, ar trebui să declarăm o variabilă o dată și apoi să ne referim la aceasta fără `let`.
````

```smart header="Functional languages"
Este interesant de notat dacă acolo există acele numite [funcțional pure](https://en.wikipedia.org/wiki/Purely_functional_programming) limbaje de programare, cum ar fi [Haskell](https://en.wikipedia.org/wiki/Haskell), care interzic schimbarea valorii variabilelor.

În limbaje ca acestea, odată ce valoarea este stocată "în cutie", există acolo pentru totdeauna. Dacă avem nevoie să stocăm altceva, limbajul ne forțează să creăm o nouă cutie (declarăm o nouă variabilă). Nu o putem refolosi pe cea veche.

Deși pare un pic ciudat la prima vedere, aceste limbaje sunt destul de capabile de dezvoltare serioasă. Mai mult decât atât, sunt zone ca de exemplu calcule paralele unde această limitare conferă beneficii sigure.
```

## Denumirea variabilelor  [#variable-naming]

Există două limitări în denumirea variabilelor în JavaScript:

1. Numele trebuie să conțină doar litere, numere, sau simboluri `$` și `_`.
2. Primul caracter nu trebuie să fie o cifră.

Exemple de nume valide:

```js
let userName;
let test123;
```

Când numele conține cuvinte multiple, [camelCase](https://en.wikipedia.org/wiki/CamelCase) este folosit adesea. Acesta este: cuvintele vin unul după celălalt, fiecare cuvânt exceptând primul care începe cu majusculă: `numeleMeuFoarteLung`.

Ceea ce este interesant -- semnul de dolar `'$'` și bară jos `'_'` pot fi de asemenea folosite în nume. Acestea sunt simboluri obișnuite, la fel ca și literele, fără însemnătate specială.

Aceste nume sunt valide:

```js run untrusted
let $ = 1; // declarăm o variabilă cu numele "$"
let _ = 2; // și apoi o variabilă cu numele "_"

alert($ + _); // 3
```

Examples of incorrect variable names:

```js no-beautify
let 1a; // nu poate începe cu o cifră

let my-name; // și apoi o variabilă cu numele "_"
```

```smart header="Case matters"
Variabilele numite `apple` și `APPLE` sunt două variabile diferite.
```

````smart header="Non-Latin letters are allowed, but not recommended"
Este posibil să folosim orice limbă, inclusiv litere chirilice, caractere chinezești și altele, precum acestea:

```js
let имя = '...';
let 我 = '...';
```

Technic, aici nu este nicio greșeală. Astfel de nume sunt permise, dar există o convenție internațională de a folosi limba engleză în denumirile variabilelor. Chiar dacă sunt scrise cu litere mici, pot avea viață lungă. Oamenii din alte țări  ar putea avea nevoie să le citescă uneori.
````

````warn header="Reserved names"
Există o [listă de cuvinte rezervate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), care nu poate fi folostă ca nume de variabile pentru că sunt folosite de către limbajul însuși.

De exemplu:  `let`, `class`, `return`, and `function` sunt rezervate..

Codul următor dă eroare de sintaxă:

```js run no-beautify
let let = 5; // nu putem numi o variabilă "let", eroare!
let return = 5; // de asemenea nu o putem numi "return", eroare!
```
````

````warn header="An assignment without `use strict`"

În mod normal, avem nevoie să definim o variabilă înainte să o folosim. Dar în timpurile vechi, era technic posibil să creezi o variabilă prin simpla alocare a unei valori fără a folosi `let`. Acesta încă funcționează acum dacă nu punem `use strict` în textul nostru pentru a menține compatibilitatea cu textele vechi.

```js run no-strict
// notă: nu există "use strict" în acest exemplu

num = 5; // variabila "num" este creată chiar dacă nu există

alert(num); // 5
```

Aceasta este o practică greșită și ar putea produce o eroare în modul strict:

```js
"use strict";

*!*
num = 5; // eroare: num nu este definit
*/!*
```
````

## Constante

Pentru a declara o constantă (care nu se schimbă) variabilă, folosim `const` în loc de `let`:

```js
const myBirthday = '18.04.1982';
```

Variabilele declarate folosind `const` se numesc "constante". Ele nu pot fi realocate. O încercare de a face acest lucru va produce o eroare:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // eroare, nu nputem realoca constanta!
```

Când un programator este sigur că acea variabilă nu se va schimba niciodată, o poate declara folosind `const` pentru a garanta și a comunica clar acest fapt tuturor.


### Constante cu majuscule

Este o practica răspândită de a folosi constante drept așa-zise valori greu de reținut care sunt cunoscute înainte de execuție.

Aceste constante sunt denumite folosind majuscule și bară jos.

De exemplu, să facem o constantă pentru culori în așa-numitul "web" (hexadecimal) format:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...când avem nevoie să alegem o culoare
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Beneficii:

- `COLOR_ORANGE` este mai ușor de reținut decât  `"#FF7F00"`.
- Este mai ușor de greșit  `"#FF7F00"` decât `COLOR_ORANGE`.
- Când citim codul, `COLOR_ORANGE` are o mai mmare însemnătate  `#FF7F00`.

Când ar trebui să folosim majuscule pentru o constantă și când ar trebui să o denumim în mod obișnuit? Haideți să clarificăm acest lucru.

A fi o "constantă" înseamnă doar a fi o valoare a unei variabile care nu se schimbă. Dar există și constante care sunt cunoscute înainte de execuție (ca de exemplu valoarea hexadecimală pentru roșu) și există constante care sunt *calculate* în timpul execuției, dar nu se schimbă după ce sunt alocate inițial.

De exemplu:
```js
const pageLoadTime = /* timpul cât durează ca o pagină web să se încarce  */;
```

Valoarea lui `pageLoadTime` nu este cunoscută înainte ca pagina să se încarce, astfel că este denumită obișnuit. Dar este totuși o constantă pentru că nu se schimbă după ce este alocată.

În alte cuvinte, constantele cu majuscule sunt folosite doar ca așa-zise valori "hard-codate".

## Denumirea corectă a lucrurilor

Vorbind despre variabile, există un lucru extrem de important.

Numele unei variabile ar trebui să aibă o denumire clară, o denumire evidentă, care descrie data stocată.

Denumirea variabilelor este una dintre cele mai importante și complexe abilități în programare. La prima vedere numele unei variabile poate dezvălui dacă codul a fost scris de un începător sau de un programator cu experiență.

Într-un proiect real, cel mai mult timp este petrecut modificând și extinzând o bază de cod existentă mai mult decât a scrie ceva complet separat de la început. Când ne reîntoarcem la cod după ce am făcut altceva pentru un timp, este mult mai ușor să găsim informația care este bine etichetată. Sau, în alte cuvinte, când variabilele au o denumire bună.

Te rog petrece timp gândindu-te la denumirea corectă pentru o variabilă înainte să o declari. Făcând acest lucru te răsplătești frumos.

Câteva reguli bune de urmat:

- Folosește nume uman-reproductibile ca `userName` sau `shoppingCart`.
- Stai departe de abrevieri sau nume scurte ca `a`, `b`, `c`, dacă nu știi exact ceea ce faci.
- Fă numele extrem de descriptiv și concis. Exemple de denumiri proaste sunt `data` și `value`. Aceste denumiri nu reprezintă nimic. Este în regulă să le folosim dacă contextul codului le face excepțional de evidente la care dată sau valoare variabila se referă.
- Pune-te de acord cu echipa și ține minte. Dacă vizitatorul unui site este denumit ca "user" atunci ar trebui ca numele variabilelor legate să fie `currentUser` sau `newUser` în loc de `currentVisitor` sau `newManInTown`.

Sună simplu? Chiar este, dar crearea de variabile descriptive și concise în practică nu este. Încearcă.

```smart header="Reuse or create?"
Și ultima notă. Există programatori leneși care, în loc să declare variabile noi, încearcă să le reutilizeze pe cele deja existente.

Drept rezultat, variabilele lor sunt ca niște cutii în care oamenii aruncă diferite lucruri fără să schimbe etichetele.  Ce este înăuntrul cutiei acum? Cine știe? Trebuie să ne apropiem și să vedem.

Astfel de programatori salvează puțin din declararea variabilelor dar pierd de zece ori mai mult să remedieze erorile.

O variabilă în plus este bună, nu rea.

Limbajul JavaScript modern micșorează și browserele optimizează codul destul de bine, deci nu vom crea probleme de performanță. Folosind diferite variabile pentru diferite valori putem chiar ajuta ca motorul să îți optimizeze codul.
```

## Sumar

Putem declara variabile pentru a stoca date folosind `var`, `let`, sau termenul `const`.

- `let` -- este o declarație modernă de variabilă.
- `var` -- este o declarație de variabilă de "școală-veche". În mod normal nu o mai folosim deloc, dar o să acoperim diferențele subtile față de `let` în capitolul <info:var>, în cazul în care ai nevoie de ele.
- `const` -- este la fel ca `let`, doar că valoarea variabilei nu se poate schimba.

Variabilele ar trebui denumite în așa natură încât să înțelegem ușor ce se află înăuntrul lor.
