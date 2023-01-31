Pentru a obține numărul de secunde, putem genera o dată folosind ziua și ora curentă 00:00:00, apoi să o scădem din "now".

Diferența este numărul de milisecunde de la începutul zilei, pe care trebuie să-l împărțim la 1000 pentru a obține secundele:

```js run
function getSecondsToday() {
  let now = new Date();

  // creați un obiect folosind ziua/luna/anul curent
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // diferența de ms
  return Math.round(diff / 1000); // face secunde
}

alert( getSecondsToday() );
```

O soluție alternativă ar fi să se obțină ore/minute/secunde și să se convertească în secunde:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
