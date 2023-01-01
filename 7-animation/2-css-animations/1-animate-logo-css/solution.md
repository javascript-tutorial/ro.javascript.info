
CSS pentru a anima atât `width` cât și `height`:
```css
/* clasa originală */

#flyjet {
  transition: all 3s;
}

/* JS adaugă .growing */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Vă rugăm să notați că `transitionend` se declanșează de două ori -- o dată pentru fiecare proprietate. Deci dacă nu efectuăm o verificare suplimentară atunci mesajul va apărea de 2 ori.
