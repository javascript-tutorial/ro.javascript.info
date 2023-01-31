describe("getDateAgo", function() {

  it("1 zi înainte de 02.01.2015 -> day 1", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 1), 1);
  });


  it("2 zile înainte de 02.01.2015 -> ziua 31", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 2), 31);
  });

  it("100 zile înainte de 02.01.2015 -> ziua 24", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 100), 24);
  });

  it("365 zile înainte de 02.01.2015 -> ziua 2", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 365), 2);
  });

  it("nu modifică date-ul dat", function() {
    let date = new Date(2015, 0, 2);
    let dateCopy = new Date(date);
    getDateAgo(dateCopy, 100);
    assert.equal(date.getTime(), dateCopy.getTime());
  });

});
