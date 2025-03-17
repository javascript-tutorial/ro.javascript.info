importance: 4

---

# Const cu majuscule?

Examinează următorul cod:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Aici avem o constantă `birthday` pentru dată, și de asemenea constanta `age`.
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

`age` este calculată din `birthday` folosind `someCode()`, ceea ce înseamnă un apel de funcție pe care nu l-am explicat încă (o vom face în curând!), dar detaliile nu contează aici, ideea este că `age` este calculată cumva pe baza `birthday`.

Ar fi corect să folosim majuscule pentru `birthday`? Pentru `age`? Sau chiar pentru ambele?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // facem BIRTHDAY cu majuscule?

const AGE = someCode(BIRTHDAY); // facem AGE cu majuscule?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```
