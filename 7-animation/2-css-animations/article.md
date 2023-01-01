# Animații CSS

Animațiile CSS fac posibilă realizarea unor animații simple fără JavaScript.

JavaScript poate fi folosit pentru a controla animațiile CSS și pentru a le face chiar mai bune, cu puțin cod.

## Tranziții CSS [#css-transition]

Ideea tranzițiilor CSS este simplă. Descriem o proprietate și modul în care modificările acesteia trebuie să fie animate. Când proprietatea se modifică, browserul pictează animația.

Adică, tot ce avem nevoie este să modificăm proprietatea, iar tranziția fluidă va fi realizată de browser.

De exemplu, CSS-ul de mai jos animează schimbările de `background-color` timp de 3 secunde:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Acum dacă un element are clasa `.animated`, orice schimbare a `background-color` este animată timp de 3 secunde.

Apăsați pe butonul de mai jos pentru a anima fundalul:

```html run autorun height=60
<button id="color">Apasă-mă</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

Sunt 4 proprietăți pentru a descrie tranzițiile CSS:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

Le vom acoperi într-un moment, deocamdată să observăm că proprietatea obișnuită `transition` permite declararea lor împreună în ordinea: `property duration timing-function delay`, precum și animarea mai multor proprietăți în același timp.

De exemplu, acest buton animează atât `color` cât și `font-size`:

```html run height=80 autorun no-beautify
<button id="growing">Click me</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

Acum, să acoperim proprietățile de animație una câte una.

## transition-property

În `transition-property`, scriem o listă de proprietăți de animat, de exemplu: `left`, `margin-left`, `height`, `color`. Sau putem scrie `all`, ceea ce înseamnă "animă toate proprietățile".

Notați că, sunt proprietăți care nu pot fi animate. Cu toate acestea, [majoritatea proprietăților utilizate în general pot fi animate](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

## transition-duration

În `transition-duration` putem specifica cât timp trebuie să dureze animația. Timpul trebuie să fie în [CSS time format](https://www.w3.org/TR/css3-values/#time): în secunde `s` sau milisecunde `ms`.

## transition-delay

În `transition-delay` putem specifica întârzierea *înainte* de animație. De exemplu, dacă `transition-delay` este `1s` și `transition-duration` este `2s`, atunci animația începe la 1 secundă după modificarea proprietății iar durata totală va fi de 2 secunde.

Sunt posibile și valori negative. Atunci animația este afișată imediat, dar punctul de pornire al animației va fi după valoarea dată (timpul). De exemplu, dacă `transition-delay` este `-1s` și `transition-duration` este `2s`, atunci animația începe de la jumătatea intervalului și durata totală va fi de 1 secundă.

Aici animația schimbă numerele din `0` în `9` folosind proprietatea CSS `translate`:

[codetabs src="digits"]

Proprietatea `transform` este animată astfel:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

În exemplul de mai sus JavaScript adaugă clasa `.animate` la element -- și animația începe:

```js
stripe.classList.add('animate');
```

Am putea de asemenea să o pornim de undeva de la mijlocul tranziției, de la un număr exact, e.g. corespunzănd secundei curente, folosind un `transition-delay` negativ.

Aici dacă faceți clic pe cifră -- va începe animația din secunda curentă:

[codetabs src="digits-negative-delay"]

JavaScript face asta cu o linie suplimentară:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // de exemplu, -3s aici pornește animația din a 3-a secundă
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

Timing function descrie cum procesul de animație este distribuit de-a lungul cronologiei sale. Va începe încet și apoi va merge repede, sau vice versa.

La început pare a fi cea mai complicată proprietate. Dar devine foarte simplă dacă îi devotăm puțin timp.

Această proprietate acceptă două tipuri de valori: o curbă Bezier sau steps. Să începem cu curba, deoarece este folosită mai des.

### Curba Bezier

Timing function poate fi setată ca o [curbă Bezier](/bezier-curve) cu 4 puncte de control care satisfac condițiile:

1. Primul punct de control: `(0,0)`.
2. Ultimul punct de control: `(1,1)`.
3. Pentru punctele intermediare, valorile lui `x` trebuie să fie în intervalul `0..1`, `y` poate fi orice.

Sintaxa pentru o curbă Bezier în CSS: `cubic-bezier(x2, y2, x3, y3)`. Aici trebuie să specificăm doar al 2-lea și al 3-lea punct de control, deoarece primul este fixat la `(0,0)` și al 4-lea este `(1,1)`.

Timing function descrie cât de repede se desfășoară procesul de animație.

- Axa `x` este timpul: `0` -- începutul, `1` -- sfârșitul `transition-duration`.
- Axa `y` specifică finalizarea procesului: `0` -- valoarea inițială a proprietății, `1` -- valoarea finală.

Cea mai simplă variantă este atunci când animația merge uniform, cu aceeași viteză liniară. Aceasta poate fi specificată prin curba `cubic-bezier(0, 0, 1, 1)`.

Iată cum arată acea curbă:

![](bezier-linear.svg)

...După cum putem vedea, este doar o linie dreaptă. Pe măsură ce trece timpul (`x`), finalizarea animației (`y`) trece constant de la `0` la `1`.

Trenul din exemplul de mai jos merge de la stânga la dreapta cu viteză constantă (apasă-l):

[codetabs src="train-linear"]

CSS `transition` se bazează pe acea curbă:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* apăsând pe tren setează left la 450px, declanșând astfel animația */
}
```

...Și cum putem arăta un tren care încetinește?

Putem folosi o altă curbă Bezier: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

Graficul:

![](train-curve.svg)

După cum putem vedea, procesul începe rapid: curba se înalță foarte sus, apoi din ce în ce mai încet și mai încet.

Iată timing function în acțiune (apăsați pe tren):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* apăsând pe tren setează left la 450px, declanșând astfel animația */
}
```

Există mai multe curbe built-in: `linear`, `ease`, `ease-in`, `ease-out` și `ease-in-out`.

`linear` este o prescurtare pentru `cubic-bezier(0, 0, 1, 1)` -- o linie dreaptă, pe care am descris-o mai sus.

Celelalte denumiri sunt prescurtări pentru următoarele `cubic-bezier`:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- în mod implicit, dacă nu există un timing function, se utilizează `ease`.

Deci am putea folosi `ease-out` pentru trenul nostru care încetinește:

```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* la fel ca transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Dar arată puțin diferit.

**O curbă Bezier poate face ca animația să-și depășească intervalul.**

Punctele de control de pe curbă pot avea orice coordonate `y`: chiar și negative sau uriașe. Atunci curba Bezier se va extinde și ea foarte jos sau foarte sus, făcând ca animația să își depășească intervalul normal.

În exemplul de mai jos codul animației este:

```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* apăsând pe tren setează left la 450px */
}
```

Proprietatea `left` ar trebui să fie animată de la `100px` la `400px`.

Dar dacă apăsați pe tren, veți vedea că:

- În primul rând, trenul merge *înapoi*: `left` devine mai mic de `100px`.
- Apoi merge înainte, puțin mai departe de `400px`.
- Și după aceea iar înapoi -- la `400px`.

[codetabs src="train-over"]

De ce se întâmplă acest lucru este destul de evident dacă ne uităm la graficul curbei Bezier dat:

![](bezier-train-over.svg)

Am mutat coordonata `y` a celui de-al doilea punct sub zero, iar pentru cel de-al treilea punct am făcut-o peste `1`, astfel încât curba iese din cadranul "obișnuit". `y` a ieșit din intervalul "standard" `0..1`.

După cum știm, `y` măsoară "finalizarea procesului de animație". Valoarea `y = 0` corespunde valorii de început a proprietății iar `y = 1` -- valorii finale. Deci valorile `y<0` mută proprietatea dincolo de începutul `left` și `y>1` -- peste `left` de final.

Aceasta este cu siguranță o variantă "soft". Dacă am pune valori `y` ca `-99` și `99` atunci trenul ar sări mult mai mult din interval.

Dar cum facem o curbă Bezier pentru o sarcină specifică? Există multe instrumente.

- De exemplu, o putem face pe site-ul <https://cubic-bezier.com>.
- Instrumentele de dezvoltare a browserului au, de asemenea, un suport special pentru curbele Bezier în CSS:
    1. Deschideți uneltele dezvoltatorului cu `key:F12` (Mac: `key:Cmd+Opt+I`).
    2. Selectați tab-ul `Elements`, apoi acordați atenție subpanoului `Styles` din partea dreaptă.
    3. Proprietățile CSS care au cuvântul `cubic-bezier` vor avea o pictogramă înaintea acestui cuvânt.
    4. Apăsați pe această pictogramă pentru a edita curba.


### Steps

Timing function `steps(număr de pași[, start/end])` permite împărțirea unei tranziții în mai mulți pași.

Să vedem acest lucru într-un exemplu cu cifre.

Iată o listă de cifre, fără nicio animație, doar ca sursă:

[codetabs src="step-list"]

În HTML, o bandă de cifre este înglobată într-un `<div id="digits">` de lungime fixă:

```html
<div id="digit">
  <div id="stripe">0123456789</div>
</div>
```

Div-ul `#digit` are o lățime fixă și o margine, astfel încât arată ca o fereastră roșie.

Vom face un cronometru: cifrele vor apărea una câte una, într-un mod discret.

Pentru a realiza asta, vom ascunde `#stripe` în afara lui `#digit` folosind `overflow: hidden`, apoi vom deplasa `#stripe` spre stânga pas cu pas.

Vor fi 9 pași, câte un pas de deplasare pentru fiecare cifră:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

Primul argument din `steps(9, start)` este numărul de pași. Transform va fi împărțit în 9 părți (10% fiecare). Intervalul de timp este împărțit automat în 9 părți de asemenea, așa că `transition: 9s` ne oferă 9 secunde pentru întreaga animație – 1 secundă pentru fiecare cifră.

Al doilea argument este unul dintre cele două cuvinte: `start` sau `end`.

`start` înseamnă că la începutul animației trebuie să facem imediat primul pas.

În acțiune:

[codetabs src="step"]

Un clic pe cifră o schimbă imediat în `1` (primul pas), iar apoi se schimbă la începutul secundei următoare.

Procesul evoluează astfel:

- `0s` -- `-10%` (prima schimbare la începutul primei secunde, imediat)
- `1s` -- `-20%`
- ...
- `8s` -- `-90%`
- (în ultima secundă apare valoarea finală).

Aici, prima schimbare a fost imediată din cauza `start` din `steps`.

Valoarea alternativă `end` ar însemna că modificarea ar trebui aplicată nu la început, ci la sfârșitul fiecărei secunde.

Deci procesul pentru `steps(9, end)` ar merge așa:

- `0s` -- `0` (în decursul primei secunde nu se schimbă nimic)
- `1s` -- `-10%` (prima schimbare la sfârșitul primei secunde)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Iată `steps(9, end)` în acțiune (notați pauza dintre schimbarea primei cifre):

[codetabs src="step-end"]

Sunt de asemenea câteva prescurtări predefinite pentru `steps(...)`:

- `step-start` -- este același lucru cu `steps(1, start)`. Adică, animația începe imediat și face 1 pas. Deci începe și se termină imediat, ca și cum nu ar exista nicio animație.
- `step-end` -- la fel ca `steps(1, end)`: face animația într-un singur pas la sfârșitul `transition-duration`.

Aceste valori sunt rareori folosite, deoarece nu reprezintă o animație reală, ci mai degrabă o schimbare într-un singur pas. Le menționăm aici pentru completitudine.

## Event: "transitionend"

Când animația CSS se termină, se declanșează evenimentul `transitionend`.

Acesta este utilizat pe scară largă pentru a efectua o acțiune după terminarea animației. De asemenea putem uni animațiile.

De exemplu, nava din exemplul de mai jos începe să navigheze încolo și înapoi atunci când se face clic, de fiecare dată tot mai departe spre dreapta:

[iframe src="boat" height=300 edit link]

Animația este inițiată de funcția `go` care se reia de fiecare dată când se termină tranziția, și inversează direcția:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // navighează la dreapta
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // navighează la stânga
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

Obiectul de eveniment pentru `transitionend` are câteva proprietăți specifice:

`event.propertyName`
: Proprietatea a cărei animație s-a încheiat. Poate fi bună dacă animăm mai multe proprietăți simultan.

`event.elapsedTime`
: Timpul (în secunde) cât a durat animația, fără `transition-delay`.

## Keyframes

Putem uni mai multe animații simple împreună folosind regula CSS `@keyframes`.

Aceasta specifică "numele" animației și regulile - ce, când și unde să se anime. Apoi folosind proprietatea `animation`, putem atașa animația la element și specifica parametri adiționali pentru aceasta.

Iată un exemplu cu explicații:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* dați-i un nume: "go-left-right" */
    from { left: 0px; }             /* animați din stânga: 0px */
    to { left: calc(100% - 50px); } /* animați spre stânga: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* aplică animația "go-left-right" elementului
       durata 3 secunde
       număr de ori: infinit
       direcție alternativă de fiecare dată
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

Sunt multe articole despre `@keyframes` și o [specificație detaliată](https://drafts.csswg.org/css-animations/).

Probabil că nu veți avea nevoie des de `@keyframes`, decât dacă totul este în continuă mișcare pe site-urile dumneavoastră.

## Performanță

Majoritatea proprietăților CSS pot fi animate, deoarece majoritatea acestora sunt valori numerice. De exemplu, `width`, `color`, `font-size` sunt toate numere. Atunci când le animați, browserul modifică treptat aceste numere cadru cu cadru, creând un efect lin.

Cu toate acestea, nu toate animațiile vor arăta la fel de lin pe cât ați dori, deoarece diferite proprietăți CSS costă diferit pentru a fi modificate.

În detalii mai tehnice, atunci când există o schimbare de stil, browserul parcurge 3 etape pentru a randa noul aspect:

1. **Layout**: se recalculează geometria și poziția fiecărui element, apoi
2. **Paint**: se recalculează cum ar trebui să arate fiecare element la locul lui, inclusiv fundalul, culorile,
3. **Composite**: randează rezultatele finale în pixeli pe ecran, aplică transformările CSS dacă acestea există.

În timpul unei animații CSS, acest proces se repetă la fiecare cadru. Cu toate acestea, proprietățile CSS care nu afectează niciodată geometria sau poziția, cum ar fi `color`, pot sări peste etapa Layout. Dacă o `color` se schimbă, browserul nu calculează o nouă geometrie, ci trece la Paint -> Composite. Și există puține proprietăți care merg direct la Composite. Puteți găsi o listă mai lungă de proprietăți CSS și ce etape declanșează la <https://csstriggers.com>.

Calculele pot dura ceva timp, mai ales în cazul paginilor cu multe elemente și un layout complex. Iar întârzierile sunt de fapt vizibile pe majoritatea dispozitivelor, ceea ce duce la animații "tremurânde", mai puțin fluide.

Animațiile proprietăților care sar peste etapa Layout sunt mai rapide. Este chiar mai bine dacă este sărit și Paint.

Proprietatea `transform` este o alegere excelentă, deoarece:
- Transformările CSS afectează caseta elementului țintă ca întreg (o rotește, o întoarce, o întinde, o deplasează).
- Transformările CSS nu afectează niciodată elementele vecine.

...Astfel browserele aplică `transform` "peste" calculele existente de Layout și Paint, în etapa Composite.

Cu alte cuvinte, browserul calculează Layout-ul (dimensiuni, poziții), îl pictează cu culori, fundaluri etc în etapa Paint, iar apoi aplică `transform` la casetele de elemente care au nevoie de ea.

Modificările (animațiile) proprietății `transform` nu declanșează niciodată pașii Layout și Paint. Mai mult decât atât, browserul avantajează acceleratorul grafic (un cip special de pe CPU sau de pe placa grafică) pentru transformările CSS, făcându-le astfel foarte eficiente.

Din fericire, proprietatea `transform` este foarte puternică. Utilizând `transform` pe un element, ați putea să-l rotiți și să-l întoarceți, să-l întindeți și să-l micșorați, să-l deplasați și [multe altele](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). Deci în loc de proprietățile `left/margin-left` putem folosi `transform: translateX(…)`, folosi `transform: scale` pentru a mări dimensiunea elementului, etc.

De asemenea proprietatea `opacity` nu declanșează niciodată Layout (de asemenea sare peste Paint în Mozilla Gecko). O putem folosi pentru efecte de afișare/ascundere sau de fade-in/fade-out.

Asocierea `transform` cu `opacity` poate rezolva de obicei majoritatea nevoilor noastre, oferind animații fluide și arătoase.

De exemplu, aici apăsând pe elementul `#boat` adaugă clasa cu `transform: translateX(300)` și `opacity: 0`, făcându-l astfel să se deplaseze `300px` spre dreapta și să dispară:

```html run height=260 autorun no-beautify
<img src="https://js.cx/clipart/boat.png" id="boat">

<style>
#boat {
  cursor: pointer;
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.move {
  transform: translateX(300px);
  opacity: 0;
}
</style>
<script>
  boat.onclick = () => boat.classList.add('move');
</script>
```

Iată un exemplu mai complex, cu `@keyframes`:

```html run height=80 autorun no-beautify
<h2 onclick="this.classList.toggle('animated')">apasă-mă pentru start / stop</h2>
<style>
  .animated {
    animation: hello-goodbye 1.8s infinite;
    width: fit-content;
  }
  @keyframes hello-goodbye {
    0% {
      transform: translateY(-60px) rotateX(0.7turn);
      opacity: 0;
    }
    50% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translateX(230px) rotateZ(90deg) scale(0.5);
      opacity: 0;
    }
  }
</style>
```

## Sumar

Animațiile CSS permit modificări animate lin (sau pas cu pas) ale uneia sau mai multor proprietăți CSS.

Ele sunt bune pentru majoritatea sarcinilor de animație. De asemenea putem folosi JavaScript pentru animații, următorul capitol este devotat acestui lucru.

Limitări ale animațiilor CSS în comparație cu animațiile JavaScript:

```compare plus="Animații CSS" minus="Animații JavaScript"
+ Lucruri simple făcute simplu.
+ Rapid și ușor pentru CPU.
- Animațiile JavaScript sunt flexibile. Ele pot implementa orice logică de animație, cum ar fi o "explozie" a unui element.
- Nu doar modificări de proprietăți. Putem crea elemente noi în JavaScript ca parte a animației.
```

În primele exemple din acest capitol, animăm `font-size`, `left`, `width`, `height`, etc. În proiectele din viața reală, ar trebui să folosim `transform: scale()` și `transform: translate()` pentru o performanță mai bună.

Majoritatea animațiilor pot fi implementate folosind CSS așa cum este descris în acest capitol. Iar evenimentul `transitionend` permite ca JavaScript să fie rulat după animație, astfel încât se integrează bine în cod.

Dar în capitolul următor vom face câteva animații JavaScript pentru a acoperi cazuri mai complexe.
