importance: 3

---

# Verifică login-ul

<<<<<<< Updated upstream
Scrie un cod care cere ca și login `prompt`.

Dacă vizitatorul scrie `"Admin"`, apoi `prompt` ca și parolă, daca input-ul este o linie goală sau `key:Esc` -- afișează "Canceled", dacă este alt string -- afișează "I don't know you".
=======
Scrie un cod care cere un login `prompt`.

Dacă vizitatorul scrie  `"Admin"`,apoi `prompt` ca și parolă, daca input-ul este o linie goală sau `key:Esc` -- afișează "Canceled", dacă este alt string -- afișează "I don't know you".
>>>>>>> Stashed changes

În funcție de parolă afișează următoarele:

- Dacă aceasta este egală cu "TheMaster", afișează "Welcome!",
<<<<<<< Updated upstream
- Dacă parola este egala cu alt text -- afișează "Wrong password",
- Dacă parola este egală cu "" sau un input cancelat , afișează "Canceled"
=======
- Alt string -- afișează "Wrong password",
- Pentru un string gol sau un input cancelat, afișează "Canceled".
>>>>>>> Stashed changes

Schema:

![](ifelse_task.svg)

<<<<<<< Updated upstream
Te rog să folosești nested `if` blocks. Este foarte importantă citirea cu ușurință a codului.
=======
Te rog să folosești nested `if` blocks. Aveți grijă la lizibilitatea generală a codului.
>>>>>>> Stashed changes

Hint: introducerea unui input gol intr-un prompt returnează `''`. Apăsând `key:ESC` în timpul unui prompt returnează `null`.

[demo]
