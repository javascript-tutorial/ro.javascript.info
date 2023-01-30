Pentru a obține timpul scurs de la `date` până acum -- haideți să scădem datele.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // diferența în milisecunde

  if (diff < 1000) { // mai puțin de 1 secundă
    return 'chiar acum';
  }

  let sec = Math.floor(diff / 1000); // convertește diff în secunde

  if (sec < 60) {
    return sec + ' sec. în urmă';
  }

  let min = Math.floor(diff / 60000); // convertește diff în minute
  if (min < 60) {
    return min + ' min. în urmă';
  }

  // formatați data
  // adăugați zerouri de început unde este o singură cifră la zi/lună/ore/minute
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // se iau ultimele 2 cifre din fiecare component

  // uniți componentele în date
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':'));
}

alert( formatDate(new Date(new Date(new Date - 1)) ); // "chiar acum"

alert( formatDate(new Date(new Date(new Date - 30 * 1000)) ); // "30 sec. în urmă"

alert( formatDate(new Date(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. în urmă"

// data de ieri precum 31.12.2016 20:00
alert( formatDate(new Date(new Date(new Date - 86400 * 1000)) ) );
```

Soluție alternativă:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatare
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
