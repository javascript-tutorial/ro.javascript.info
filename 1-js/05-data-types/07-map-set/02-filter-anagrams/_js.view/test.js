function intersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

describe("aclean", function() {

  it("returnează exact 1 cuvânt din fiecare set de anagrame", function() {
    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    let result = aclean(arr);
    assert.equal(result.length, 3);

    assert.equal(intersection(result, ["nap", "PAN"]).length, 1);
    assert.equal(intersection(result, ["teachers", "cheaters", "hectares"]).length, 1);
    assert.equal(intersection(result, ["ear", "era"]).length, 1);

  });

  it("este case-insensitive", function() {
    let arr = ["era", "EAR"];
    assert.equal(aclean(arr).length, 1);
  });

});