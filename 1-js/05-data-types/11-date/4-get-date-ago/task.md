importance: 4

---

# Ce zi a lunii a fost acum multe zile?

Creați o funcție `getDateAgo(date, days)` pentru a returna ziua din lună de acum `days` din `date`.

De exemplu, dacă astăzi este 20, atunci `getDateAgo(new Date(), 1)` ar trebui să fie 19 și `getDateAgo(new Date(), 2)` ar trebui să fie 18.

Ar trebui să funcționeze în mod fiabil pentru `days=365` sau mai mult:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. Funcția nu trebuie să modifice `date`-ul dat.
