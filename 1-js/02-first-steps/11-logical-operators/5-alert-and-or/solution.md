Răspunsul: `3`.

```js run
alert(null || (2 && 3) || 4);
```

Operatorul `&&` are prioritate mai mare decât `||`, așa că este executat primul .

Rezulatul va fi `2 && 3 = 3`, expresia devenind:

```
null || 3 || 4
```

Acum rezultatul va fi prima valoare adevărată adică: `3`.
