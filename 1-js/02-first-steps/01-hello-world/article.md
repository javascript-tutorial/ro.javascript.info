# Hello, world!

Această parte a tutorialului este despre JavaScript de bază, limbajul în sine.

Dar avem nevoie de un mediu pentru a rula script-urile și, având în vedere că această carte este online, browser-ul este o alegere bună. Nu o să folosim prea multe comenzi specifice browser-ului (ca `alert`) ca să nu pierdeți prea mult timp cu ele dacă vreți sa vă concentrați pe un alt mediu (ca Node.js). O să ne concentrăm pe JavaScript în browser în [urmatoarea parte](/ui) a tutorialului.

În primul rând, haideți să vedem cum atașăm un script unei pagini web. Pentru mediile de dezvoltare de tipul server (ca și Node.js), se poate executa script-ul cu o comandă precum `"node my.js"`.

## Tag-ul "script"

Programele JavaScript pot fi inserate în orice parte al unui document HTML cu ajutorul tag-ului  `<script>`.

De exemplu:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Înainte de script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...După script.</p>

</body>

</html>
```

```online
Puteți rula exemplul dând click pe butonul „Play” din colțul din dreapta-sus al căsuței de mai sus.
```

Tag-ul `<script>` conține cod JavaScript care este executat automat cand browser-ul procesează tag-ul.

## Markup modern

Tag-ul `<script>` are câteva atribute care mai nou sunt folosite rar, dar care încă se găsesc în codul vechi:

Atributul `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: În vechiul standard HTML, HTML4, un script era necesar să aibă un `type`. De obicei era `type="text/javascript"`. Acum nu mai este nevoie de el. De asemenea, standardul HTML modern a schimbat total înțelesul acestui atribut. Acum, el poate fi folosit pentru module JavaScript. Dar acesta este un subiect mai avansat; o să vorbim despre module în altă parte a tutorialului.

Atributul `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Acest atribut a fost menit să arate limbajul script-ului. Acest atribut nu mai are sens deoarece JavaScript este limbajul implicit. Nu este nevoie să îl folosiți.

Comentarii înainte și după script-uri.
: În cărțile și ghidurile foarte vechi, este posibil să găsiți comentarii în interiorul tag-urilor `<script>` în felul următor:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Acest truc nu este folosit în JavaScript modern. Aceste comentarii ascund codul JavaScript în browserele vechi care nu știau cum să proceseze tag-ul `<script>`. Deoarece browserele lansate în ultimii 15 ani nu au această problemă, accest tip de comentariu vă poate ajuta să identificați cod foarte vechi.

## Script-uri externe

Dacă avem mult cod JavaScript, putem să îl punem într-un fișier separat.

Fișierele de acest tip sunt atașate codului HTML cu ajutorul atributului `src`:

```html
<script src="/path/to/script.js"></script>
```

Aici, `/path/to/script.js` este o cale absolută către script de la rădăcina site-ului. Se poate oferi, de asemenea, o cale relativă din pagina curentă. De exemplu, `src="script.js"` ar însemna un fișier `"script.js"` în folderul curent.

Putem oferi și o adresă URL completă. De exemplu:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Pentru a atașa mai multe scripturi, utilizați mai multe tag-uri:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
De regulă, doar cele mai simple script-uri sunt puse în HTML. Cele mai complexe se află în fișiere separate.

Avantajul unui fișier separat este că browserul îl va descărca și îl va stoca în [cache](https://en.wikipedia.org/wiki/Web_cache).

Alte pagini care fac referire la același script îl vor lua din cache în loc să-l descarce, astfel încât fișierul este descărcat efectiv o singură dată.

Aceasta reduce traficul și face paginile mai rapide.
```

````warn header="Daca `src` este setat, conținutul scriptului este ignorat."
Un singur tag `<script>` nu poate avea atât atributul `src` cât și codul în interior.

Nu va funcționa:

```html
<script *!*src*/!*="file.js">
  alert(1); // conținutul este ignorat pentru că src este setat
</script>
```

Trebuie să alegem fie un `<script src="…">` extern sau un `<script>` obișnuit cu cod.

Exemplul de mai sus poate fi împărțit în două scripturi pentru a funcționa:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Rezumat

- Putem folosi un tag `<script>` pentru a adăuga cod JavaScript într-o pagină.
- Atributele `type` și `language` nu sunt necesare.
- Un script poate fi inserat într-un fișier extern cu `<script src="path/to/script.js"></script>`.


Există mult mai multe lucruri de învățat despre script-urile browser-ului și interacțiunea lor cu pagina web. 
Dar să reținem că această parte a tutorialului este dedicată limbajului JavaScript, deci nu trebuie să ne distragem cu implementările specifice browserului. Vom folosi browser-ul ca o modalitate de a rula JavaScript, care este foarte convenabil pentru citirea online, dar doar unul dintre mulți.
