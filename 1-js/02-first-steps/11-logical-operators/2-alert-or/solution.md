Răspunsul: prima dată `1`, iar apoi `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Apelul către `alert` nu returnează o valoare. Sau, prin alte cuvinte, returnează `undefined`.

1. Primul OR `||` evaluează operantul din stânga sa `alert(1)`. Aceasta afișează primul mesaj cu `1`. 
2. `alert` întoarce `undefined`, așa că OR merge la al doilea operand căutând o valoare truthy.
3. Cel de al doilea operand `2` este truthy, așa că execuția este oprită, `2` este returnat fiind afișat de către `alert`-ul  exterior.

`3` nu va fi afișat, deoarece evaluarea nu ajunge la `alert(3)`.
