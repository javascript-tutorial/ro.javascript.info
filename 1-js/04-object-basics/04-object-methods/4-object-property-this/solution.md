**Răspuns: o eroare.**

Încercați:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Eroare: Cannot read property 'name' of undefined
```

Acest lucru se datorează faptului că regulile care setează `this` nu se uită la definirea obiectului. Doar momentul apelului contează .

Aici valoarea variabilei `this` din interiorul funcției `makeUser()` este `undefined`, deoarece este apelată ca funcție, nu ca o metodă cu sintaxa "punct".

Valoarea variabilei `this` este unică pentru întreaga funcția, blocurile de cod și obiectele literale nu o afectează.

În concluzie `ref: this` preia de fapt variabila curentă `this` a funcției.

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
};

let user = makeUser();

alert( user.ref().name ); // John
```

Acum funcționează, pentru că `user.ref()` este o metodă. Iar valoarea variabilei `this` este setată la obiectul dinaintea punctului `.`.
