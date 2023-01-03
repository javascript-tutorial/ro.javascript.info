
# Cerc animat cu callback

În sarcina <info:task/animate-circle> este afișat un cerc animat în creștere.

Acum să spunem că avem nevoie nu doar de un cerc, ci și de un mesaj în interiorul acestuia. Mesajul ar trebui să apară *după* finalizarea animației (cercul a crescut complet), altfel ar arăta urât.

În soluția sarcinii, funcția `showCircle(cx, cy, radius)` desenează cercul, dar nu oferă nicio modalitate de a urmări când este gata.

Adăugați un argument de callback: `showCircle(cx, cy, radius, callback)` care va fi apelată atunci când animația este finalizată. `callback`-ul trebuie să primească `<div>`-ul cercului ca argument.

Iată exemplul:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Salut, lume!");
});
```

Demo:

[iframe src="solution" height=260]

Luați ca bază soluția sarcinii <info:task/animate-circle>.
