
# Cerc animat cu promisiune

Rescrieți funcția `showCircle` din soluția sarcinii <info:task/animate-circle-callback> astfel încât să returneze o promisiune în loc să accepte un callback.

Noua utilizare:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Luați ca bază soluția task-ului <info:task/animate-circle-callback>.
