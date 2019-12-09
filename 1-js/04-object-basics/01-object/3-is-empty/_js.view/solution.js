function isEmpty(obj) {
  for (let key in obj) {
    // dacă bucla a pornit, există o proprietate
    return false;
  }
  return true;
}
