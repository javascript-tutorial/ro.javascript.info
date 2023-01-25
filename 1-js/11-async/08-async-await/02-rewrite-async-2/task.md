
# Rescrieți "rethrow" cu async/await

Mai jos puteți găsi exemplul "rethrow". Rescrieți-l folosind `async/await` în loc de `.then/catch`.

Și scăpați de recursivitate în favoarea unei bucle în `demoGithubUser`: cu `async/await` acest lucru devine ușor de făcut.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Cere un nume de utilizator până când github returnează un utilizator valid
function demoGithubUser() {
  let name = prompt("Introduceți un nume?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Nume complet: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Nu există un astfel de utilizator, vă rugăm să îl introduceți din nou.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
