
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. Adunarea cu un șir `"" + 1` convertește `1` într-un șir: `"" + 1 = "1"`, iar apoi avem `"1" + 0`, aceeași regulă este aplicată
2. Scăderea `-` (ca și majoritatea operațiilor matematica) funcționează doar cu numere, convertește un sir gol `""` în `0`.
3. Adunarea cu un șir alipește numărul `5` la șir 
4. Scăderea întotdeauna convertește în numere, astfel va face `"  -9  "` un număr `-9` (ignorănd spațiile din jurului lui).
5. `null` devine `0` după conversia numerică.
6. `undefined` devine `NaN` după conversia numerică.
7. Caracterele spații sunt tăiate din începutul si sfârșitului un șir când un șir este convertit într-un număr. Aici tot șirul constă în caractere spații ca și `\t`, `\n` și un spațiu "normal" între ele. Deci, similar cu un șir gol, devine `0`.
