Răspunsul este: prima dată `1`, iar apoi `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Metoda `alert` nu returnează o valoare. Prin alte cuvinte, returnează `undefined`.

1. Primul ORI `||` evaluează operantul din stânga sa `alert(1)`. Acesta afișează primul mesaj cu `1`.
2. `alert` întoarce `undefined`, prin urmare, ORI merge la cel de al doilea operant, deaorece caută o valoare truthy. 
3. Cel de al doilea operant `2` este truthy, așa că execuția este oprită, `2` este returnat fiind afișat de către `alert`-ul  exterior.

`3` nu va fi afișat, deoarece evaluarea nu ajunge la `alert(3)`.
