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

Faceți clic pe butonul de mai jos pentru a anima fundalul:

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

Le vom acoperi imediat, deocamdată să observăm că proprietatea comună `transition` permite declararea lor împreună în ordine: `proprietate durată temporizare-funcție întârziere`, precum și animarea mai multor proprietăți în același timp.

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

## transition-propriety

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

Această proprietate acceptă două tipuri de valori: o curbă Bezier sau pași. Să începem cu curba, deoarece este folosită mai des.

### Curba Bezier

Timing function poate fi setată ca o [curbă Bezier](/bezier-curbă) cu 4 puncte de control care satisfac condițiile:

1. Primul punct de control: `(0,0)`.
2. Ultimul punct de control: `(1,1)`.
3. Pentru punctele intermediare, valorile lui `x` trebuie să fie în intervalul `0..1`, `y` poate fi orice.

Sintaxa pentru o curbă Bezier în CSS: `cubic-bezier(x2, y2, x3, y3)`. Aici trebuie să specificăm doar al 2-lea și al 3-lea punct de control, deoarece primul este fixat la `(0,0)` și al 4-lea este `(1,1)`.

Timing function descrie cât de repede se desfășoară procesul de animație.

- Axa `x` este timpul: `0` -- începutul, `1` -- sfârșitul `transition-duration`.
- Axa `y` specifică finalizarea procesului: `0` -- valoarea inițială a proprietății, `1` -- valoarea finală.

Cea mai simplă variantă este atunci când animația merge uniform, cu aceeași viteză liniară. Aceasta poate fi specificată prin curba `cubic-bezier(0, 0, 1, 1)`.

Iată cum arată această curbă:

![](bezier-linear.svg)

...După cum putem vedea, este doar o linie dreaptă. Pe măsură ce trece timpul (`x`), finalizarea animației (`y`) trece constant de la `0` la `1`.

Trenul din exemplul de mai jos merge de la stânga la dreapta cu viteză constantă (apară-l):

[codetabs src="train-linear"]

CSS `transition` se bazează pe această curbă:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* click pe tren setează stânga la 450px, declanșând astfel animația */
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
  /* click pe tren setează stânga la 450px, declanșând astfel animația */
}
```

Există mai multe curbe built-in: `linear`, `ease`, `ease-in`, `ease-out` și `ease-in-out`.

`linear` este o prescurtare pentru `cubic-bezier(0, 0, 0, 1, 1)` -- o linie dreaptă, pe care am descris-o mai sus.

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

Dar cum facem o curbă Bezier pentru o anumită sarcină? Există multe instrumente.

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

Iată `steps(9, end)` în acțiune (notați pauza de dinaintea schimbării primei cifre):

[codetabs src="step-end"]

Sunt de asemenea câteva prescurtări predefinite pentru `steps(...)`:

- `step-start` -- este același lucru cu `steps(1, start)`. Adică, animația începe imediat și face 1 pas. Deci începe și se termină imediat, ca și cum nu ar exista nicio animație.
- `step-end` -- la fel ca `steps(1, end)`: face animația într-un singur pas la sfârșitul `transition-duration`.

Aceste valori sunt rareori folosite, deoarece nu reprezintă o animație reală, ci mai degrabă o schimbare într-un singur pas. Le menționăm aici pentru completitudine.

## Event: "transitionend"

When the CSS animation finishes, the `transitionend` event triggers.

It is widely used to do an action after the animation is done. Also we can join animations.

For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
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

The event object for `transitionend` has a few specific properties:

`event.propertyName`
: The property that has finished animating. Can be good if we animate multiple properties simultaneously.

`event.elapsedTime`
: The time (in seconds) that the animation took, without `transition-delay`.

## Keyframes

We can join multiple simple animations together using the `@keyframes` CSS rule.

It specifies the "name" of the animation and rules - what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.

Here's an example with explanations:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* give it a name: "go-left-right" */
    from { left: 0px; }             /* animate from left: 0px */
    to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* apply the animation "go-left-right" to the element
       duration 3 seconds
       number of times: infinite
       alternate direction every time
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

There are many articles about `@keyframes` and a [detailed specification](https://drafts.csswg.org/css-animations/).

You probably won't need `@keyframes` often, unless everything is in constant motion on your sites.

## Performance

Most CSS properties can be animated, because most of them are numeric values. For instance, `width`, `color`, `font-size` are all numbers. When you animate them, the browser gradually changes these numbers frame by frame, creating a smooth effect.

However, not all animations will look as smooth as you'd like, because different CSS properties cost differently to change.

In more technical details, when there's a style change, the browser goes through 3 steps to render the new look:

1. **Layout**: re-compute the geometry and position of each element, then
2. **Paint**: re-compute how everything should look like at their places, including background, colors,
3. **Composite**: render the final results into pixels on screen, apply CSS transforms if they exist.

During a CSS animation, this process repeats every frame. However, CSS properties that never affect geometry or position, such as `color`, may skip the Layout step. If a `color` changes, the browser  doesn't calculate any new geometry, it goes to Paint -> Composite. And there are few properties that directly go to Composite. You can find a longer list of CSS properties and which stages they trigger at <https://csstriggers.com>.

The calculations may take time, especially on pages with many elements and a complex layout. And the delays are actually visible on most devices, leading to "jittery", less fluid animations.

Animations of properties that skip the Layout step are faster. It's even better if Paint is skipped too.

The `transform` property is a great choice, because:
- CSS transforms affect the target element box as a whole (rotate, flip, stretch, shift it).
- CSS transforms never affect neighbour elements.

...So browsers apply `transform` "on top" of existing Layout and Paint calculations, in the Composite stage.

In other words, the browser calculates the Layout (sizes, positions), paints it with colors, backgrounds, etc at the Paint stage, and then applies `transform` to element boxes that need it.

Changes (animations) of the `transform` property never trigger Layout and Paint steps. More than that, the browser  leverages the graphics accelerator (a special chip on the CPU or graphics card) for CSS transforms, thus making them very efficient.

Luckily, the `transform` property is very powerful. By using `transform` on an element, you could rotate and flip it, stretch and shrink it, move it around, and [much more](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). So instead of `left/margin-left` properties we can use `transform: translateX(…)`, use `transform: scale` for increasing element size, etc.

The `opacity` property also never triggers Layout (also skips Paint in Mozilla Gecko). We can use it for show/hide or fade-in/fade-out effects.

Paring `transform` with `opacity` can usually solve most of our needs, providing fluid, good-looking animations.

For example, here clicking on the `#boat` element adds the class with `transform: translateX(300)` and `opacity: 0`, thus making it move `300px` to the right and disappear:

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

Here's a more complex example, with `@keyframes`:

```html run height=80 autorun no-beautify
<h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
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

## Summary

CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.

They are good for most animation tasks. We're also able to use JavaScript for animations, the next chapter is devoted to that.

Limitations of CSS animations compared to JavaScript animations:

```compare plus="CSS animations" minus="JavaScript animations"
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.
```

In early examples in this chapter, we animate `font-size`, `left`, `width`, `height`, etc. In real life projects, we should use `transform: scale()` and `transform: translate()` for better performance.

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.

But in the next chapter we'll do some JavaScript animations to cover more complex cases.
