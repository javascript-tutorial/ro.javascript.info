
# Obiect global

Obiectul global oferă variabile și funcții care sunt disponibile oriunde. În mod implicit, cele care sunt încorporate în limbaj sau în mediu.

Într-un browser se numește `window`, pentru Node.js este `global`, iar pentru alte medii poate avea un alt nume.

Recent, `globalThis` a fost adăugat în limbaj, ca un nume standardizat pentru un obiect global, care ar trebui să fie acceptat în toate mediile. Este suportat în toate browserele majore.

Vom folosi `window` aici, presupunând că mediul nostru este un browser. Dacă scriptul dvs. ar poate rula în alte medii, este mai bine să folosiți `globalThis` în schimb.

Toate proprietățile obiectului global pot fi accesate direct:

```js run
alert("Bună ziua");
// este la fel ca
window.alert("Bună ziua");
```

Într-un browser, funcțiile și variabilele globale declarate cu `var` (nu cu `let/const`!) devin proprietatea obiectului global:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (a devenit o proprietate a obiectului global)
```

Declarațiile de funcții au același efect (declarații folosind cuvântul cheie `function` în fluxul principal de cod, nu expresii de funcții).

Vă rugăm să nu vă bazați pe asta! Acest comportament există din motive de compatibilitate. Scripturile moderne folosesc [module JavaScript](info:modules) unde nu se întâmplă așa ceva.

Dacă am folosi în schimb `let`, un astfel de lucru nu s-ar întâmpla:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (nu devine o proprietate a obiectului global)
```

Dacă o valoare este atât de importantă încât doriți să o faceți disponibilă la nivel global, scrieți-o direct ca o proprietate:

```js run
*!*
// face informațiile despre utilizatorul curent globale, pentru a lăsa toate scripturile să le acceseze
window.currentUser = {
  name: "John"
};
*/!*

// în altă parte în cod
alert(currentUser.name);  // John

// sau, dacă avem o variabilă locală cu numele "currentUser"
// luați-o din window în mod explicit (sigur!)
alert(window.currentUser.name); // John
```

Acestea fiind spuse, utilizarea variabilelor globale este în general descurajată. Ar trebui să fie cât mai puține variabile globale pe cât posibil. Proiectarea codului în care o funcție primește variabile de "intrare" și produce un anumit "rezultat" este mai clară, mai puțin predispusă la erori și mai ușor de testat decât în cazul în care folosește variabile exterioare sau globale.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

    That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- The global object has a universal name `globalThis`.

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
