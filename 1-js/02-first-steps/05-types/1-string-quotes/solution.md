
Accentele grave încorporează expresia dinăuntrul `${...}` în șirul de caractere.

```js run
let nume = "Ilya";

// expresia este numărul 1
alert( `bună ${1}` ); // bună 1

// expresia este un șir de caractere „nume”
alert( `bună ${"nume"}` ); // bună nume

// expresia este este o variabilă, care este încorporată
alert( `bună ${nume}` ); // bună Ilya
```
