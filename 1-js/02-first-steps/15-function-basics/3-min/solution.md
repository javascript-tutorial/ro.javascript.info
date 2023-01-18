O soluție folosind `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

O soluție cu un operator de semn de întrebare `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. În cazul unei egalităţi `a == b` nu contează ce returnează.