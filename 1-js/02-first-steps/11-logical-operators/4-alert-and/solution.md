<<<<<<< Updated upstream
Răspunsul: `1`, și apoi `undefined`.
=======
Răspuns: `1`, și apoi `undefined`.
>>>>>>> Stashed changes

```js run
alert(alert(1) && alert(2));
```

<<<<<<< Updated upstream
Invocând `alert` va fi returnat `undefined` (arată doar un mesaj, nu returnează o valoare semnificativă).

Din această cauză, `&&` va evalua operatorul din stânga (rezultatul va fi `1`), și se va opri imediat, deoarece `undefined` este o valoare falsă. `&&` caută o valoare falsă, pe care o va returna.
=======
Invocând `alert` returnează `undefined` (arată doar un mesaj, nu returnează o valoare semnificativă).

Din această cauză, `&&` evaluează operatorul din stânga (produce `1`), și se oprește imediat, deoarece `undefined` este o valoare falsy. Și `&&` caută o valoare falsy și o returnează, apoi este gata.
>>>>>>> Stashed changes
