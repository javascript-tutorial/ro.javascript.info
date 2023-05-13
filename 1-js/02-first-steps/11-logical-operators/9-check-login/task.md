importance: 3

---

# Verificați login-ul

Scrieți un bloc de cod care necesită logare prin `prompt`.

Dacă vizitatorul introduce `"Admin"`, atunci `prompt` pentru o parolă, dacă inputul este gol sau `key:Esc` -- afișați "Anulat", dacă este un alt string -- afișați "I don't know you".

Parola este verificată după cum umrmează:

- Dacă inputul este egal cu "TheMaster", atunci afișează "Welcome!",
- Dacă este un alt string -- afișează "Wrong password"
- Dacă este un string gol sau inputul este anulat, afișează "Canceled"

Schemă:

![](ifelse_task.svg)

Vă rugăm folosiți blocuri `if` indentate. Aveți în vedere lizibilitatea generală a codului.

Sugestie: transmiterea unui input către un `prompt` returnează un string gol `''`. Apăsarea tastei `key:ESC` returnează `null`.

[demo]
