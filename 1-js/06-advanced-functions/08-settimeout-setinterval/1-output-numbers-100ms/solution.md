
Folosind `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// utilizare:
printNumbers(5, 10);
```

Folosind `setTimeout` imbricat:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// utilizare:
printNumbers(5, 10);
```

Observați că în ambele soluții există o întârziere inițială înainte de prima emitere. Funcția este apelată după `1000ms` pentru prima dată.

Dacă dorim de asemenea ca funcția să ruleze imediat, atunci putem adăuga un apel suplimentar pe o linie separată, astfel:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
