Răspunsul: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

Prioritatea lui AND `&&` este mai mare decât cea a lui OR `||`, așa că se execută primul.

Rezultatul lui `2 && 3 = 3`, așa că expresia devine:

```
null || 3 || 4
```

Acum rezultatul este prima valoare truthy: `3`.