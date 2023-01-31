Metoda `date.getDay()` returnează numărul zilei săptămânii, începând de duminică.

Să creăm o matrice de zile ale săptămânii, astfel încât să putem obține numele zilei corespunzătoare prin numărul ei:

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
