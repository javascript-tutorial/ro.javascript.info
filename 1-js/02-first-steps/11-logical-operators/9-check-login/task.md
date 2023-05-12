importance: 3

---

# Verificați login-ul

Scrieți codul care necesită logare cu `prompt`.

Dacă vizitatorul introduce `"Admin"`, atunci `prompt` pentru o parolă, dacă inputul este gol sau `key:Esc` -- afișați "Anulat", dacă este un alt string -- afișați "Nu te cunosc".

Parola este verificată după cum umrmează:

- Dacă inputul este egal cu "TheMaster", atunci afișează "Welcome!",
- Dacă este un alt string -- afișează "Wrong password"
- Dacă este un string gol sau inputul este anulat, afișează "Canceled"

Schema:

![](ifelse_task.svg)

Vă rugăm folosiți blocuri `if` încorporate. Aveți în vedere lizibilitatea generală a codului.

Sugestie: transmiterea unui input gol în timpul unui promt returnează un string gol `''`. Apăsarea tastei `key:ESC` în timpul unui promt returnează `null`.

[demo]
