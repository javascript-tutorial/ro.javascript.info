Pentru a obține numărul de milisecunde până mâine, putem scădea din "mâine 00:00:00" data curentă.

Mai întâi, generăm acel "mâine", și apoi facem acest lucru:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // data de mâine
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // diferența în ms
  return Math.round(diff / 1000); // convertește în secunde
}
```

Soluție alternativă:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Vă rugăm să rețineți că multe țări au ora de vară (DST), astfel încât pot exista zile cu 23 sau 25 de ore. Este posibil să dorim să tratăm aceste zile separat.
