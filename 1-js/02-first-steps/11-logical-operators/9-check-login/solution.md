```js run demo
let userName = prompt("Who's there?", "");

if (userName === "Admin") {
	let pass = prompt("Password?", "");

	if (pass === "TheMaster") {
		alert("Welcome!");
	} else if (pass === "" || pass === null) {
		alert("Canceled");
	} else {
		alert("Wrong password");
	}
} else if (userName === "" || userName === null) {
	alert("Canceled");
} else {
	alert("I don't know you");
}
```

<<<<<<< Updated upstream
Identațiile verticale din blocurile `if` din punct de vedere tehnic nu sunt necesare, dar fac codul mai lizibil.
=======
Remarcați identațiile verticale din blocurile `if`. Din punct de vedere tehnic nu sunt necesare, dar fac codul mai lizibil.
>>>>>>> Stashed changes
