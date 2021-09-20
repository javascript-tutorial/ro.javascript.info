# Comentarii

După cum știm din capitolul <info:structure>, comentariile pot fi pe o singură linie: începând cu `//` sau pe mai multe linii: `/* ... */`.

Noi le folosim în mod obișnuit pentru a descrie cum și de ce funcționează codul. 

<<<<<<< HEAD
La prima vedere, scrierea comentariilor pare a fi evidentă, dar adeseori începătorii în programare fac greșeli. 
=======
At first sight, commenting might be obvious, but novices in programming often use them wrongly.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

## Comentarii rele

Începătorii tind să utilizeze comentariile pentru a explica "ce se întâmplă în cod". Ceva de genul ăsta: 

```js
// Acest cod va face asta (...) și asta (...)
// ...și cine mai știe ce...
cod;
foarte;
complex;
```
Dar în codul profesional, numărul de comentarii așa "explicative" ar trebui să fie minim. Serios, codul ar trebui să fie ușor de înțeles și fără ele.

Există o regulă importantă despre acest lucru: "în cazul în care codul ește atât de confuz încât necesită un comentariu, atunci ar trebui să fie rescris în schimb".

### Sfat: separarea funcțiilor

Uneori este benefic să înlocuiești o bucată de cod cu o funcție, ca aici:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // verifică dacă i este un număr prim
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

Varianta mai bună, cu o funcție separată `isPrime`

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Acum putem înțelege codul mult mai ușor. Funcția însăși a devenit comentariul. Acest tip de cod se numește *autodescriptiv*.

### Sfat: crează funcții

Și dacă avem o lungă "listă de coduri" precum:

```js
// aici adăugăm whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// aici adăugăm suc
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```
Atunci ar putea exista o variantă mai bună de a-l refactoriza în funcții, precum:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Încă o dată, însăși funcțiile ne spun ce se întâmplă. Nu e nimic de comentat. De asemenea, structura codului este mai bună când este împărțită. Este clar ce face fiecare funcție, ce primește și ce returnează. 

În realitate, nu putem evita în totalitate comentariile "explicative". Există algoritmi complecși. Și există și "ajustări" deștepte cu scopul optimizării. Dar în general ar trebui să încercăm să păstrăm codul simplu și autodescriptiv.

## Comentarii bune

Deci, comentarii explicative sunt de obicei rele. Ce comentarii sunt bune?

<<<<<<< HEAD
Descrierea arhitecturii
: Oferă o vedere de ansamblu asupra componentelor, cum interacționează, care este ordinea de control în diverse situații... Pe scurt -- ochiul de vultur al codului. Există un limbaj-diagramă special [UML](https://ro.wikipedia.org/wiki/Unified_Modeling_Language) pentru diagrame de nivel înalt. Cu siguranță merită studiate.

Documentarea utilizării unei funcții
: Există o sintaxă specială [JSDoc](http://en.wikipedia.org/wiki/JSDoc) pentru pentru a documenta funcțiile: utilizare, parametri, valoare returnată.
=======
Describe the architecture
: Provide a high-level overview of components, how they interact, what's the control flow in various situations... In short -- the bird's eye view of the code. There's a special language [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) to build high-level architecture diagrams explaining the code. Definitely worth studying.

Document function parameters and usage
: There's a special syntax [JSDoc](http://en.wikipedia.org/wiki/JSDoc) to document a function: usage, parameters, returned value.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

<<<<<<< HEAD
    De exemplu:
    ```js
    /**
     * Returnează x la puterea n.
     *
     * @param {number} x Numărul ridicat la putere.
     * @param {number} n Puterea, trebuie să fie un număr natural.
     * @return {number} x ridicat la puterea n.
     */
    function pow(x, n) {
      ...
    }
    ```
    Comentariile de acest tip ne permit să înțelegem scopul funcției și să o folosim în modul corect fără a ne uita în codul ei.

    
    Apropo, multe editoare precum [WebStorm](https://www.jetbrains.com/webstorm/) le pot înțelege la fel de bine și să le folosească pentru a asigura autocompletare și verificări automate ale codului.
    
    De asemenea, sunt și unelte precum [JSDoc 3](https://github.com/jsdoc3/jsdoc) care pot genera documentație HTML din comentarii. Poți citi mai multe informații despre JSDoc la <http://usejsdoc.org/>
=======
For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.

Why is the task solved this way?
: What's written is important. But what's *not* written may be even more important to understand what's going on. Why is the task solved exactly this way? The code gives no answer.

    If there are many ways to solve the task, why this one? Especially when it's not the most obvious one.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

De ce este rezolvată sarcina în modul acesta?
: Ce este scris este important. Dar ce *nu* este scris s-ar putea să fie mult mai important pentru a înțelege ce se îmtâmplă. De ce este sarcina rezolvată în felul acesta? Codul nu oferă nici un răspuns.
  
    Dacă sunt multe moduri de a rezolva sarcina, de ce tocmai acesta? În special când nu este chiar cel mai evident. 

    Fără asemenea comentarii următoarea situație este posibilă:
    1. Tu (sau colegul tău) deschizi codul scris acum ceva timp, și vezi că este "suboptimizat".
    2. Te gândești: "Ce stupid am fost atunci, și cât de deștept sunt acum", și rescrii codul folosind varianta "mult mai evidentă și corectă".
    3. ...Impulsul de a rescrie codul a fost bun. Dar în continuarea dezvoltării observi că "cea mai evidentă soluție" este defapt insuficientă. Îți amintești cu greu de ce, deoarece ai testat-o acum mult timp. Te întorci la varianta corectă, dar timpul a fost pierdut.
    
    Comentariile care explică soluția sunt foarte importante. Te ajută să continui dezvoltarea în direcția cea bună. 

Orice caracteristici folosite ale codului ? Unde sunt folosite ?
: În cazul în care codul are ceva subtil sau contraintuitiv, atunci este necesară comentarea.

## Rezumat

Un semn important al unui dezvoltator bun sunt comentariile: prezența lor și chiar absența. 

Comentariile bune ne permit să păstrăm codul organizat, să ne întoarcem la el după un timp și să îl folosim mult mai eficient.

**Folosește comentariile pentru:**

- Arhitectura per total, o vedere de ansamblu a acesteia.
- Utilizarea funcțiilor.
- Soluții importante, în special când nu sunt imediat evidente.

**Evită comentariile pentru:**

<<<<<<< HEAD
- Pentru a descrie "cum funcționează codul" și "ce face".
- Folosește-le doar dacă este imposibil să faci codul atât de simplu și autodescriptiv încât comentariile să nu mai fie necesare.
=======
- That tell "how code works" and "what it does".
- Put them in only if it's impossible to make the code so simple and self-descriptive that it doesn't require them.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Comentariile sunt de asemenea folosite pentru unelte de autodocumentare precum JSDoc3: acestea le citesc și generează documentații HTML (sau documentații în alt format).
