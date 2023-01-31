Să creăm o dată folosind luna următoare, dar să trecem zero ca zi:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

În mod normal, datele încep de la 1, dar, din punct de vedere tehnic putem trece orice număr, data se va ajusta singură. Deci când trecem 0, atunci înseamnă "cu o zi înainte de prima zi a lunii", cu alte cuvinte: "ultima zi a lunii precedente".
