**Răspuns: o eroare.**

Încercați:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Eroare: Cannot read property 'name' of undefined
```

Acest lucru se datorează faptului că regulile care setează `this` nu se uită la definirea obiectului. Doar momentul apelului contează .

Aici valoarea variabilei `this` din interiorul funcției `makeUser()` este `undefined`, deoarece este apelată ca funcție, nu ca o metodă cu sintaxa "punct".

Valoarea variabilei `this` este unică pentru întreaga funcția, blocurile de cod și obiectele literale nu o afectează.

Deci `ref: this` preia de fapt variabila curentă `this` a funcției.

Putem rescrie funția și returna același `this` cu valoarea `undefined`: 

```js run
function makeUser(){
  return this; // de această dată nu este nici un obiect literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
Așa cum puteți vedea, rezultatul a `alert( makeUser().name )` este același ca rezultatul a `alert( user.ref.name )` din exemplul anterior.

Iată cazul opus:


```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

Acum funcționează, pentru că `user.ref()` este o metodă. Iar valoarea `this` este setată la obiectul dinaintea punctului `.`.
