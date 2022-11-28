<<<<<<< Updated upstream
Răspunsul: primul va fi `1`, apoi `2`.
=======
Răspuns: primul va fi`1`, apoi `2`.
>>>>>>> Stashed changes

```js run
alert(alert(1) || 2 || alert(3));
```

<<<<<<< Updated upstream
Invocând `alert` nu se va returna o valoare. Sau, cu alte cuvinte, se va returna `undefined`.

1. Primul OR `||` evaluează operatorul din stânga `alert(1)`. Primul mesaj care va fi afișat este `1`.
2. `alert` va returna `undefined`, așa că OR trece la următorul operator căutând o valoare adevărată.
3. Cel de al doilea operator `2` fiind adevărat, execuția este oprită, `2` este returnat și afișat.

`3` nu va fi afișat , deoarece nu se ajunge la evaluarea `alert(3)`.
=======
Invocând alert nu returnează o valoare. Sau, cu alte cuvinte, returnează undefined.

1. Primul OR `||` evaluează operatorul din stânga `alert(1)`. Primul mesaj care va fi afișat este `1`.
2.  `alert` returnează `undefined`, așa că OR trece la următorul operator căutând o valoare truthy.
3. Cel de-al doilea operator `2` este truthy, așa că execuția este oprită, `2` este returnat și afișat.

`3` nu va fi afișat , deoarece nu se ajunge la evaluarea `alert(3)`.
>>>>>>> Stashed changes
