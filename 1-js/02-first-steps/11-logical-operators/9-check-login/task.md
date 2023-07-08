importance: 3

---

# Verificați login-ul

Scrieți un bloc de cod care necesită logare prin `prompt`.

Dacă vizitatorul introduce `"Admin"`, atunci `prompt` pentru o parolă, dacă inputul este gol sau `key:Esc` -- afișați "Anulat", dacă este un alt string -- afișați "Nu te cunosc".

Parola este verificată după cum umrmează:

- Dacă este egal cu "TheMaster", atunci afișează "Welcome!",
- Dacă este un alt string -- afișează "Parolă greșită",
- Dacă este un string gol sau inputul este anulat, afișează "Anulat",

Schemă:

![](ifelse_task.svg)

Vă rugăm folosiți blocuri `if` nested. Aveți în vedere lizibilitatea generală a codului.

Sugestie: transmiterea unui input către un `prompt` returnează un string gol `''`. Apăsarea tastei `key:ESC` returnează `null`.

[demo]
