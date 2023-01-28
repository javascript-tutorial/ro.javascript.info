function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // ziua săptămânii 0 (sunday) este 7 în Europa
    day = 7;
  }

  return day;
}
