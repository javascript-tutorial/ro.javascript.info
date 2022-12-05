
# Fetch

JavaScript poate trimite network requests către server și încărca informații noi ori de câte ori este nevoie.

De exemplu, putem folosi un network request pentru a:

- Trimite o comandă,
- Încărca informații despre utilizator,
- Primi cele mai recente actualizări de la server,
- ...etc.

...Și toate acestea fără a reîncărca pagina!

Există un termen umbrelă „AJAX” (abreviat <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) pentru network requests din JavaScript. Totuși nu trebuie să folosim XML: termenul vine din vremuri de odinioară, de aceea acel cuvânt este acolo. S-ar putea să fi auzit deja acest termen.

Sunt multiple moduri de a trimite o solicitare de rețea și de a obține informații de la server.

Metoda `fetch()` este modernă și versatilă, așa că vom începe cu ea. Nu este suportată de browserele vechi (poate fi polyfilled), dar foarte bine suportată printre cele moderne.

Sintaxa de bază este:

```js
let promise = fetch(url, [options])
```

- **`url`** -- adresa URL de accesat.
- **`options`** -- parametri opționali: metodă, anteturi etc.

Fără `options`, aceasta este o simplă solicitare GET, care descarcă conținutul `url`.

Browserul începe imediat cererea și returnează o promisiune pe care codul apelant trebuie să o folosească pentru a obține rezultatul.

Obținerea unui răspuns este de obicei un proces în două etape.

**În primul rând, `promise`, returnat de `fetch`, se rezolvă cu un obiect din clasa built-in [Response](https://fetch.spec.whatwg.org/#response-class) imediat ce serverul răspunde cu anteturi.**

În acest stadiu putem verifica HTTP status, pentru a vedea dacă a avut succes sau nu, verifica anteturile, dar nu avem un body încă.

Promisiunea este respinsă dacă `fetch` nu a putut efectua un HTTP-request, e.g. probleme de rețea, sau dacă nu există un astfel de site. Stările HTTP anormale, precum 404 sau 500 nu provoacă o eroare.

Putem vedea HTTP-status în proprietățile răspunsului:

- **`status`** -- Codul de stare HTTP, e.g. 200.
- **`ok`** -- boolean, `true` dacă codul de stare HTTP este 200-299.

De exemplu:

```js
let response = await fetch(url);

if (response.ok) { // dacă HTTP-status este 200-299
  // obțineți response body (metoda explicată mai jos)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**În al doilea rând, pentru a obține response body, trebuie să folosim un method call adițional.**

`Response` oferă mai multe metode bazate pe promisiuni pentru a accesa body în diferite formate:

- **`response.text()`** -- citește răspunsul și îl returnează ca text,
- **`response.json()`** -- parsează răspunsul ca JSON,
- **`response.formData()`** -- returnează răspunsul ca obiect `FormData` (explicat în [capitolul următor](info:formdata)),
- **`response.blob()`** -- returnează răspunsul ca [Blob](info:blob) (date binare cu tip),
- **`response.arrayBuffer()`** -- returnează răspunsul ca [ArrayBuffer](info:arraybuffer-binary-arrays) (reprezentare low-level a datelor binare),
- adițional, `response.body` este un obiect [ReadableStream](https://streams.spec.whatwg.org/#rs-class), care îți permite să citești corpul bucată-cu-bucată, vom vedea un exemplu mai târziu.

De exemplu, haideți să luăm un obiect JSON cu ultimele commits din GitHub:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // citește response body și îl parsează ca JSON
*/!*

alert(commits[0].author.login);
```

Sau, același lucru fără `await`, folosind o sintaxă pură de promisiuni:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Pentru a lua response text, `await response.text()` în loc de `.json()`:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // citește response body ca text

alert(text.slice(0, 80) + '...');
```

Ca un caz arătător pentru citirea în format binar, să preluăm și să afișăm o imagine logo din specificația ["fetch"](https://fetch.spec.whatwg.org) (vedeți capitolul [Blob](info:blob) pentru detalii despre operațiile asupra `Blob`):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // descărcare ca obiect Blob
*/!*

// crează <img> pentru el
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// afișeaz-o
img.src = URL.createObjectURL(blob);

setTimeout(() => { // ascunde după trei secunde
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
Putem alege doar o singură metodă de citire a corpului body.

Dacă am obținut deja răspunsul cu `response.text()`, atunci `response.json()` nu va funcționa, deoarece conținutul corpului a fost deja procesat.

```js
let text = await response.text(); // response body consumat
let parsed = await response.json(); // dă greși (deja consumat)
```
````

## Response headers

Response headers sunt disponibile într-un obiect antet asemănător Map în `response.headers`.

Nu este chiar un Map, dar are metode similare pentru a obține antete individuale după nume sau pentru a le itera:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// obține un antet
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// iterați peste toate antetele
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## Request headers

Pentru a seta un request header în `fetch`, putem folosi opțiunea `headers`. Aceasta are un obiect cu antetele de ieșire, ca acesta:

```js
let response = fetch(protectedUrl, {
  headers: {
    Autentificare: 'secret'
  }
});
```

...Dar există o listă de [anteturi HTTP interzise](https://fetch.spec.whatwg.org/#forbidden-header-name) pe care nu le putem seta:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Aceste anteturi asigură un protocol HTTP corect și sigur, așa că sunt controlate exclusiv de browser.

## POST requests

Pentru a face un `POST` request, sau o cerere cu o altă metodă, trebuie să folosim opțiunile `fetch`:

- **`method`** -- Metoda HTTP e.g. `POST`,
- **`body`** -- request body, unul dintre:
  - un șir (e.g. codificat JSON),
  - obiect `FormData`, pentru a trimite datele ca `multipart/form-data`,
  - `Blob`/`BufferSource` pentru a trimite date binare,
  - [URLSearchParams](info:url), pentru a trimite datele în codificare `x-www-form-urlencoded`, rar utilizat.

Formatul JSON este utilizat de cele mai multe ori.

De exemplu, acest cod trimite obiectul `user` ca JSON:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Vă rugăm să notați că, în cazul în care request `body` este un șir, atunci antetul `Content-Type` este setat în mod implicit la `text/plain;charset=UTF-8`.

Dar, deoarece vom trimite JSON, folosim opțiunea `headers` pentru a trimite în schimb `application/json`, corectul `Content-Type` pentru datele codificate JSON.

## Trimiterea unei imagini

De asemenea putem trimite date binare cu `fetch` folosind obiectele `Blob` sau `BufferSource`.

În acest exemplu, există un `<canvas>` în care putem desena prin deplasarea mouse-ului peste el. Un clic pe butonul "submit" trimite imaginea către server:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // serverul răspunde cu o confirmare și dimensiunea imaginii
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Vă rugăm să notați că, aici nu setați manual antetul `Content-Type`, deoarece un obiect `Blob` are un tip încorporat (aici `image/png`, așa cum este generat de `toBlob`). Pentru obiectele `Blob` acest tip devine valoarea lui `Content-Type`.

Funcția `submit()` poate fi rescrisă fără `async/await` astfel:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Sumar

Un fetch request tipic constă în două apeluri `await`:

```js
let response = await fetch(url, options); // se rezolvă cu response headers
let result = await response.json(); // citește body ca json
```

Sau, fără `await`:

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* procesează result */)
```

Proprietăți de răspuns:
- `response.status` -- Codul HTTP al răspunsului,
- `response.ok` -- `true` dacă status este 200-299.
- `response.headers` -- Obiect asemănător Map cu HTTP headers.

Metode de obținere response body:
- **`response.text()`** -- returnează răspunsul ca text,
- **`response.json()`** -- parsează răspunsul ca obiect JSON,
- **`response.formData()`** -- returnează răspunsul ca obiect `FormData` (codificare `multipart/form-data`, vezi capitolul următor),
- **`response.blob()`** -- returnează răspunsul ca [Blob](info:blob) (date binare cu tip),
- **`response.arrayBuffer()`** -- returnează răspunsul ca [ArrayBuffer](info:arraybuffer-binary-arrays) (date binare low-level),

Opțiunile fetch de până acum:
- `method` -- metodă HTTP,
- `headers` -- un obiect cu request headers (nu este permis orice antet),
- `body` -- datele de trimis (corpul cererii) ca `string`, `FormData`, `BufferSource`, `Blob` sau obiect `UrlSearchParams`.

În capitolele următoare vom vedea mai multe opțiuni și cazuri de utilizare ale lui `fetch`.
