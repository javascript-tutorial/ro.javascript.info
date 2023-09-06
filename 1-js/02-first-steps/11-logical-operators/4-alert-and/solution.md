Răspunsul: `1`, iar apoi `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Apelul către `alert` întoarce `undefined` (afișează doar un mesaj, deci nu întoarce nimic semnificativ).

Din cauza aceasta, `&&` evaluează operantul din stânga (output-ul `1`), și se oprește imediat, deoarece `undefined` este o valoare falsy. Iar `&&` caută o valoare falsy și o întoarce, deci a terminat.