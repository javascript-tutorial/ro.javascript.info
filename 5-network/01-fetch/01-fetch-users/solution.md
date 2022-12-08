
Pentru a prelua un utilizator avem nevoie de: `fetch('https://api.github.com/users/USERNAME')`.

Dacă răspunsul are status `200`, apelați `.json()` pentru a citi obiectul JS.

În caz contrar, dacă un `fetch` eșuează, sau dacă răspunsul nu are status 200, returnăm doar `null` în array-ul rezultat.

Iată deci codul:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Vă rugăm să notați că: apelul `.then` este atașat direct la `fetch`, astfel încât atunci când avem răspunsul, acesta nu așteaptă alte preluări, ci începe să citească imediat `.json()`.

Dacă am folosi `await Promise.all(names.map(name => fetch(...)))`, și am apela `.json()` către rezultate, atunci am aștepta ca toate preluările să răspundă. Adăugând `.json()` direct la fiecare `fetch`, ne asigurăm că fiecare fetch individual începe să citească datele ca JSON fără să se aștepte unul pe celălalt.

Acesta este un exemplu despre cum low-level Promise API poate fi totuși util chiar dacă folosim în principal `async/await`.
