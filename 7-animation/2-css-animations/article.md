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

`*` -- by default, if there's no timing function, `ease` is used.

So we could use `ease-out` for our slowing down train:

```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* same as transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

But it looks a bit differently.

**A Bezier curve can make the animation exceed its range.**

The control points on the curve can have any `y` coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.

In the example below the animation code is:

```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* click on a train sets left to 450px */
}
```

The property `left` should animate from `100px` to `400px`.

But if you click the train, you'll see that:

- First, the train goes *back*: `left` becomes less than `100px`.
- Then it goes forward, a little bit farther than `400px`.
- And then back again -- to `400px`.

[codetabs src="train-over"]

Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

![](bezier-train-over.svg)

We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made it over `1`, so the curve goes out of the "regular" quadrant. The `y` is out of the "standard" range `0..1`.

As we know, `y` measures "the completion of the animation process". The value `y = 0` corresponds to the starting property value and `y = 1` -- the ending value. So values `y<0` move the property beyond the starting `left` and `y>1` -- past the final `left`.

That's a "soft" variant for sure. If we put `y` values like `-99` and `99` then the train would jump out of the range much more.

But how do we make a Bezier curve for a specific task? There are many tools.

- For instance, we can do it on the site <https://cubic-bezier.com>.
- Browser developer tools also have special support for Bezier curves in CSS:
    1. Open the developer tools with `key:F12` (Mac: `key:Cmd+Opt+I`).
    2. Select the `Elements` tab, then pay attention to the `Styles` sub-panel at the right side.
    3. CSS properties with a word `cubic-bezier` will have an icon before this word.
    4. Click this icon to edit the curve.


### Steps

The timing function `steps(number of steps[, start/end])` allows splitting an transition into multiple steps.

Let's see that in an example with digits.

Here's a list of digits, without any animations, just as a source:

[codetabs src="step-list"]

In the HTML, a stripe of digits is enclosed into a fixed-length `<div id="digits">`:

```html
<div id="digit">
  <div id="stripe">0123456789</div>
</div>
```

The `#digit` div has a fixed width and a border, so it looks like a red window.

We'll make a timer: the digits will appear one by one, in a discrete way.

To achieve that, we'll hide the `#stripe` outside of `#digit` using `overflow: hidden`, and then shift the `#stripe` to the left step-by-step.

There will be 9 steps, a step-move for each digit:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

The first argument of `steps(9, start)` is the number of steps. The transform will be split into 9 parts (10% each). The time interval is automatically divided into 9 parts as well, so `transition: 9s` gives us 9 seconds for the whole animation – 1 second per digit.

The second argument is one of two words: `start` or `end`.

The `start` means that in the beginning of animation we need to make the first step immediately.

In action:

[codetabs src="step"]

A click on the digit changes it to `1` (the first step) immediately, and then changes in the beginning of the next second.

The process is progressing like this:

- `0s` -- `-10%` (first change in the beginning of the 1st second, immediately)
- `1s` -- `-20%`
- ...
- `8s` -- `-90%`
- (the last second shows the final value).

Here, the first change was immediate because of `start` in the `steps`.

The alternative value `end` would mean that the change should be applied not in the beginning, but at the end of each second.

So the process for `steps(9, end)` would go like this:

- `0s` -- `0` (during the first second nothing changes)
- `1s` -- `-10%` (first change at the end of the 1st second)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Here's `steps(9, end)` in action (note the pause before the first digit change):

[codetabs src="step-end"]

There are also some pre-defined shorthands for `steps(...)`:

- `step-start` -- is the same as `steps(1, start)`. That is, the animation starts immediately and takes 1 step. So it starts and finishes immediately, as if there were no animation.
- `step-end` -- the same as `steps(1, end)`: make the animation in a single step at the end of `transition-duration`.

These values are rarely used, as they represent not a real animation, but rather a single-step change. We mention them here for completeness.

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
