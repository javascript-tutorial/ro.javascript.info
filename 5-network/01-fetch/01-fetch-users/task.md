# Preia utilizatorii din GitHub

Creați o funcție async `getUsers(names)`, care obține un array de autentificări GitHub, preia utilizatorii de pe GitHub și returnează un array de utilizatori GitHub.

URL-ul GitHub cu informații despre utilizator pentru `USERNAME` dat este: `https://api.github.com/users/USERNAME`.

Există un exemplu de testare în sandbox.

Detalii importante:

1. Trebuie să existe o singură cerere `fetch` pentru fiecare utilizator.
2. Solicitările nu ar trebui să se aștepte una pe alta. Astfel încât datele să ajungă cât mai repede posibil.
3. În cazul în care o cerere eșuează, sau dacă nu există un astfel de utilizator, funcția ar trebui să returneze `null` în array-ul rezultat.
