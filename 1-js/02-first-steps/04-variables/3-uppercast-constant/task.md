importance: 4

---

# Const cu majuscule?

Examinează următorul cod:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Aici avem o constantă `birthday` dată și `age` este calculat din  `birthday` cu ajutorul codului (nu este redat aici pentru a scurta, și pentru că detaliile nu contează aici).

Ar fi corect să folosim majuscule pentru `birthday`? Pentru `age`? Sau chiar pentru amândouă?

```js
const BIRTHDAY = '18.04.1982'; // facem birthday cu majuscule?

const AGE = someCode(BIRTHDAY); //facem age cu majuscule?
```

