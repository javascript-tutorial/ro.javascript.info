Ideea este simplă: se scade un anumit număr de zile din `date`:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Dar funcția nu ar trebui să modifice `date`. Acesta este un lucru important, deoarece codul exterior care ne oferă data nu se așteaptă ca aceasta să se schimbe.

Pentru a implementa acest lucru haideŧi să clonăm data, astfel:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
