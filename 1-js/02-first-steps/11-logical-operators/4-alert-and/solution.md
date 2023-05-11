Răspunsul: `1`, iar apoi `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Metoda `alert` întoarce `undefined` (afișează doar un mesaj, deci nu întoarce nimic semnificativ).

Din cauza aceasta, `&&` evaluează operantul din stânga (output-ul `1`), și oprește imediat evaluarea, deoarece `undefined` este o valoare falsy. `&&` caută o valoare falsy și o întoarce, așadar procesul este finalizat.