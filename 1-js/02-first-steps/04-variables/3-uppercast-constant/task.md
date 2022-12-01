importance: 4

---

# onst cu majuscule?

Examinează următorul cod:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Aici avem constanta `birthday` pentru dată, și de asemenea constanta `age`.

Constanta `age` este calculată de la `birthday` folosind `someCode()`, care înseamnă chemarea unei funcții pe care nu o explicăm încă (o vom explica curând!), dar detaliile nu contează aici, ideea este că `age` este calculat oarecum bazat pe `birthday`.

Ar fi corect să folosim majuscule pentru `birthday`? Pentru `age`? Sau chiar pentru amândouă?

```js
const BIRTHDAY = '18.04.1982'; // facem birthday cu majuscule?

const AGE = someCode(BIRTHDAY); //facem age cu majuscule?
```
```

