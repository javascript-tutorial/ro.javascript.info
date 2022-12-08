describe("getUsers", function() {

  it("obține utilizatorii din GitHub", async function() {
    let users = await getUsers(['iliakan', 'remy', 'nici.un.astfel.de.utilizator']);
    assert.equal(users[0].login, 'iliakan');
    assert.equal(users[1].login, 'remy');
    assert.equal(users[2], null);
  });

});
