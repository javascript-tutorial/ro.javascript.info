Constructorul `new Date` utilizează fusul orar local. Așadar singurul lucru important de reținut este că lunile încep de la zero.

Deci Februarie are numărul 1.

Iată un exemplu cu numere ca și componente ale datei:

```js run
//new Date(an, lună, dată, oră, minut, secundă, milisecundă)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
Am putea de asemenea să creăm o dată dintr-un șir, în felul următor:

```js run
//new Date(datastring)
let d2 = new Date("February 20, 2012 03:12:00");
alert( d2 );
```
