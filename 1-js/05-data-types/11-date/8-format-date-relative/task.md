importance: 4

---

# Formatați data relativă

Scrieți o funcție `formatDate(date)` care ar trebui să formateze `date` după cum urmează:

- Dacă a trecut mai puțin de 1 secundă din `date`, atunci `"chiar acum"`.
- În caz contrar, dacă a trecut mai puțin de 1 minut de la `date`, atunci `"n sec. ago"`.
- În caz contrar, dacă a trecut mai puțin de o oră, atunci `"m min. ago"`.
- În caz contrar, data completă în formatul `"DD.MM.YY HH:mm"`. Adică: `"zi.lună.an ore:minute"`, toate în format de 2 cifre, de exemplu `31.12.16 10:00`.

De exemplu:

```js
alert( formatDate(new Date(new Date(new Date - 1)) ) ); // "chiar acum"

alert( formatDate(new Date(new Date(new Date - 30 * 1000)) ); // "acum 30 sec."

alert( formatDate(new Date(new Date(new Date - 5 * 60 * 1000)) ); // "5 min în urmă"

// data de ieri precum 31.12.16 20:00
alert( formatDate(new Date(new Date(new Date - 86400 * 1000)) ) );
```
