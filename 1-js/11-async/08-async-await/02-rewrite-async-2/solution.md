
Nu există trucuri aici. Doar înlocuiți `.catch` cu `try..catch` în `demoGithubUser` și adăugați `async/await` acolo unde este necesar:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Cere un nume de utilizator până când github returnează un utilizator valid
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Introduceți un nume?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // nicio eroare, ieșiți din buclă
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // bucla continuă după alertă
        alert("Nu există un astfel de utilizator, vă rugăm să îl introduceți din nou.");
      } else {
        // eroare necunoscută, rethrow
        throw err;
      }
    }      
  }


  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
```
