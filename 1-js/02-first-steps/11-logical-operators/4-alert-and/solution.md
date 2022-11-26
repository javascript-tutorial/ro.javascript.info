Răspunsul: `1`, și apoi `undefined`.

```js run
alert(alert(1) && alert(2));
```

Invocând `alert` va fi returnat `undefined` (arată doar un mesaj, nu returnează o valoare semnificativă).

Din această cauză, `&&` va evalua operatorul din stânga (rezultatul va fi `1`), și se va opri imediat, deoarece `undefined` este o valoare falsă. `&&` caută o valoare falsă, pe care o va returna.
