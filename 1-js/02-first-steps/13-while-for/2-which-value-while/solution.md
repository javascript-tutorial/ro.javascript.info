Acest exercițiu demonstrează cum prefixele/sufixele pot duce la rezultate diferite când sunt comparate.

1. **De la 1 la 4**

   ```js run
   let i = 0;
   while (++i < 5) alert( i );
   ```
   Prima valoare este `i = 1` pentru că `++i` incrementează prima dată `i` și apoi returnează noua valoare. Așadar prima comparație este `1 < 5`  și funcția `alert` afișează `1`.
2. **De la 1 la 5**

   ```js run
   let i = 0;
   while (i++ < 5) alert( i );
   ```
   Prima valoare este din nou `i = 1`. Forma cu sufix `i++` incrementează `i` și după returnează vechea valoare, deci comparația `i++ < 5` va folosi `i = 0` (față de `++i < 5`).

   Dar funcția `alert` se apelează separat. Este altă linie de cod care se execută după incrementare și după comparație. Așadar primește `i = 0`.

   Apoi urmând `2, 3, 4...`

   Hai să ne oprim la `i = 4`. Forma cu prefix `++i` l-ar incrementa și am folosi `5` pentru comparație. Dar aici avem forma cu sufix `i++`. Astfel îl incrementează pe `i` la `5`, dar returnează vechea valoare. Datorită faptului că comparația e de fapt `while(4 < 5)` - adevărat și execuția codului continuă cu funcția `alert`.

   Valoarea `i = 5` esre ultima, deoarece următorul pas `while(5 < 5)` este fals.
