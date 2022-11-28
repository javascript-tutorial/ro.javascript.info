<<<<<<< Updated upstream
Răspunsul: `3`.
=======
Răspuns: `3`.
>>>>>>> Stashed changes

```js run
alert(null || (2 && 3) || 4);
```

<<<<<<< Updated upstream
Operatorul `&&` are prioritate mai mare decât `||`, așa că este executat primul .

Rezulatul va fi `2 && 3 = 3`, expresia devenind:
=======
Precedența lui AND `&&` este mai mare decăt al lui `||`, așa că este executat primul .

Rezulatul lui `2 && 3` este 3, așa că expresia devine:
>>>>>>> Stashed changes

```
null || 3 || 4
```

<<<<<<< Updated upstream
Acum rezultatul va fi prima valoare adevărată adică: `3`.
=======
Acum rezultatul este prima valoare truthy: `3`.





>>>>>>> Stashed changes
