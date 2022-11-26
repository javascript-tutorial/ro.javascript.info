importance: 3

---

# Verifică login-ul

Scrie un cod care cere ca și login `prompt`.

Dacă vizitatorul scrie `"Admin"`, apoi `prompt` ca și parolă, daca input-ul este o linie goală sau `key:Esc` -- afișează "Canceled", dacă este alt string -- afișează "I don't know you".

În funcție de parolă afișează următoarele:

- Dacă aceasta este egală cu "TheMaster", afișează "Welcome!",
- Dacă parola este egala cu alt text -- afișează "Wrong password",
- Dacă parola este egală cu "" sau un input cancelat , afișează "Canceled"

Schema:

![](ifelse_task.svg)

Te rog să folosești nested `if` blocks. Este foarte importantă citirea cu ușurință a codului.

Hint: introducerea unui input gol intr-un prompt returnează `''`. Apăsând `key:ESC` în timpul unui prompt returnează `null`.

[demo]
