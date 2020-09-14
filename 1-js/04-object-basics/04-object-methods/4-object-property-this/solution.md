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

În concluzie `ref: this` preia de fapt variabila curentă `this` a funcției.

<<<<<<< HEAD
Iată cazul opus:
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

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

Acum funcționează, pentru că `user.ref()` este o metodă. Iar valoarea variabilei `this` este setată la obiectul dinaintea punctului `.`.
