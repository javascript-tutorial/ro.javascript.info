importance: 4

---

# Const cu majuscule?

Examinează următorul cod:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Aici avem o constantă `birthday` pentru dată, și de asemenea constanta `age`.

`age` este calculată din `birthday` folosind `someCode()`, ceea ce înseamnă un apel de funcție pe care nu l-am explicat încă (o vom face în curând!), dar detaliile nu contează aici, ideea este că `age` este calculată cumva pe baza `birthday`.

Ar fi corect să folosim majuscule pentru `birthday`? Pentru `age`? Sau chiar pentru ambele?

```js
const BIRTHDAY = '18.04.1982'; // facem BIRTHDAY cu majuscule?

const AGE = someCode(BIRTHDAY); // facem AGE cu majuscule?
```

