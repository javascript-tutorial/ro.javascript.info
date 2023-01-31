describe("formatDate", function() {
  it("arată 1ms în urmă ca \"chiar acum\"", function() {
    assert.equal(formatDate(new Date(new Date - 1)), 'chiar acum');
  });

  it('"30 secunde în urmă"', function() {
    assert.equal(formatDate(new Date(new Date - 30 * 1000)), "30 sec. în urmă");
  });

  it('"5 minute în urmă"', function() {
    assert.equal(formatDate(new Date(new Date - 5 * 60 * 1000)), "5 min. în urmă");
  });

  it("date mai vechi precum DD.MM.YY HH:mm", function() {
    assert.equal(formatDate(new Date(2014, 2, 1, 11, 22, 33)), "01.03.14 11:22");
  });

});
