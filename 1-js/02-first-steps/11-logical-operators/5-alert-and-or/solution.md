Răspunsul este: `3`

```js run
alert( null || 2 && 3 || 4 );
```

<!-- The precedence of AND `&&` is higher than `||`, so it executes first. -->
Prioritatea lui ȘI `&&` este mai mare decât cea a lui ORI `||`, așa că `&&` executat primul.

Rezultatul lui `2 && 3 = 3`, așa că expresia devine:

```
null || 3 || 4
```

În acest caz, rezultatul este prima valoare truthy: `3`.