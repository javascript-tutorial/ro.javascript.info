importance: 5

---

# Preia o funcție ultimele modificări?

Funcția sayHi folosește un nume de variabilă externă. Când funcția se execută, ce valoare va folosi?

```js
let name = "John";

function sayHi() {
  alert("Salut, " + name);
}

name = "Pete";

sayHi(); // ce va afișa: "John" sau "Pete"?
```

Astfel de situații sunt frecvente atât în browser cât și în dezvoltarea pe partea de server. O funcție poate fi programată pentru a fi executată mai târziu decât este creată, de exemplu după o acțiune a utilizatorului sau după o cerere de rețea.

Așadar, întrebarea este: preia cele mai recente modificări?
