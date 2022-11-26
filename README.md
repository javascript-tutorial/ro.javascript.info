# The Modern JavaScript Tutorial în limba Română

Acest repository găzduiește conținutul în limba română pentru The Modern JavaScript Tutorial, publicat în [https://javascript.info](https://javascript.info).

### Cum puteți contribui:

## Primii pași

- Consultați acest issue [Romanian Translate Progress](https://github.com/javascript-tutorial/ro.javascript.info/issues/1).
- Alegeți un articol nebifat pe care doriți să îl traduceți.
- Adăugați un comentariu cu titlul articolului la issue, e.g. `An Introduction to JavaScript`.
  - Bot-ul nostru îl va marca automat în issue pentru ca toată lumea să știe că îl traduceți.
  - Comentariul _trebuie_ să conțină doar titlul.
- Faceți un fork la repository, traduceți și apoi trimiteți un PR când ați terminat.
  - Titlul PR trebuie să se potrivească cu titlul articolului, bot-ul va scrie automat numărul acestuia în issue.

Vedeți <https://javascript.info/translate> pentru mai multe detalii.

Vă rugăm să păstrați salturile de linie și paragrafele "așa cum sunt": nu adăugați linii noi și nu le eliminați pe cele existente. Asta facilitează îmbinarea viitoarelor modificări din versiunea engleză în traducere.

Dacă vedeți că versiunea în limba engleză poate fi îmbunătățită - grozav, vă rugăm să trimiteți un PR pentru aceasta.

## Cum se scriu termenii

- Unii termeni din specificații **nu** trebuie traduși, spre exemplu, "Function Declaration" poate fi lăsat "așa cum este".
- Pentru alți termeni, cum ar fi `resolved promise`, `slash`, `regexp` și așa mai departe căutați un glosar bun.
  - Dacă nu există un dicționar, căutați traduceri în manuale, cum ar fi [MDN](https://developer.mozilla.org/en-US/).

## Cum traducem un `code block`

- Traduceți comentariile și mesajele din string.
- Nu traduceți variabile, clase, identificatori.
- Verificați dacă funcționează codului după traducere :)

Exemplu de cod:

```js
// Example
const text = 'Hello, world';
document.querySelector('.hello').innerHTML = text;
```

✅ Așa da:

```js
// Exemplu
const text = 'Bună ziua`
document.querySelector('.hello').innerHTML = text;
// traduceți comentariul și mesajul text
```

❌ Așa nu:

```js
// Exemplu
const text = 'Bună ziua lume';
document.querySelector('.salut').innerHTML = text;
// ".salut" este o clasă
// NU se traduce
```

## Atașamente externe

Dacă un link extern este către Wikipedia, de exemplu `https://en.wikipedia.org/wiki/JavaScript`, și există o versiune a articolului respectiv în limba română de o calitate decentă, folosiți link-ul către acea versiune.

Exemplu:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ Așa da:

```md
[JavaScript](https://ro.wikipedia.org/wiki/JavaScript) este un limbaj de programare.
```

Dacă un articol cu link nu are o versiune tradusă, lăsați link-ul "așa cum este".

## Metadata

Unele fișiere, de obicei tasks, au metadate YAML în partea de sus, delimitate prin `---`:

```md
importance: 5
---
```

Vă rugăm să nu traduceți "importance" (și alte metadate de acolo).

## Anchors

Unele anteturi au `[#anchor]` la sfârșit, de ex:

```md
## Spread operator [#spread-operator]
```

Vă rugăm să nu traduceți sau să eliminați partea `[#...]`, aceasta este pentru ancorele URL.

Vă rugăm frumos să permiteți responsabililor să revizuiască și să fuzioneze sau să solicite modificări în traducerea dvs.

## Structura

Fiecare capitol, un articol sau task au propriul folder.

Dosarul se numește `N-url`, unde `N` - este numărul pentru sortare (articolele sunt ordonate), iar `url` este URL-slug-ul de pe site.

Dosarul are unul dintre fișiere:

- `index.md` reprezintă un capitol
- `article.md` reprezintă un articol
- `task.md` reprezintă o sarcină (soluția trebuie să fie furnizată și în fișierul `solution.md`)

Un fișier începe cu `# Title Header`, apoi textul în format de tip Markdown editabil într-un editor de text simplu. Dacă folosiți o extensie precum Prettier care vă formatează codul, e recomandat să o dezactivați (traducerea trebuie să aibă același format cu originalul).

Resursele suplimentare și exemplele se află de asemenea în același folder.

## Rularea în mediu local

Puteți rula serverul tutorialului la nivel local pentru a vedea cum arată traducerea.

Serverul și instrucțiunile de instalare sunt la <https://github.com/javascript-tutorial/server>.

Alternativ, puteți folosi o extensie (de browser sau pentru code editor) pentru vizualizarea fișierelor Markdown.

## Alte mențiuni

În cazul în care responsabilii nu răspund sau dacă doriți să deveniți responsabil, scrieți-ne la [main repo](https://github.com/javascript-tutorial/en.javascript.info/issues/new).

**Spune-le și altora ce traduci prin forumuri sau chat-uri. Invitați-i să se alăture!**

🎉 Mulțumesc!

**Puteți edita textul în orice editor.** Tutorialul folosește formatul îmbunătățit "markdown", ușor de înțeles. Vezi [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/).

P.S. Lista completă a limbilor traduse poate fi găsită la <https://javascript.info/translate>.

♥  
Ilya Kantor @iliakan