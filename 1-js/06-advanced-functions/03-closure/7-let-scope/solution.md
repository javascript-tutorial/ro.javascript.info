Rezultatul este: **eroare**.

Încercați să o rulați:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

În acest exemplu putem observa diferența specifică dintre o variabilă "inexistentă" și una "neinițializată".

După cum ați putut citi în articolul [](info:closure), o variabilă începe în starea "neinițializată" din momentul în care execuția intră într-un bloc de cod (sau într-o funcție). Și rămâne neinițializată până la instrucțiunea `let` corespunzătoare.

Cu alte cuvinte, o variabilă există din punct de vedere tehnic, dar nu poate fi utilizată înainte de `let`.

Codul de mai sus demonstrează acest lucru.

```js
function func() {
*!*
  // variabila locală x este cunoscută de motor din începutul funcției,
  // dar "neinițializată" (inutilizabilă) până la let ("zona moartă").
  // de unde și eroarea
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

Această zonă de neutilizare temporară a unei variabile (de la începutul blocului de cod până la `let`) se numește uneori "zonă moartă".
