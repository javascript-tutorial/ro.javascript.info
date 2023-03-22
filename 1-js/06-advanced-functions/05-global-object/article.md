
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

## Utilizarea pentru polyfills

Utilizăm obiectul global pentru a testa suportul caracteristicilor moderne ale limbajului.

De exemplu, testăm dacă există un obiect `Promise` încorporat (nu există în browserele foarte vechi):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

Dacă nu există (să spunem că ne aflăm într-un browser vechi), putem crea "polyfills": adăugăm funcții care nu sunt acceptate de mediul respectiv, dar care există în standardul modern.

```js run
if (!window.Promise) {
  window.Promise = ... // implementare personalizată a funcției de limbaj modern
}
```

## Sumar

- Obiectul global deține variabile care ar trebui să fie disponibile peste tot.

    Aceasta include integrări JavaScript, cum ar fi `Array` și valorile specifice mediului, cum ar fi `window.innerHeight` -- înălțimea ferestrei în browser.
- Obiectul global are un nume universal `globalThis`.

    ...Dar cel mai adesea este menționat prin nume "old-school" specifice mediului, cum ar fi `window` (browser) și `global` (Node.js).
- Ar trebui să stocăm valori în obiectul global numai dacă acestea sunt cu adevărat globale pentru proiectul nostru. Și să păstrăm numărul lor la minim.
- În browser, cu excepția cazului în care folosim [module](info:modules), funcțiile și variabilele globale declarate cu `var` devin o proprietate a obiectului global.
- Pentru a face codul nostru rezistent pe viitor și mai ușor de înțeles, ar trebui să accesăm direct proprietățile obiectului global, ca `window.x`.
