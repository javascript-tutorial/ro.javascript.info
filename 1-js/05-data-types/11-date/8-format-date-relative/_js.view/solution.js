
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
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
