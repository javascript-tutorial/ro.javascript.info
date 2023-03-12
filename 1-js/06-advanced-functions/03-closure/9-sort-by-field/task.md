importance: 5

---

# Sortează după câmp

Avem o matrice de obiecte de sortat:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Modul obișnuit de a face acest lucru ar fi:

```js
// după nume (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// după vârstă (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Putem să o facem și mai puțin stufoasă, așa?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Deci, în loc să scrieți o funcție, puneți doar `byField(fieldName)`.

Scrieți funcția `byField` care poate fi folosită pentru asta.
