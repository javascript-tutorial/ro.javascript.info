importance: 3

---

# Verificați login-ul

Scrieți un bloc de cod care necesită logare prin `prompt`.

Dacă vizitatorul introduce `"Admin"`, atunci `prompt` pentru o parolă, dacă input-ul este gol sau `key:Esc` -- afișați "Anulat", dacă este un alt string -- atunci afișați "Nu te cunosc".

Parola este verificată după cum umrmează:

- Dacă este egal cu "TheMaster", atunci afișează "Welcome!",
- Un alt string -- afișează "Parolă greșită",
- Pentru un string gol sau input-ul este anulat, afișează "Anulat",

Schema:

![](ifelse_task.svg)

Vă rugăm folosiți blocuri `if` nested. Aveți în vedere lizibilitatea generală a codului.

Sugestie: transmiterea unui input gol către un `prompt` returnează un string gol `''`. Apăsând `key:ESC` în timpul unui prompt returnează `null`.

[demo]
